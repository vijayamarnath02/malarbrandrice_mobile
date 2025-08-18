import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem, IonLabel,
  IonList,
  IonRow,
  IonText,
  IonTitle, IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-stockinward',
  templateUrl: './stockinward.page.html',
  styleUrls: ['./stockinward.page.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonText,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonInput, IonButton, IonList,
    CommonModule, ReactiveFormsModule,
    IonDatetime
  ]
})
export class StockinwardPage implements OnInit {
  stockForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.stockForm = this.fb.group({
      date: ['', Validators.required],
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

  onSubmit() {
    this.submitted = true;
    if (this.stockForm.invalid) {
      return;
    }
    console.log('Form submitted:', this.stockForm.value);
  }
  onCancel() {

  }
}
