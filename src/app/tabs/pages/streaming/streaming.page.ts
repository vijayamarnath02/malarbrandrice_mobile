import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonList, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  createOutline,
  hardwareChipOutline,
  playForwardOutline,
  settingsOutline,
  stopOutline,
  timeOutline,
  trashOutline
} from 'ionicons/icons';
import { MalarService } from '../../services/malar.service';
@Component({
  selector: 'app-streaming',
  templateUrl: './streaming.page.html',
  styleUrls: ['./streaming.page.scss'],
  standalone: true,
  imports: [IonButtons, IonGrid, IonChip, IonCol, IonRow, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButton, IonIcon, IonList, IonLabel, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class StreamingPage implements OnInit {
  streamingList: any[] = [];
  constructor(private malarService: MalarService, private readonly router: Router) {
    addIcons({ settingsOutline, addOutline, timeOutline, playForwardOutline, stopOutline, hardwareChipOutline, createOutline, trashOutline });
  }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.loadDropdowns();
  }

  loadDropdowns() {
    this.malarService.getStreamings().subscribe({
      next: res => this.streamingList = res.map(i => i),
      error: err => console.error('Item load failed', err),
    });

  }
  editProcess(process: any) {
    this.router.navigate(['/tabs/daily-process/edit', process._id]);
  }


}
