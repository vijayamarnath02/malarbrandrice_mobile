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
      date: [formattedDate],
      party_name: [''],
      broker_name: [''],
      vehicle_number: ['', Validators.required],
      driver_name: [''],
      cell_number: [''],
      item_id: ['', Validators.required],
      bill_number: [''],
      bill_date: [formattedDate],
      moisture: ['', Validators.required],
      bags: ['', Validators.required],
      weight: ['', Validators.required],
      dried_at: ['']
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
          party_name: data.party_name,
          broker_name: data.broker_name,
          vehicle_number: data.vehicle_number,
          driver_name: data.driver_name,
          cell_number: data.cell_number,
          item_id: data.item_id,
          bill_number: data.bill_number,
          bill_date: data.bill_date,
          moisture: data.moisture,
          bags: data.bags,
          weight: data.weight,
          dried_at: data.dried_at
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
      sample_report_id: localStorage.getItem('paddyInProcessId'),
      ...this.wetpaddyForm.value,   // spreads all fields directly
      moisture: +this.wetpaddyForm.value.moisture,
      bags: +this.wetpaddyForm.value.bags,
      weight: +this.wetpaddyForm.value.weight
    };

    if (this.recordId) {
      // Update existing
      this.malarService.updateWetPaddy(this.recordId, payload).subscribe({
        next: () => {
          console.log('Wet paddy updated successfully');
          this.router.navigate(['/tabs/samplepage']);
        },
        error: (err) => console.error('Update failed', err),
      });
    } else {
      // Create new
      this.malarService.createWetPaddy(payload).subscribe({
        next: () => {
          console.log('Wet paddy created successfully');
          this.wetpaddyForm.reset();
          localStorage.removeItem('paddyInProcessId');
          this.router.navigate(['/tabs/samplepage']);
        },
        error: (err) => console.error('Create failed', err),
      });
    }
  }

  onCancel() {
    this.wetpaddyForm.reset();
    this.router.navigate(['/tabs/viewsamplereport/', this.recordId || localStorage.getItem('paddyInProcessId')])
    localStorage.removeItem('paddyInProcessId');

  }
}
