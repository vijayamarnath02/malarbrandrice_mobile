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

  constructor(private readonly router: Router) {
    addIcons({ settingsOutline, listOutline, waterOutline, flashOutline, shieldCheckmarkOutline, peopleOutline, gridOutline });
  }

  ngOnInit() {
    this.fetchCounts();
  }
  goTo(path: string) {
    this.router.navigate([`/tabs/${path}`]);
  }
  fetchCounts() {
    // Replace this with actual API calls
    this.dailyProcessCount = 12;
    this.prestreamingCount = 5;
    this.streamingCount = 8;
    this.adminUserCount = 3;
  }
}
