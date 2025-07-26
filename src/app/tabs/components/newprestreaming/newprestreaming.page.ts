import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput, IonItem, IonLabel, IonList,
  IonRow,
  IonSelect, IonSelectOption, IonText, IonTextarea, IonTitle, IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-newprestreaming',
  templateUrl: './newprestreaming.page.html',
  styleUrls: ['./newprestreaming.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid,
    CommonModule, FormsModule, ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
    IonButton, IonText, IonTextarea
  ]
})
export class NewPrestreamingPage implements OnInit {
  prestreamingForm!: FormGroup;
  itemList = ['Paddy', 'Boiled Rice', 'Raw Rice'];
  unitList = ['Unit A', 'Unit B'];
  loggedInUser = 'admin@malarbrandrice.com';
  batchNumber = 'BATCH-' + Math.floor(Math.random() * 100000);

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.prestreamingForm = this.fb.group({
      item: ['', Validators.required],
      unit: ['', Validators.required],
      batchNumber: [{ value: this.batchNumber, disabled: true }],
      tankLevelTiming: ['', Validators.required],
      timing: ['', Validators.required],
      uralTiming: ['', Validators.required],
      waterReleaseTiming: ['', Validators.required],
      remarks: ['', Validators.required],
      incharge: [{ value: this.loggedInUser, disabled: true }]
    });
  }

  isInvalid(field: string): boolean {
    const control = this.prestreamingForm.get(field);
    return control?.invalid && (control?.touched || control?.dirty) || false;
  }

  submitForm() {
    if (this.prestreamingForm.valid) {
      const formValue = this.prestreamingForm.getRawValue(); // Includes disabled fields
      console.log('Prestreaming Submitted:', formValue);
      // Send to API here
    }
  }

  onCancel() {
    this.prestreamingForm.reset();
    this.router.navigate(['/tabs/prestreaming']);
  }
}
