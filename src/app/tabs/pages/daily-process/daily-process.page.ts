import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonList, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline
} from 'ionicons/icons';
@Component({
  selector: 'app-daily-process',
  templateUrl: './daily-process.page.html',
  styleUrls: ['./daily-process.page.scss'],
  standalone: true,
  imports: [IonGrid, IonCol, IonRow, IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonText, IonList, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class DailyProcessPage implements OnInit {
  processList: any[] = [];
  constructor() {
    addIcons({ addOutline });
  }

  ngOnInit() {
    this.processList = [
      {
        _id: '68805ee189a28eaf90362515',
        item_id: { _id: '68803bc5d47113e593c12b46', name: 'JSR' },
        date: '2025-07-23T00:00:00.000Z',
        godown_id: { _id: '68803bc5d47113e593c12b59', name: 'VeePee Ware House' },
        unit_id: { _id: '68803bc5d47113e593c12b61', name: 'UNIT-1' },
        lot_number: '000001',
        vehicle_number: 'TN 09 E 1431',
        bags: 24,
        weight: 76,
        moisture: 12,
        incharge: { _id: '687640b719ac4a3d8f6c0140', name: 'admin' },
        approved_by: { _id: '687640b719ac4a3d8f6c0140', name: 'admin' },
      },
      {
        _id: '68805ee189a28eaf90362515',
        item_id: { _id: '68803bc5d47113e593c12b46', name: 'JSR' },
        date: '2025-07-23T00:00:00.000Z',
        godown_id: { _id: '68803bc5d47113e593c12b59', name: 'VeePee Ware House' },
        unit_id: { _id: '68803bc5d47113e593c12b61', name: 'UNIT-1' },
        lot_number: '000001',
        vehicle_number: 'TN 09 E 1431',
        bags: 24,
        weight: 76,
        moisture: 12,
        incharge: { _id: '687640b719ac4a3d8f6c0140', name: 'admin' },
        approved_by: { _id: '687640b719ac4a3d8f6c0140', name: 'admin' },
      }
    ];
  }

}
