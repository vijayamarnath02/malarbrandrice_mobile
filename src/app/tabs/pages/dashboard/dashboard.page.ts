import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowDownOutline,
  cloudUploadOutline,
  documentTextOutline, downloadOutline,
  flashOutline,
  gridOutline,
  listOutline,
  peopleOutline,
  settingsOutline,
  shieldCheckmarkOutline,
  waterOutline
} from 'ionicons/icons';
import { MalarService } from '../../services/malar.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonButtons, RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonIcon, CommonModule, FormsModule]
})
export class DashboardPage implements OnInit {
  counts = {
    dailyProcess: 0,
    prestreaming: 0,
    streaming: 0,
    adminUser: 0,
    userList: 0,
    stockOutward: 0,
    stockInward: 0,
    wetPaddyOutward: 0,
    wetPaddyInward: 0,
    sampleReport: 0
  };
  userRole: string | null = localStorage.getItem('userrole');
  constructor(private readonly router: Router, private malarService: MalarService) {
    addIcons({ settingsOutline, listOutline, waterOutline, flashOutline, documentTextOutline, downloadOutline, cloudUploadOutline, arrowDownOutline, shieldCheckmarkOutline, peopleOutline, gridOutline });
  }

  ngOnInit() {
  }
  goTo(path: string) {
    this.router.navigate([`/tabs/${path}`]);
  }
  ionViewWillEnter() {
    this.fetchCounts();
  }
  fetchCounts() {

    if (this.userRole === '1') {
      this.malarService.getCounts().subscribe({
        next: (counts: any) => {
          this.counts.dailyProcess = counts.daily;
          this.counts.prestreaming = counts.pre;
          this.counts.streaming = counts.stream;
          this.counts.adminUser = counts.pendingDailyProcess;
          this.counts.userList = counts.userCount;
          this.counts.sampleReport = counts.sampleReport;;
        },
        error: err => console.error('Count fetch failed', err)
      });
    }
    else {
      this.malarService.getUserCounts().subscribe({
        next: (counts: any) => {
          this.counts.dailyProcess = counts.daily;
          this.counts.prestreaming = counts.pre;
          this.counts.streaming = counts.stream;
        },
        error: err => console.error('Count fetch failed', err)
      });
    }
  }
}
