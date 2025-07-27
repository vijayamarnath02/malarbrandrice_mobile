import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonAvatar, IonBadge, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  personCircleOutline,
  settingsOutline
} from 'ionicons/icons';
import { MalarService } from '../../services/malar.service';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.page.html',
  styleUrls: ['./userlist.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonButtons, IonBadge, IonText, IonLabel, IonIcon, IonAvatar, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class UserlistPage implements OnInit {
  userList: any = [];
  constructor(private malarService: MalarService) {
    addIcons({ settingsOutline, addOutline, personCircleOutline, });
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.loadDropdowns();
  }
  loadDropdowns() {
    this.malarService.getAllUserProfile().subscribe({
      next: res => {
        this.userList = res.data;
      },
      error: err => console.error('Item load failed', err)
    });
  }

}
