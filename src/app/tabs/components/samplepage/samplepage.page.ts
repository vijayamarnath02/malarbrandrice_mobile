import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.processForm = this.fb.group({
      date: ['', Validators.required],
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

  onSubmit() {
    this.submitted = true;
    if (this.processForm.invalid) {
      return;
    }
    console.log(this.processForm.value);
  }
  onCancel() {
    this.processForm.reset();
  }
}
