import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from "@ionic/angular";
import { getValidPastOrToday } from 'src/app/utils/date-utils';
import { MalarService } from '../../services/malar.service';

// Add the import for ReportPayload if it exists in a service/model file
// import { ReportPayload } from 'path-to-model/report-payload.model';

// Or define the interface here if not imported
export interface ReportPayload {
  date: Date | string;
  load_number: string;
  vehicle_number: string;
  driver_name: string;
  cell_number: string;
  party_name: string;
  bill_number: string;
  bill_date: string;
  broker_name?: string;
  item_id: string;
  moisture?: string;
  paddy_type?: string;
  bags?: string;
  weight?: string;
  sample_taken_by?: string;
  rice?: string;
  broken?: string;
  bran?: string;
  total_percentage?: string;
  status: number;
  reason?: string;
  delivered_at?: string;
}



@Component({
  selector: 'app-samplepage',
  templateUrl: './samplepage.page.html',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, FormsModule],
  styleUrls: ['./samplepage.page.scss']
})
export class SamplepagePage implements OnInit {
  processForm!: FormGroup;
  submitted = false;
  editMode = false;
  recordId: string | null = null;
  itemList: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private malarService: MalarService
  ) { }


  ngOnInit() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    this.processForm = this.fb.group({
      date: [formattedDate, Validators.required],
      loadNumber: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
      driverName: ['', Validators.required],
      cellNumber: ['', Validators.required],
      partyName: ['', Validators.required],
      billNoDt: ['', Validators.required],
      brokerName: [''],
      item: ['', Validators.required],
      moisture: [''],
      rawOrDried: ['', Validators.required],
      bags: ['', Validators.required],
      weight: ['', Validators.required],
      sampleTakenBy: [''],
      rice: [''],
      broken: [''],
      bran: [''],
      totalPercentage: [''],
      acceptReject: [1, Validators.required],
      reason: [''],
      deliveryAt: [''],
    });

  }
  ionViewWillEnter() {


    // Get ID from route
    this.recordId = this.route.snapshot.paramMap.get('id');
    if (this.recordId) {
      this.editMode = true;
      this.loadReport(this.recordId);
    }
    this.loadDropdowns();
  }
  get f() {
    return this.processForm.controls;
  }
  loadDropdowns() {
    this.malarService.getItems().subscribe({
      next: res => this.itemList = res.map(i => i),
      error: err => console.error('Item load failed', err),
    });
  }

  loadReport(id: string) {
    this.malarService.getReportById(id).subscribe({
      next: (res) => {
        // Map API fields to form fields
        this.processForm.patchValue({
          date: res.date || new Date(),
          loadNumber: res.load_number || '',
          vehicleNumber: res.vehicle_number || '',
          driverName: res.driver_name || '',
          cellNumber: res.cell_number || '',
          partyName: res.party_name || '',
          billNoDt: res.bill_number || '',
          brokerName: res.broker_name || '',
          item: res.item_id || '',
          moisture: res.moisture || '',
          rawOrDried: res.paddy_type || '',
          bags: res.bags || '',
          weight: res.weight || '',
          sampleTakenBy: res.sample_taken_by || 'new',
          rice: res.rice || '',
          broken: res.broken || '',
          bran: res.bran || '',
          totalPercentage: res.total_percentage || '',
          acceptReject: res.status,
          reason: res.reason || '',
          deliveryAt: res.delivered_at || '',
        });
      },
      error: (err) => console.error('Failed to load report', err)
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.processForm.invalid) {
      this.processForm.markAllAsTouched();
      return;
    }

    const payload = {
      date: new Date(),
      load_number: this.processForm.value.loadNumber,
      vehicle_number: this.processForm.value.vehicleNumber,
      driver_name: this.processForm.value.driverName,
      cell_number: this.processForm.value.cellNumber,
      party_name: this.processForm.value.partyName,
      bill_number: this.processForm.value.billNoDt,
      bill_date: this.processForm.value.date || this.onDateChange(),
      broker_name: this.processForm.value.brokerName,
      item_id: this.processForm.value.item,
      moisture: this.processForm.value.moisture,
      paddy_type: this.processForm.value.rawOrDried,
      bags: this.processForm.value.bags,
      weight: this.processForm.value.weight,
      sample_taken_by: this.processForm.value.sampleTakenBy || 'new',
      rice: this.processForm.value.rice,
      broken: this.processForm.value.broken,
      bran: this.processForm.value.bran,
      total_percentage: this.processForm.value.totalPercentage,
      status: this.processForm.value.acceptReject,
      reason: this.processForm.value.reason,
      delivered_at: this.processForm.value.deliveryAt,
    };

    if (this.editMode && this.recordId) {
      this.malarService.updateReport(this.recordId as string, payload as ReportPayload).subscribe({
        next: (): void => {
          this.router.navigate(['/tabs/samplepage']);
        },
        error: (err: any): void => console.error('Update failed', err)
      });
    } else {
      this.malarService.createReport(payload).subscribe({
        next: () => {
          this.router.navigate(['/tabs/samplepage']);
        },
        error: (err: any) => console.error('Create failed', err)
      });
    }
  }


  onDateChange() {
    const control = this.processForm.get('date');
    if (control) {
      const corrected = getValidPastOrToday(control.value);
      control.setValue(corrected, { emitEvent: false });
    }
  }

  onCancel() {
    this.processForm.reset();
    this.router.navigate(['/tabs/samplepage']);
  }
  calculateTotalPercentage() {
    const moistureValue = parseFloat(this.processForm.value.moisture);
    if (!isNaN(moistureValue)) {
      const paddyType = moistureValue <= 10 ? 1 : 2;
      this.processForm.patchValue({ rawOrDried: paddyType });
    }
  }
}
