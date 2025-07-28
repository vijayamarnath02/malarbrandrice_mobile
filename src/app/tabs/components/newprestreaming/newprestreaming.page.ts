import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { MalarService } from '../../services/malar.service';

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
  itemList: any;
  unitList: any;
  loggedInUser = 'admin@malarbrandrice.com';
  batchNumber = 'BATCH-' + Math.floor(Math.random() * 100000);
  processId: string | null = null;
  originalFormValue: any;
  constructor(private fb: FormBuilder, private router: Router, private malarService: MalarService, private route: ActivatedRoute) { }

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
      incharge: [this.loggedInUser, Validators.required]
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
    this.malarService.getUnits().subscribe({
      next: res => this.unitList = res.map(u => u),
      error: err => console.error('Unit load failed', err),
    });
  }
  isInvalid(field: string): boolean {
    const control = this.prestreamingForm.get(field);
    return control?.invalid && (control?.touched || control?.dirty) || false;
  }
  getDailyProcessById() {
    this.malarService.getPrestreamingById(this.processId || "0").subscribe({
      next: res => {
        this.prestreamingForm.patchValue({
          item: res.item_id._id,
          unit: res.unit_id._id,
          batchNumber: res.batch_number,
          tankLevelTiming: res.tank_level_timing,
          timing: res.timing,
          uralTiming: res.ural_timing,
          waterReleaseTiming: res.water_release_timing,
          remarks: res.remarks,
          incharge: res.incharge
        })
        this.originalFormValue = JSON.stringify(this.prestreamingForm.value);
        this.prestreamingForm.markAsPristine();
      },
      error: err => console.error('Unit load failed', err),
    });
  }


  submitForm() {
    if (this.prestreamingForm.valid && this.processId === null) {
      const formValue = this.prestreamingForm.getRawValue();
      const data = {
        item_id: formValue.item,
        unit_id: formValue.unit,
        tank_level_timing: formValue.tankLevelTiming,
        timing: formValue.timing,
        ural_timing: formValue.uralTiming,
        water_release_timing: formValue.waterReleaseTiming,
        remarks: formValue.remarks,

      }
      this.malarService.createPrestreaming(data).subscribe({
        next: res => {
          this.router.navigate(['/tabs/prestreaming']); // navigate after success
        },
        error: err => {
          console.error('Item load failed', err);
        }
      });
    }
    else if (this.prestreamingForm.valid && this.processId !== null) {
      const formValue = this.prestreamingForm.getRawValue();
      const data = {
        item_id: formValue.item,
        unit_id: formValue.unit,
        tank_level_timing: formValue.tankLevelTiming,
        timing: formValue.timing,
        ural_timing: formValue.uralTiming,
        water_release_timing: formValue.waterReleaseTiming,
        remarks: formValue.remarks,
      }
      this.malarService.putPrestreaming(this.processId, data).subscribe({
        next: res => {
          this.router.navigate(['/tabs/prestreaming']);
        },
        error: err => {
          console.error('Item load failed', err);
        }
      });
    }
  }
  isFormUnchanged(): boolean {
    return JSON.stringify(this.prestreamingForm.value) === this.originalFormValue;
  }

  onCancel() {
    this.prestreamingForm.reset();
    this.router.navigate(['/tabs/prestreaming']);
  }
}
