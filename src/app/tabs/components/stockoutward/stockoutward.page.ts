import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from "@ionic/angular";
import { getValidPastOrToday } from 'src/app/utils/date-utils';
import { MalarService } from '../../services/malar.service';

@Component({
  selector: 'app-stockoutward',
  templateUrl: './stockoutward.page.html',
  styleUrls: ['./stockoutward.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule]
})
export class StockoutwardPage implements OnInit {
  stockOutForm!: FormGroup;
  submitted = false;
  itemList: any;
  godownList: any;
  processId: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private malarService: MalarService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.stockOutForm = this.fb.group({
      date: [new Date(), Validators.required],
      incharge: ['', Validators.required],
      item: ['', Validators.required],
      godownName: ['', Validators.required],
      lot: [''],
      bags: ['', Validators.required],
      weight: ['', Validators.required],
      transferTo: ['', Validators.required],
      bin: [''],
      stack: [''],
      vehicleNumber: ['', Validators.required],
      remarks: ['']
    });
    this.onDateChange();
  }

  get f() {
    return this.stockOutForm.controls;
  }
  ionViewWillEnter() {
    this.processId = this.route.snapshot.paramMap.get('id') || null;
    if (this.processId) {
      if (this.processId) {
        this.malarService.getStockOutById(this.processId).subscribe({
          next: (res: any) => {
            const data = res.response; // API returns object in response

            // Patch form with mapped keys
            this.stockOutForm.patchValue({
              date: data.date ? new Date(data.date).toISOString() : '',
              incharge: data.in_charge,
              item: data.item_id,
              godownName: data.godown_id,
              lot: data.lot,
              bags: data.bags,
              weight: data.weight,
              transferTo: data.delivery_at || '', // if available
              bin: data.bin || '',
              stack: data.stack || '',
              vehicleNumber: data.vehicle_number,
              remarks: data.remarks || ''
            });
          },
          error: (err) => console.error('Item load failed', err),
        });
      }

    }
    this.malarService.getItems().subscribe({
      next: res => this.itemList = res.map(i => i),
      error: err => console.error('Item load failed', err),
    });
    this.malarService.getGodowns().subscribe({
      next: res => this.godownList = res.map(i => i),
      error: err => console.error('Godowns load failed', err),
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.stockOutForm.invalid) return;

    const formValue = this.stockOutForm.value;
    const payload = {
      sample_report_id: this.processId,
      date: formValue.date,
      item_id: formValue.item,
      dried_at: formValue.godownName,
      delivery_at: formValue.transferTo,
      moisture: formValue.moisture,
      bags: formValue.bags,
      weight: formValue.weight,
      vehicle_number: formValue.vehicleNumber,
      in_charge: formValue.incharge
    };
    if (this.processId) {
      // Update
      this.malarService.updateStockOutward(this.processId, payload).subscribe({
        next: res => {
          console.log('Stock updated:', res);
          this.router.navigate(['/tabs/dashboard']);
        },
        error: err => console.error('Update failed:', err)
      });
    } else {
      // Create
      this.malarService.createStockOutward(payload).subscribe({
        next: res => {
          console.log('Stock created:', res);
          this.router.navigate(['/tabs/samplepage']);
        },
        error: err => console.error('Creation failed:', err)
      });
    }
    // You can now send `payload` to your API
  }

  onDateChange() {
    const control = this.stockOutForm.get('date');
    if (control) {
      const corrected = getValidPastOrToday(control.value);
      control.setValue(corrected, { emitEvent: false });
    }
  }
  onCancel() {
    this.router.navigate(['/tabs/samplepage']);
  }
}
