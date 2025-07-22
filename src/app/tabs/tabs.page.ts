import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { filmOutline, gridOutline, personCircleOutline, playCircleOutline, repeatOutline } from 'ionicons/icons';
import { TabItem } from '../models/tab.model';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class TabsPage implements OnInit {
  title: string = "Dash Board"

  tabs: TabItem[] = [
    { id: 1, tab: 'daily-process', icon: 'repeat-outline', label: 'Daily Process', adminOnly: true, title: 'Daily Process', centerTab: false },
    { id: 2, tab: 'prestreaming', icon: 'film-outline', label: 'Prestreaming', adminOnly: true, title: 'Prestreaming', centerTab: false },
    { id: 3, tab: 'dash-board', icon: 'grid-outline', label: 'Dash Board', adminOnly: true, title: 'Dash Board', centerTab: true },
    { id: 4, tab: 'streaming', icon: 'play-circle-outline', label: 'Streaming', adminOnly: true, title: 'Streaming', centerTab: false },
    { id: 5, tab: 'admin', icon: 'person-circle-outline', label: 'Admin', adminOnly: true, title: 'Admin', centerTab: false }
  ];
  selectedTab = 3;
  isAdmin = true;
  constructor() {
    addIcons({
      repeatOutline,
      filmOutline,
      playCircleOutline,
      personCircleOutline,
      gridOutline

    });
  }

  ngOnInit() {
  }
  onTabClick(tab: TabItem) {
    this.selectedTab = tab.id;
    this.title = tab.title;
  }

}
