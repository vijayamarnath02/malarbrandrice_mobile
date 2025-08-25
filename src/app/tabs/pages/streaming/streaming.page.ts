import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonActionSheet, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonList, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import type { OverlayEventDetail } from '@ionic/core';
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
  imports: [IonActionSheet, IonButtons, IonGrid, IonChip, IonCol, IonRow, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButton, IonIcon, IonList, IonLabel, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class StreamingPage implements OnInit {
  streamingList: any[] = [];
  isActionSheetOpen: boolean = false;
  deleteId: any;
  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];
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
      next: (res: any) => {
        this.streamingList = res.response.data.map((i: any) => i);
      },
      error: err => console.error('Item load failed', err),
    });

  }
  editProcess(process: any) {
    this.router.navigate(['/tabs/streaming/edit', process._id]);
  }
  logResult(event: CustomEvent<OverlayEventDetail>) {
    this.setOpen(false);
    if (event.detail.role === 'destructive') {
      this.deleteProcess(this.deleteId)
    }
  }
  deleteProcess(process: any) {
    this.malarService.deletestreaming(process._id).subscribe(() => {
      this.loadDropdowns();
    });

  }
  setOpen(isOpen: boolean, id?: any) {
    if (id) {
      this.deleteId = id;
    }
    this.isActionSheetOpen = isOpen;
  }


}
