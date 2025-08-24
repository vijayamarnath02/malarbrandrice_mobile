import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  flashOutline,
  gridOutline,
  listOutline,
  shieldCheckmarkOutline,
  statsChartOutline,
  waterOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonLabel, IonIcon, IonTabButton, CommonModule, FormsModule, RouterModule]
})
export class TabPage implements OnInit {
  index: number = 3;

  constructor() {
    addIcons({ statsChartOutline, listOutline, gridOutline, waterOutline, flashOutline, shieldCheckmarkOutline });
  }
  onTabClick(tabName: number) {
    this.index = tabName;
  }
  ngOnInit() {
  }

}
