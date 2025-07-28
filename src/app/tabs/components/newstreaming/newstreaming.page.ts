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
  dryerList: any;
  batchNumber = 'STRM-' + Math.floor(Math.random() * 100000);
  processId: string | null = null;
  originalFormValue: any;
  constructor(private fb: FormBuilder, private malarService: MalarService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.streamingForm = this.fb.group({
      item: ['', Validators.required],
      unit: ['', Validators.required],
      batchNumber: ['', Validators.required],
      streamingTiming: ['', Validators.required],
      streamStartTime: ['', Validators.required],
      endTime: ['', Validators.required],
      streamEndTime: ['', Validators.required],
      dryer: ['', Validators.required],
    });
  }
  ionViewWillEnter() {
    this.processId = this.route.snapshot.paramMap.get('id') || null;
    this.loadDropdowns();
    if (this.processId !== null) {
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
    this.malarService.getDryers().subscribe({
      next: res => this.dryerList = res.map(u => u),
      error: err => console.error('Unit load failed', err),
    });
  }

  getDailyProcessById() {
    this.malarService.getStreamingById(this.processId || "0").subscribe({
      next: res => {
        this.streamingForm.patchValue({
          item: res.item_id._id,
          unit: res.unit_id._id,
          batchNumber: res.batch_number,
          streamingTiming: res.streamend_time,
          streamStartTime: res.stream_start_time,
          endTime: res.streamend_time,
          streamEndTime: res.streamend_time,
          dryer: res.dryer_id._id,
        })
        this.originalFormValue = JSON.stringify(this.streamingForm.value);
        this.streamingForm.markAsPristine();
      },
      error: err => console.error('Unit load failed', err),
    });
  }
  isInvalid(field: string): boolean {
    const control = this.streamingForm.get(field);
    return control?.invalid && (control?.touched || control?.dirty) || false;
  }
  isFormUnchanged(): boolean {
    return JSON.stringify(this.streamingForm.value) === this.originalFormValue;
  }
  submitForm() {
    if (this.streamingForm.valid && this.processId === null) {
      const formValue = this.streamingForm.getRawValue();
      const data = {
        item_id: formValue.item,
        unit_id: formValue.unit,
        streaming_timing: formValue.streamingTiming,
        stream_start_time: formValue.streamStartTime,
        stream_end_time: formValue.streamEndTime,
        streamend_time: formValue.endTime,
        dryer_id: formValue.dryer

      }
      this.malarService.createStreaming(data).subscribe({
        next: res => {
          this.router.navigate(['/tabs/streaming']);
        },
        error: err => {
          console.error('Item load failed', err);
        }
      });
    }
    else if (this.streamingForm.valid && this.processId !== null) {
      const formValue = this.streamingForm.getRawValue();
      const data = {
        item_id: formValue.item,
        unit_id: formValue.unit,
        streaming_timing: formValue.streamingTiming,
        stream_start_time: formValue.streamStartTime,
        stream_end_time: formValue.streamEndTime,
        streamend_time: formValue.endTime,
        dryer_id: formValue.dryer

      }
      this.malarService.putStreaming(this.processId, data).subscribe({
        next: res => {
          this.router.navigate(['/tabs/streaming']);
        },
        error: err => {
          console.error('Item load failed', err);
        }
      });
    } else {
      this.streamingForm.markAllAsTouched();
    }
  }

  cancel() {
    this.streamingForm.reset({
      batchNumber: this.batchNumber
    });
    this.router.navigate(['/tabs/streaming']);
  }
}
