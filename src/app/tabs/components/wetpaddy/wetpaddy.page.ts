import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  IonNote,
  IonRow,
  IonTitle, IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-wetpaddy',
  templateUrl: './wetpaddy.page.html',
  styleUrls: ['./wetpaddy.page.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonList, IonItem, IonLabel, IonInput, IonDatetime, IonButton, IonNote,
    CommonModule, ReactiveFormsModule, IonDatetime
  ]
})
export class WetpaddyPage implements OnInit {
  wetpaddyForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.wetpaddyForm = this.fb.group({
      date: ['', Validators.required],
      item: ['', Validators.required],
      driedAt: ['', Validators.required],
      deliveryAt: ['', Validators.required],
      moisture: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      bags: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      weight: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      vehicleNumber: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.wetpaddyForm.valid) {
      console.log('Form Data:', this.wetpaddyForm.value);
    } else {
      this.wetpaddyForm.markAllAsTouched();
    }
  }
  onCancel() {
    this.wetpaddyForm.reset();
    this.router.navigate(['/tabs/dashboard']);
  }
}
