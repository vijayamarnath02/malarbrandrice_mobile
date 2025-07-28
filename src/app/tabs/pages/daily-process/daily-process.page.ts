import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonList, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
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
  imports: [IonButtons, IonGrid, IonCol, IonRow, IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonText, IonList, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class DailyProcessPage implements OnInit {
  processList: any[] = [];
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

  deleteProcess(process: any) {
    const confirmed = confirm('Are you sure you want to delete this entry?');
    if (confirmed) {
      // this.malarService.deleteDailyProcess(process._id).subscribe(() => {
      //   this.loadProcesses(); // reload list after deletion
      // });
    }
  }

}
