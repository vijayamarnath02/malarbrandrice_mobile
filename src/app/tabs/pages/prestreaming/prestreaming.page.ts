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
  flashOutline,
  gridOutline,
  listOutline,
  settingsOutline,
  shieldCheckmarkOutline,
  timeOutline,
  trashOutline,
  waterOutline
} from 'ionicons/icons';
import { MalarService } from '../../services/malar.service';
@Component({
  selector: 'app-prestreaming',
  templateUrl: './prestreaming.page.html',
  styleUrls: ['./prestreaming.page.scss'],
  standalone: true,
  imports: [IonActionSheet, IonButtons, IonGrid, IonChip, IonCol, IonRow, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, IonButton, IonIcon, IonLabel, IonList, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class PrestreamingPage implements OnInit {
  prestreamList: any[] = [];
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
    addIcons({ settingsOutline, addOutline, timeOutline, flashOutline, waterOutline, createOutline, trashOutline, gridOutline, listOutline, shieldCheckmarkOutline });
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
  editProcess(process: any) {
    this.router.navigate(['/tabs/prestreaming/edit', process._id]);
  }

  logResult(event: CustomEvent<OverlayEventDetail>) {
    this.setOpen(false);
    if (event.detail.role === 'destructive') {
      this.deleteProcess(this.deleteId)
    }
  }
  deleteProcess(process: any) {
    this.malarService.deletePrestreaming(process._id).subscribe(() => {
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
