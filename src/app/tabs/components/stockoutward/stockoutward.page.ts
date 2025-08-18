import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-stockoutward',
  templateUrl: './stockoutward.page.html',
  styleUrls: ['./stockoutward.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonList,
    IonDatetime,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonDatetime
  ]
})
export class StockoutwardPage implements OnInit {
  stockOutForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.stockOutForm = this.fb.group({
      date: ['', Validators.required],
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
  }

  get f() {
    return this.stockOutForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.stockOutForm.invalid) return;
    console.log('Stock Outward Data:', this.stockOutForm.value);
  }
}
