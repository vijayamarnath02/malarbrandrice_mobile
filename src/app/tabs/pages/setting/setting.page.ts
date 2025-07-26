import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonList,
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonButton,
    IonIcon
  ]
})
export class SettingPage implements OnInit {
  selectedLanguage = 'en';
  notificationsEnabled = true;

  constructor() { }

  ngOnInit() { }

  changePassword() {
    console.log('Change Password clicked');
    // Optional: open modal
  }

  logout() {
    console.log('Logout triggered');
    // Implement logout logic
  }
}
