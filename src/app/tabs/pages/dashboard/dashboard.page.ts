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

  constructor(private readonly router: Router) {
    addIcons({ settingsOutline, listOutline, waterOutline, flashOutline, shieldCheckmarkOutline, gridOutline });
  }

  ngOnInit() {
  }
  goTo(path: string) {
    this.router.navigate([`/tabs/${path}`]);
  }
}
