import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MalarService } from '../../services/malar.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.page.html',
  styleUrls: ['./newuser.page.scss'],
  standalone: true,
  imports: [IonText, IonGrid, IonRow, IonIcon, IonCol, CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonLabel,
    IonButton]
})
export class NewuserPage implements OnInit {
  newUserForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private malarService: MalarService) { }
  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      country_code: ['', Validators.required],
      user_type: [1, Validators.required]
    });
  }
  ionViewWillEnter() {

  }
  submitForm() {
    if (this.newUserForm.valid) {
      const userData = this.newUserForm.value;
      this.malarService.createUserProfile(userData).subscribe({
        next: res => {
          this.newUserForm.reset();
          this.router.navigate(['/tabs/userlist']);
        },
        error: err => {
          console.error('Item load failed', err);
        }
      });
    } else {
      console.warn('Form is invalid');
      this.newUserForm.markAllAsTouched();
    }
  }
  cancel() {
    this.newUserForm.reset();
    this.router.navigate(['/tabs/userlist']);
  }
}
