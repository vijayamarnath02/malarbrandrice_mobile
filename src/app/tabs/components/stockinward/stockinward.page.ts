import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from "@ionic/angular";
import { MalarService } from '../../services/malar.service';

@Component({
  selector: 'app-stockinward',
  templateUrl: './stockinward.page.html',
  styleUrls: ['./stockinward.page.scss'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    IonicModule]
})
export class StockinwardPage implements OnInit {
  stockForm!: FormGroup;
  submitted = false;
  recordId: string | null = null;
  itemList: any;
  constructor(private fb: FormBuilder, private router: Router, private malarService: MalarService) { }

  ngOnInit() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    this.stockForm = this.fb.group({
      date: [formattedDate, Validators.required],
      item: ['', Validators.required],
      partyName: ['', Validators.required],
      directLoadStake: [''],
      moisture: [''],
      driedAt: [''],
      godownName: ['', Validators.required],
      bin: [''],
      lot: [''],
      bags: ['', Validators.required],
      weight: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
      incharge: [''],
      remark: ['']
    });
  }

  get f() {
    return this.stockForm.controls;
  }
  ionViewWillEnter() {
    this.loadDropdowns();
  }
  loadDropdowns() {
    this.malarService.getItems().subscribe({
      next: res => this.itemList = res.map(i => i),
      error: err => console.error('Item load failed', err),
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.stockForm.invalid) {
      this.stockForm.markAllAsTouched();
      return;
    }

    const payload = {
      date: this.stockForm.value.date,
      item_id: this.stockForm.value.item,
      party_name: this.stockForm.value.partyName,
      direct_load_stake: this.stockForm.value.directLoadStake,
      moisture: +this.stockForm.value.moisture,
      dried_at: this.stockForm.value.driedAt,
      godown_id: this.stockForm.value.godownName, // change if dropdown
      bin: +this.stockForm.value.bin,
      lot: +this.stockForm.value.lot,
      bags: +this.stockForm.value.bags,
      weight: +this.stockForm.value.weight,
      vehicle_number: this.stockForm.value.vehicleNumber,
      reason: this.stockForm.value.remark,
      in_charge: this.stockForm.value.incharge
    };

    if (this.recordId) {
      // Update
      this.malarService.updateStockInward(this.recordId, payload).subscribe({
        next: res => {
          console.log('Stock updated:', res);
          this.router.navigate(['/tabs/dashboard']);
        },
        error: err => console.error('Update failed:', err)
      });
    } else {
      // Create
      this.malarService.createStockInward(payload).subscribe({
        next: res => {
          console.log('Stock created:', res);
          this.router.navigate(['/tabs/dashboard']);
        },
        error: err => console.error('Creation failed:', err)
      });
    }
  }
  onCancel() {
    this.router.navigate(['/tabs/dashboard']);
  }
}
