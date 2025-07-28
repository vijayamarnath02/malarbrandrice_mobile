import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonActionSheet, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonList, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import type { OverlayEventDetail } from '@ionic/core';
import { addIcons } from 'ionicons';
import {
  addOutline,
  createOutline,
  ellipsisVerticalOutline,
  settingsOutline,
  trashOutline
} from 'ionicons/icons';
import { MalarService } from '../../services/malar.service';

@Component({
  selector: 'app-daily-process',
  templateUrl: './daily-process.page.html',
  styleUrls: ['./daily-process.page.scss'],
  standalone: true,
  imports: [IonActionSheet, IonButtons, IonGrid, IonCol, IonRow, IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonText, IonList, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class DailyProcessPage implements OnInit {
  processList: any[] = [];
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
    addIcons({ settingsOutline, addOutline, ellipsisVerticalOutline, createOutline, trashOutline });
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
  editProcess(process: any) {
    this.router.navigate(['/tabs/daily-process/edit', process._id]);
  }

  logResult(event: CustomEvent<OverlayEventDetail>) {
    this.setOpen(false);
    if (event.detail.role === 'destructive') {
      this.deleteProcess(this.deleteId)
    }
  }
  deleteProcess(process: any) {
    this.malarService.deleteDailyProcessById(process._id).subscribe(() => {
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
