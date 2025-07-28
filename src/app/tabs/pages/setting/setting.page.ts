import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
import { MalarService } from '../../services/malar.service';

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

  constructor(private malarService: MalarService, private router: Router) { }

  ngOnInit() { }

  changePassword() {
    console.log('Change Password clicked');
    // Optional: open modal
  }

  logout() {
    this.malarService.logout().subscribe((data) => {
      localStorage.clear();
      this.router.navigate(['/']);
    })
  }
}
