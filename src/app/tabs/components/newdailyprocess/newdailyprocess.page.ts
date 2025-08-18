import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  IonButton,
  IonButtons,
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
  imports: [IonButtons, IonGrid, IonRow, IonCol,
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
  processId: string | null = null;
  originalFormValue: any;
  constructor(private fb: FormBuilder, private router: Router, private malarService: MalarService, private route: ActivatedRoute) { }

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
      incharge: [this.loggedInUser || '', Validators.required]
    });
  }
  ionViewWillEnter() {
    this.processId = this.route.snapshot.paramMap.get('id') || null;
    this.loadDropdowns();
    if (this.processId && this.processId != null) {
      this.getDailyProcessById();
    }
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
  getDailyProcessById() {
    this.malarService.getDailyProcessById(this.processId || "0").subscribe({
      next: res => {
        this.dailyProcessForm.patchValue({
          item: res.item_id._id,
          date: res.date,
          ural: res.godown_id._id,
          unit: res.unit_id._id,
          lotNumber: res.lot_number,
          vehicleNumber: res.vehicle_number,
          bags: res.bags,
          weight: res.weight,
          moisture: res.moisture,
          incharge: res.incharge.name
        })
        this.originalFormValue = JSON.stringify(this.dailyProcessForm.value);
        this.dailyProcessForm.markAsPristine();
      },
      error: err => console.error('Unit load failed', err),
    });
  }

  submitForm() {
    if (this.dailyProcessForm.valid && this.processId === null) {
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
        }
      });

    }
    else if (this.dailyProcessForm.valid && this.processId !== null) {
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
      this.malarService.putDailyProcessById(this.processId, data).subscribe({
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
  isFormUnchanged(): boolean {
    return JSON.stringify(this.dailyProcessForm.value) === this.originalFormValue;
  }
}
