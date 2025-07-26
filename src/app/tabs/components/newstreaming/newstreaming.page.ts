import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput, IonItem, IonLabel, IonList,
  IonRow,
  IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar
} from '@ionic/angular/standalone';
import { MalarService } from '../../services/malar.service';

@Component({
  selector: 'app-newstreaming',
  templateUrl: './newstreaming.page.html',
  styleUrls: ['./newstreaming.page.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonIcon, IonCol,
    CommonModule, FormsModule, ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
    IonButton, IonText
  ]
})
export class NewStreamingPage implements OnInit {
  streamingForm!: FormGroup;
  itemList: any;
  unitList: any;
  dryerList = ['Dryer 1', 'Dryer 2'];
  batchNumber = 'STRM-' + Math.floor(Math.random() * 100000);

  constructor(private fb: FormBuilder, private malarService: MalarService) { }

  ngOnInit() {
    this.streamingForm = this.fb.group({
      item: ['', Validators.required],
      unit: ['', Validators.required],
      batchNumber: [{ value: this.batchNumber, disabled: true }],
      streamingTiming: ['', Validators.required],
      streamStartTime: ['', Validators.required],
      endTime: ['', Validators.required],
      dryer: ['', Validators.required],
    });
  }
  ionViewWillEnter() {
    this.loadDropdowns();
  }
  loadDropdowns() {
    this.malarService.getItems().subscribe({
      next: res => this.itemList = res.map(i => i.name),
      error: err => console.error('Item load failed', err),
    });
    this.malarService.getUnits().subscribe({
      next: res => this.unitList = res.map(u => u.name),
      error: err => console.error('Unit load failed', err),
    });
    this.malarService.getDryers().subscribe({
      next: res => this.dryerList = res.map(u => u.name),
      error: err => console.error('Unit load failed', err),
    });
  }

  isInvalid(field: string): boolean {
    const control = this.streamingForm.get(field);
    return control?.invalid && (control?.touched || control?.dirty) || false;
  }

  submitForm() {
    if (this.streamingForm.valid) {
      const formValue = this.streamingForm.getRawValue();
      console.log('Streaming Submitted:', formValue);
      // Implement submission logic here (API call, etc.)
    } else {
      this.streamingForm.markAllAsTouched();
    }
  }

  cancel() {
    this.streamingForm.reset({
      batchNumber: this.batchNumber
    });
  }
}
