import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonCol,
  IonContent,
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
  selector: 'app-newdailyprocess',
  templateUrl: './newdailyprocess.page.html',
  styleUrls: ['./newdailyprocess.page.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol,
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonText,
    IonButton
  ]
})
export class NewdailyprocessPage implements OnInit {
  dailyProcessForm!: FormGroup;

  itemList = ['Paddy', 'Rice', 'Broken Rice'];
  uralList = ['Godown A', 'Godown B'];
  unitList = ['Unit 1', 'Unit 2'];
  loggedInUser = 'admin@malarbrandrice.com';

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.dailyProcessForm = this.fb.group({
      item: ['', Validators.required],
      date: [{ value: new Date().toISOString(), disabled: true }, Validators.required],
      ural: ['', Validators.required],
      unit: ['', Validators.required],
      lotNumber: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
      bags: ['', Validators.required],
      weight: ['', Validators.required],
      moisture: ['', Validators.required],
      incharge: [{ value: this.loggedInUser, disabled: true }, Validators.required]
    });
  }

  isInvalid(field: string): boolean {
    const control = this.dailyProcessForm.get(field);
    return control?.invalid && (control.dirty || control.touched) || false;
  }

  submitForm() {
    if (this.dailyProcessForm.valid) {
      const formValue = this.dailyProcessForm.getRawValue(); // includes disabled fields
      console.log('Form Submitted:', formValue);
      // Make API call here
    }
  }
  onCancel() {
    this.dailyProcessForm.reset({
      date: new Date().toISOString(),
      incharge: this.loggedInUser,
    });
    this.router.navigate(['/tabs/daily-process']);
  }
}
