import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonList, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  hardwareChipOutline,
  playForwardOutline,
  settingsOutline,
  stopOutline,
  timeOutline
} from 'ionicons/icons';
@Component({
  selector: 'app-streaming',
  templateUrl: './streaming.page.html',
  styleUrls: ['./streaming.page.scss'],
  standalone: true,
  imports: [IonButtons, IonGrid, IonChip, IonCol, IonRow, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButton, IonIcon, IonList, IonLabel, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class StreamingPage implements OnInit {
  streamingList: any[] = [];
  constructor() {
    addIcons({ settingsOutline, addOutline, timeOutline, playForwardOutline, stopOutline, hardwareChipOutline });
  }

  ngOnInit() {
    this.streamingList = [
      {
        _id: '6880844df92600be5480457c',
        item_id: { _id: '68803bc5d47113e593c12b46', name: 'JSR' },
        unit_id: { _id: '68803bc5d47113e593c12b61', name: 'UNIT-1' },
        batch_number: '000001',
        streaming_timing: '30 mins',
        stream_start_time: '2pm',
        streamend_time: '30 mins',
        dryer_id: { _id: '688082f834e9109cfbd8e15b', name: 'Bed-1' },
      }
    ];
  }

}
