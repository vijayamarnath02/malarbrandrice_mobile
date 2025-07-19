import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonBadge, IonContent, IonHeader, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { filmOutline, personCircleOutline, playCircleOutline, repeatOutline } from 'ionicons/icons';
import { TabItem } from '../models/tab.model';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge, IonTabs]
})
export class TabsPage implements OnInit {
  tabs: TabItem[] = [

    { id: 1, tab: 'daily-process', icon: 'repeat-outline', label: 'Daily Process', adminOnly: true, title: 'Daily Process', centerTab: false },
    { id: 2, tab: 'prestreaming', icon: 'film-outline', label: 'Prestreaming', adminOnly: true, title: 'Prestreaming', centerTab: false },
    { id: 3, tab: 'dash-board', icon: 'repeat-outline', label: 'Dash Board', adminOnly: true, title: 'Dash Board', centerTab: true },
    { id: 4, tab: 'streaming', icon: 'play-circle-outline', label: 'Streaming', adminOnly: true, title: 'Streaming', centerTab: false },
    { id: 5, tab: 'admin', icon: 'person-circle-outline', label: 'Admin', adminOnly: true, title: 'Admin', centerTab: false }
  ];
  selectedTab = 1;
  isAdmin = true;
  constructor() {
    addIcons({
      repeatOutline,
      filmOutline,
      playCircleOutline,
      personCircleOutline

    });
  }

  ngOnInit() {
  }
  onTabClick(tab: number) {
    this.selectedTab = tab;
  }

}
