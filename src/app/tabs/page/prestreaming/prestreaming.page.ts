import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-prestreaming',
  templateUrl: './prestreaming.page.html',
  styleUrls: ['./prestreaming.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule]
})
export class PrestreamingPage implements OnInit {
  title: string = 'Prestreaming';
  prestreamForm!: FormGroup;
  items = [
    { key: 'item1', value: 'Item 1' },
    { key: 'item2', value: 'Item 2' },
    { key: 'item3', value: 'Item 3' }
  ];

  units = [
    { key: 'unit_1', value: 'Unit 1' },
    { key: 'unit_2', value: 'Unit 2' },
    { key: 'unit_3', value: 'Unit 3' }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const loginedUser = 'John Doe'; // Replace with actual logged-in user
    const batchNumber = this.generateBatchNumber();

    this.prestreamForm = this.fb.group({
      item: ['', Validators.required],
      unit: ['', Validators.required],
      batchNumber: [{ value: batchNumber, disabled: true }],
      tankLevelTiming: ['', Validators.required],
      incharge: [{ value: loginedUser, disabled: true }],
      timing: ['', Validators.required],
      uralTiming: ['', Validators.required],
      waterReleaseTiming: ['', Validators.required],
      remarks: ['']
    });
  }
  generateBatchNumber(): string {
    const now = new Date();
    return 'BN-' + now.getFullYear().toString().slice(-2) + (now.getMonth() + 1).toString().padStart(2, '0') + now.getDate().toString().padStart(2, '0') + '-' + now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0');
  }

  onSubmit() {
    if (this.prestreamForm.valid) {
      const formData = this.prestreamForm.getRawValue(); // includes disabled fields
      console.log('Form Submitted:', formData);
      // Submit to API or handle logic
    } else {
      console.warn('❌ Form is invalid');
      this.prestreamForm.markAllAsTouched();


    }
  }
}
