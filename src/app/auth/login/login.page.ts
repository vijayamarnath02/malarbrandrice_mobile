import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonInput, IonInputPasswordToggle, IonItem, IonRow, IonText } from '@ionic/angular/standalone';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonInput, IonCard, IonRow, IonGrid, IonCol, IonCardContent, IonInputPasswordToggle, IonButton, ReactiveFormsModule, IonText, IonItem, RouterModule]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Logging in with', username, password);
      // Call login service or logic here
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
