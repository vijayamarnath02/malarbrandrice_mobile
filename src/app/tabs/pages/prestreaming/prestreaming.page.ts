import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonList, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline, flashOutline,
  gridOutline,
  listOutline,
  settingsOutline,
  shieldCheckmarkOutline,
  timeOutline,
  waterOutline
} from 'ionicons/icons';
import { MalarService } from '../../services/malar.service';
@Component({
  selector: 'app-prestreaming',
  templateUrl: './prestreaming.page.html',
  styleUrls: ['./prestreaming.page.scss'],
  standalone: true,
  imports: [IonButtons, IonGrid, IonChip, IonCol, IonRow, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, IonButton, IonIcon, IonLabel, IonList, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class PrestreamingPage implements OnInit {
  prestreamList: any[] = [];
  constructor(private malarService: MalarService) {
    addIcons({ settingsOutline, addOutline, timeOutline, flashOutline, waterOutline, gridOutline, listOutline, shieldCheckmarkOutline });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadDropdowns();
  }

  loadDropdowns() {
    this.malarService.getPrestreamings().subscribe({
      next: res => this.prestreamList = res.map(i => i),
      error: err => console.error('Item load failed', err),
    });
  }

}
