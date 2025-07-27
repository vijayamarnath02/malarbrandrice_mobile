import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [IonSegment, IonSegmentButton, IonList, IonItem, IonLabel, IonButtons, IonButton, IonIcon, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class AdminPage implements OnInit {
  filter: 'pending' | 'approved' = 'pending';
  dailyProcesses = [
    {
      _id: '68805ee189a28eaf90362515',
      item_id: { name: 'JSR' },
      unit_id: { name: 'UNIT-1' },
      date: '2025-07-23',
      lot_number: '000001',
      bags: 24,
      approved_by: null, // Set to non-null to simulate "approved"
    },
    {
      _id: '68805ee189a28eaf90362516',
      item_id: { name: 'Ponni' },
      unit_id: { name: 'UNIT-2' },
      date: '2025-07-24',
      lot_number: '000002',
      bags: 30,
      approved_by: { name: 'admin' }, // Already approved
    }
  ];
  get filteredProcesses() {
    return this.dailyProcesses.filter((process: any) =>
      this.filter === 'pending' ? !process.approved_by : !!process.approved_by
    );
  }

  constructor() { }
  approveProcess(process: any) {
    process.approved_by = { name: 'admin' };
  }
  rejectProcess(process: any) {
    const index = this.dailyProcesses.findIndex(p => p._id === process._id);
    if (index > -1) {
      this.dailyProcesses.splice(index, 1);
    }
  }

  viewProcess(process: any) {
    console.log('Viewing', process);
    // Optional: Open modal or route to detail page
  }
  switchData(event: any) {
    this.filter = event.target.value
  }
  ngOnInit() {
  }

}
