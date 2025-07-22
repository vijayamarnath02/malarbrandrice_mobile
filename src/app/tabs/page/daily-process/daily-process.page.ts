import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-daily-process',
  templateUrl: './daily-process.page.html',
  styleUrls: ['./daily-process.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class DailyProcessPage implements OnInit {
  dailyForm!: FormGroup;
  title: string = 'Daily Process'
  items = [
    { key: 'item1', value: 'Item 1' },
    { key: 'item2', value: 'Item 2' },
    { key: 'item3', value: 'Item 3' }
  ];

  urals = [
    { key: 'godown_a', value: 'Godown A' },
    { key: 'godown_b', value: 'Godown B' },
    { key: 'godown_c', value: 'Godown C' }
  ];

  units = [
    { key: 'unit_1', value: 'Unit 1' },
    { key: 'unit_2', value: 'Unit 2' },
    { key: 'unit_3', value: 'Unit 3' }
  ];

  selectedFruit: string = "";
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const loginedUser = 'John Doe';
    this.dailyForm = this.fb.group({
      item: ['', Validators.required],
      dateValue: [{ value: new Date().toISOString().slice(0, 10), disabled: true }, Validators.required],
      ural: ['', Validators.required],
      unit: ['', Validators.required],
      lotNumber: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
      bags: ['', [Validators.required, Validators.min(1)]],
      weight: ['', [Validators.required, Validators.min(1)]],
      moisture: ['', [Validators.required]],
      incharge: [{ value: loginedUser, disabled: true }],
    });
  }
  ionViewWillEnter() {
    this.ngOnInit();
  }
  get itemControl() { return this.dailyForm.get('item'); }
  get dateControl() { return this.dailyForm.get('date'); }
  get uralControl() { return this.dailyForm.get('ural'); }
  get unitControl() { return this.dailyForm.get('unit'); }
  get lotNumberControl() { return this.dailyForm.get('lotNumber'); }
  get vehicleNumberControl() { return this.dailyForm.get('vehicleNumber'); }
  get bagsControl() { return this.dailyForm.get('bags'); }
  get weightControl() { return this.dailyForm.get('weight'); }
  get moistureControl() { return this.dailyForm.get('moisture'); }
  onSubmit() {
    if (this.dailyForm.valid) {
      // Handle form submission
      // Use this.dailyForm.getRawValue() to include disabled fields!
      const data = this.dailyForm.getRawValue();
      console.log(data);
    }
  }
}
