import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonInput, IonInputPasswordToggle, IonItem, IonRow, IonText } from '@ionic/angular/standalone';
import { MalarService } from 'src/app/tabs/services/malar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonInput, IonCard, IonRow, IonGrid, IonCol, IonCardContent, IonInputPasswordToggle, IonButton, ReactiveFormsModule, IonText, IonItem, RouterModule]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private malarService: MalarService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ionViewWillEnter() {
    let Token = localStorage.getItem('token');
    const token = localStorage.getItem('token');
    if (token) {
      this.malarService.loginTokenCheck().subscribe({
        next: (data: any) => {
          this.router.navigate(['/tabs/dashboard']);
        },
        error: (err) => {

          console.error('Session expired or error:', err);
          localStorage.clear();
          this.router.navigate(['/']);
        }
      });
    }
    else {
      this.router.navigate(['/']);
    }
  }
  onLogin() {

    if (this.loginForm.valid) {
      const data = {
        email: this.loginForm.value.username,
        password: this.loginForm.value.password
      }
      this.malarService.login(data).subscribe({
        next: (res: any) => {
          if (res.statusCode == 200) {
            console.log(res);
            localStorage.setItem('token', res?.response?.token);
            localStorage.setItem('userrole', res?.response?.user_type)
            setTimeout(() => {
              this.router.navigate(['/tabs/dashboard']);
            }, 2000)

          }
        },
        error: err => {
          alert('login failed.')
          console.error('Item load failed', err);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  ionViewDidLeave() {
    this.loginForm.reset();
  }

}
