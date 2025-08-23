import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { MalarService } from '../../services/malar.service';

@Component({
  selector: 'app-samplepage',
  templateUrl: './samplepage.page.html',
  styleUrls: ['./samplepage.page.scss'],
  standalone: true,
  imports: [IonCol, IonGrid, IonRow, IonText,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Ionic components
    IonList, IonItem, IonLabel, IonButton, IonContent, IonHeader, IonTitle, IonToolbar,
    IonInput, IonDatetime, IonSelect, IonSelectOption
  ]
})
export class SamplepagePage implements OnInit {
  processForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router, private malarService: MalarService) { }

  ngOnInit() {
    // Format date as 'YYYY-MM-DD'
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
      acceptReject: ['', Validators.required],
      reason: [''],
      deliveryAt: [''],
    });
  }

  get f() {
    return this.processForm.controls;
  }
  ionViewWillEnter() {

  }

  onSubmit() {
    this.submitted = true;
    if (this.processForm.invalid) {
      this.processForm.markAllAsTouched();
      return;
    }
    else {
      const payload = {
        date: this.processForm.value.date,
        load_number: this.processForm.value.loadNumber,
        vehicle_number: this.processForm.value.vehicleNumber,
        driver_name: this.processForm.value.driverName,
        cell_number: this.processForm.value.cellNumber,
        party_name: this.processForm.value.partyName,
        bill_number: this.processForm.value.billNoDt,
        bill_date: this.processForm.value.date, // You may separate billNo and billDate
        broker_name: this.processForm.value.brokerName,
        item_id: this.processForm.value.item, // maybe from dropdown later
        moisture: this.processForm.value.moisture,
        paddy_type: this.processForm.value.rawOrDried,
        bags: this.processForm.value.bags,
        weight: this.processForm.value.weight,
        sample_taken_by: this.processForm.value.sampleTakenBy,
        rice: this.processForm.value.rice,
        broken: this.processForm.value.broken,
        bran: this.processForm.value.bran,
        total_percentage: this.processForm.value.totalPercentage,
        status: this.processForm.value.acceptReject === 'Ok' ? 1 : 0,
        reason: this.processForm.value.reason,
        delivered_at: this.processForm.value.deliveryAt,
      };
      this.malarService.createReport(payload).subscribe({
        next: res => {
          this.processForm.reset();
          this.router.navigate(['/tabs/userlist']);
        },
        error: err => {
          console.error('Item load failed', err);
        }
      });
    }
  }
  onCancel() {
    this.processForm.reset();

    this.router.navigate(['/tabs/dashboard']);

  }
}
