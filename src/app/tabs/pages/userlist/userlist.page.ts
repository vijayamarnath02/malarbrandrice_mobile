import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonActionSheet, IonAvatar, IonBadge, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import type { OverlayEventDetail } from '@ionic/core';
import { addIcons } from 'ionicons';
import {
  addOutline,
  createOutline,
  personCircleOutline,
  settingsOutline,
  trashOutline
} from 'ionicons/icons';
import { MalarService } from '../../services/malar.service';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.page.html',
  styleUrls: ['./userlist.page.scss'],
  standalone: true,
  imports: [IonActionSheet, IonButton, IonCol, IonRow, IonGrid, IonButtons, IonBadge, IonText, IonLabel, IonIcon, IonAvatar, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class UserlistPage implements OnInit {
  userList: any = [];
  deleteId: any;
  isActionSheetOpen: boolean = false;
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
    addIcons({ settingsOutline, addOutline, personCircleOutline, createOutline, trashOutline, });
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
  logResult(event: CustomEvent<OverlayEventDetail>) {
    this.setOpen(false);
    if (event.detail.role === 'destructive') {
      this.deleteProcess(this.deleteId)
    }
  }
  deleteProcess(process: any) {
    this.malarService.deleteUserProfile(process._id).subscribe(() => {
      this.loadDropdowns();
    });

  }
  setOpen(isOpen: boolean, id?: any) {
    if (id) {
      this.deleteId = id;
    }
    this.isActionSheetOpen = isOpen;
  }
  editProcess(process: any) {
    this.router.navigate(['/tabs/userlist/edit', process._id]);
  }
}
