import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  processId: string | null = null;
  originalFormValue: any;

  constructor(private fb: FormBuilder, private router: Router, private malarService: MalarService, private route: ActivatedRoute) { }
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
    this.processId = this.route.snapshot.paramMap.get('id') || null;
    if (this.processId !== null) {
      this.getDailyProcessById();
    }
  }
  submitForm() {
    if (this.newUserForm.valid && this.processId === null) {
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
    } else if (this.newUserForm.valid && this.processId !== null) {
      const userData = this.newUserForm.value;
      const data = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        country_code: userData.country_code.toString(),
        user_type: userData.user_type
      }
      this.malarService.putUserProfileId(this.processId, data).subscribe({
        next: res => {
          this.newUserForm.reset();
          this.router.navigate(['/tabs/userlist']);
        },
        error: err => {
          console.error('Item load failed', err);
        }
      });
    }
    else {
      console.warn('Form is invalid');
      this.newUserForm.markAllAsTouched();
    }
  }
  getDailyProcessById() {
    this.malarService.getUserProfileId(this.processId || "0").subscribe({
      next: res => {
        this.newUserForm.patchValue({
          name: res.name,
          email: res.email,
          phone: res.phone,
          country_code: res.country_code,
          user_type: res.user_type
        })
        this.originalFormValue = JSON.stringify(this.newUserForm.value);
        this.newUserForm.markAsPristine();
      },
      error: err => console.error('Unit load failed', err),
    });
  }
  cancel() {
    this.newUserForm.reset();
    this.router.navigate(['/tabs/userlist']);
  }
  isFormUnchanged(): boolean {
    return JSON.stringify(this.newUserForm.value) === this.originalFormValue;
  }
}
