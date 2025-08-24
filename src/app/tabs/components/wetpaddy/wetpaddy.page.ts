import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from "@ionic/angular";
import { MalarService } from '../../services/malar.service';

@Component({
  selector: 'app-wetpaddy',
  templateUrl: './wetpaddy.page.html',
  styleUrls: ['./wetpaddy.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class WetpaddyPage implements OnInit {
  wetpaddyForm!: FormGroup;
  itemList: any[] = [];
  recordId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private malarService: MalarService
  ) { }

  ngOnInit() {
    // Pre-fill today's date
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    this.wetpaddyForm = this.fb.group({
      date: [formattedDate, Validators.required],
      partyName: [''],
      brokerName: [''],
      vehicleNumber: ['', Validators.required],
      driverName: [''],
      cellNumber: [''],
      item: ['', Validators.required],
      billNumber: [''],
      billDate: [''],
      moisture: ['', Validators.required],
      bags: ['', Validators.required],
      weight: ['', Validators.required],
      driedAt: ['']
    });
  }

  ionViewWillEnter() {
    this.recordId = this.route.snapshot.paramMap.get('id');
    this.loadDropdowns();

    if (this.recordId) {
      this.loadWetPaddyDetails(this.recordId);
    }
  }

  loadDropdowns() {
    this.malarService.getItems().subscribe({
      next: res => (this.itemList = res),
      error: err => console.error('Item load failed', err),
    });
  }

  // Fetch details for edit
  loadWetPaddyDetails(id: string) {
    this.malarService.getWetPaddyById(id).subscribe({
      next: (data) => {
        this.wetpaddyForm.patchValue({
          date: data.date,
          partyName: data.party_name,
          brokerName: data.broker_name,
          vehicleNumber: data.vehicle_number,
          driverName: data.driver_name,
          cellNumber: data.cell_number,
          item: data.item_id,
          billNumber: data.bill_number,
          billDate: data.bill_date,
          moisture: data.moisture,
          bags: data.bags,
          weight: data.weight,
          driedAt: data.dried_at
        });
      },
      error: (err) => console.error('Failed to load record', err),
    });
  }

  onSubmit() {
    if (this.wetpaddyForm.invalid) {
      this.wetpaddyForm.markAllAsTouched();
      return;
    }

    const payload = {
      date: this.wetpaddyForm.value.date,
      party_name: this.wetpaddyForm.value.partyName,
      broker_name: this.wetpaddyForm.value.brokerName,
      vehicle_number: this.wetpaddyForm.value.vehicleNumber,
      driver_name: this.wetpaddyForm.value.driverName,
      cell_number: this.wetpaddyForm.value.cellNumber,
      item_id: this.wetpaddyForm.value.item,
      bill_number: this.wetpaddyForm.value.billNumber,
      bill_date: this.wetpaddyForm.value.billDate,
      moisture: +this.wetpaddyForm.value.moisture,
      bags: +this.wetpaddyForm.value.bags,
      weight: +this.wetpaddyForm.value.weight,
      dried_at: this.wetpaddyForm.value.driedAt,
    };

    if (this.recordId) {
      // Update existing
      this.malarService.updateWetPaddy(this.recordId, payload).subscribe({
        next: () => {
          console.log('Wet paddy updated successfully');
          this.router.navigate(['/tabs/dashboard']);
        },
        error: (err) => console.error('Update failed', err),
      });
    } else {
      // Create new
      this.malarService.createWetPaddy(payload).subscribe({
        next: () => {
          console.log('Wet paddy created successfully');
          this.router.navigate(['/tabs/dashboard']);
        },
        error: (err) => console.error('Create failed', err),
      });
    }
  }

  onCancel() {
    this.wetpaddyForm.reset();
    this.router.navigate(['/tabs/dashboard']);
  }
}
