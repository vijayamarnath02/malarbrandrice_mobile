import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonHeader, IonIcon, IonLabel, IonList, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline, flashOutline,
  gridOutline,
  listOutline,
  shieldCheckmarkOutline,
  timeOutline,
  waterOutline
} from 'ionicons/icons';
@Component({
  selector: 'app-prestreaming',
  templateUrl: './prestreaming.page.html',
  styleUrls: ['./prestreaming.page.scss'],
  standalone: true,
  imports: [IonChip, IonCol, IonRow, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, IonButtons, IonButton, IonIcon, IonLabel, IonList, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class PrestreamingPage implements OnInit {
  prestreamList: any[] = [];
  constructor() {
    addIcons({ addOutline, timeOutline, flashOutline, waterOutline, gridOutline, listOutline, shieldCheckmarkOutline });
  }

  ngOnInit() {
    this.prestreamList = [
      {
        _id: '68851ffc668b1266ea75f955',
        item_id: { _id: '68803bc5d47113e593c12b46', name: 'JSR' },
        unit_id: { _id: '68803bc5d47113e593c12b61', name: 'UNIT-1' },
        batch_number: '000002',
        tank_level_timing: '15',
        incharge: '687640b719ac4a3d8f6c0140',
        timing: '15',
        ural_timing: '2pm-4pm',
        water_release_timing: '4pm',
        remarks: 'Smooth',
      },
      {
        _id: '68851ffc668b1266ea75f955',
        item_id: { _id: '68803bc5d47113e593c12b46', name: 'JSR' },
        unit_id: { _id: '68803bc5d47113e593c12b61', name: 'UNIT-1' },
        batch_number: '000002',
        tank_level_timing: '15',
        incharge: '687640b719ac4a3d8f6c0140',
        timing: '15',
        ural_timing: '2pm-4pm',
        water_release_timing: '4pm',
        remarks: 'Smooth',
      },
      {
        _id: '68851ffc668b1266ea75f955',
        item_id: { _id: '68803bc5d47113e593c12b46', name: 'JSR' },
        unit_id: { _id: '68803bc5d47113e593c12b61', name: 'UNIT-1' },
        batch_number: '000002',
        tank_level_timing: '15',
        incharge: '687640b719ac4a3d8f6c0140',
        timing: '15',
        ural_timing: '2pm-4pm',
        water_release_timing: '4pm',
        remarks: 'Smooth',
      },
    ];
  }

}
