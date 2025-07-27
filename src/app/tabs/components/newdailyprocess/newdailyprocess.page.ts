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
import { MalarService } from '../../services/malar.service';

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

  itemList: any;
  uralList: any;
  unitList: any;
  loggedInUser = 'admin@malarbrandrice.com';

  constructor(private fb: FormBuilder, private router: Router, private malarService: MalarService) { }

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
  ionViewWillEnter() {
    this.loadDropdowns();
  }
  loadDropdowns() {
    this.malarService.getItems().subscribe({
      next: res => this.itemList = res.map(i => i),
      error: err => console.error('Item load failed', err),
    });
    this.malarService.getGodowns().subscribe({
      next: res => this.uralList = res.map(g => g),
      error: err => console.error('Godown load failed', err),
    });
    this.malarService.getUnits().subscribe({
      next: res => this.unitList = res.map(u => u),
      error: err => console.error('Unit load failed', err),
    });
  }
  isInvalid(field: string): boolean {
    const control = this.dailyProcessForm.get(field);
    return control?.invalid && (control.dirty || control.touched) || false;
  }

  submitForm() {
    if (this.dailyProcessForm.valid) {
      const formValue = this.dailyProcessForm.getRawValue();
      const data = {
        item_id: formValue.item,
        date: new Date(formValue.date).toISOString().split('T')[0],
        godown_id: formValue.ural,
        unit_id: formValue.unit,
        bags: formValue.bags,
        weight: formValue.weight,
        lot_number: formValue.lotNumber,
        vehicle_number: formValue.vehicleNumber,
        moisture: formValue.moisture,
      }
      this.malarService.createDailyProcess(data).subscribe({
        next: res => {
          this.router.navigate(['/tabs/daily-process']); // navigate after success
        },
        error: err => {
          console.error('Item load failed', err);
          // Optionally show a toast or alert here
        }
      });

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
