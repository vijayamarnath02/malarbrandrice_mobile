import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonList, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline, settingsOutline
} from 'ionicons/icons';
import { MalarService } from '../../services/malar.service';
@Component({
  selector: 'app-daily-process',
  templateUrl: './daily-process.page.html',
  styleUrls: ['./daily-process.page.scss'],
  standalone: true,
  imports: [IonButtons, IonGrid, IonCol, IonRow, IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonText, IonList, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class DailyProcessPage implements OnInit {
  processList: any[] = [];
  constructor(private malarService: MalarService) {
    addIcons({ settingsOutline, addOutline });
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.loadDropdowns();
  }

  loadDropdowns() {
    this.malarService.getDailyProcesses().subscribe({
      next: res => this.processList = res.map(i => i),
      error: err => console.error('Item load failed', err),
    });
  }

}
