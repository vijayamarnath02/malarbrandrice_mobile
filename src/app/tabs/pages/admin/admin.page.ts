import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  checkmarkCircleOutline, closeCircleOutline,
  eyeOutline,
  settingsOutline,
  trashOutline
} from 'ionicons/icons';
import { MalarService } from '../../services/malar.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [IonSegment, IonSegmentButton, IonList, IonItem, IonLabel, IonButtons, IonButton, IonIcon, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class AdminPage implements OnInit {
  filter: 'pending' | 'approved' = 'pending';
  dailyProcesses: any;
  get filteredProcesses() {
    return this.dailyProcesses?.filter((process: any) =>
      this.filter === 'pending' ? !process.approved_by : !!process.approved_by
    ) || [];
  }

  constructor(private malarService: MalarService) {
    addIcons({ settingsOutline, eyeOutline, checkmarkCircleOutline, closeCircleOutline, trashOutline });
  }
  approveProcess(process: any) {
    this.malarService.approveDailyProcess(process._id).subscribe({
      next: () => {
        this.loadDropdowns();
      },
      error: err => {
        console.error('Approval failed:', err);
      }
    });
  }


  rejectProcess(process: any) {
    this.malarService.deleteDailyProcessById(process._id).subscribe({
      next: () => {
        this.loadDropdowns();
      },
      error: err => {
        console.error('Approval failed:', err);
      }
    });
  }

  // viewProcess(process: any) {
  //   console.log('Viewing', process);
  //   // Optional: Open modal or route to detail page
  // }
  switchData(event: any) {
    this.filter = event.target.value
  }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.loadDropdowns();
  }
  loadDropdowns() {
    this.malarService.getDailyProcesses().subscribe({
      next: res => this.dailyProcesses = res.map(i => i),
      error: err => console.error('Item load failed', err),
    });
  }


}
