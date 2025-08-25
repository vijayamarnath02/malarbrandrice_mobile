import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-stockin',
  templateUrl: './stockin.page.html',
  styleUrls: ['./stockin.page.scss'],
  standalone: true,
  imports: [IonText, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid, IonCardContent, IonChip, IonLabel, IonRow, IonCol, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class StockinPage implements OnInit {
  stockInwards: any = [
    {
      _id: '68a351ee7ada65e2c5db5a63',
      date: '2025-07-21T00:00:00.000Z',
      vehicle_number: 'TN 52 R 6755',
      party_name: 'Sri Murugan Traders',
      item_id: '68a1a9688cb013e1b9f1a35e',
      moisture: 10,
      dried_at: 'CR',
      godown_id: '68803bc5d47113e593c12b57',
      bin: 5,
      bags: 280,
      weight: 19600,
      in_charge: 'Jagadesh',
      created_at: '2025-08-18T16:16:46.324Z',
      updated_at: '2025-08-18T16:17:49.827Z',
    }
  ];
  constructor() {
    addIcons({ addOutline, createOutline, trashOutline });
  }

  ngOnInit() {
    addIcons({ addOutline, createOutline, trashOutline });
  }

  editStockIn(inward: any) {
    // Navigate to edit form
    console.log('Edit stock inward', inward);
  }

  deleteStockIn(id: string) {
    // Confirm and delete
    console.log('Delete stock inward', id);
  }
}
