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
  dailyProcessCount = 0;
  prestreamingCount = 0;
  streamingCount = 0;
  adminUserCount = 0;
  userListCount = 0;
  userRole: string | null = localStorage.getItem('userrole');

  constructor(private readonly router: Router, private malarService: MalarService) {
    addIcons({ settingsOutline, listOutline, waterOutline, flashOutline, shieldCheckmarkOutline, peopleOutline, gridOutline });
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
          this.dailyProcessCount = counts.daily;
          this.prestreamingCount = counts.pre;
          this.streamingCount = counts.stream;
          this.adminUserCount = counts.pendingDailyProcess;
          this.userListCount = counts.userCount
        },
        error: err => console.error('Count fetch failed', err)
      });
    }
    else {
      this.malarService.getUserCounts().subscribe({
        next: (counts: any) => {
          this.dailyProcessCount = counts.daily;
          this.prestreamingCount = counts.pre;
          this.streamingCount = counts.stream;
        },
        error: err => console.error('Count fetch failed', err)
      });
    }
  }
}
