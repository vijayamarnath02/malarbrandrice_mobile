import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonList, IonRow, IonText,
  IonTitle, IonToolbar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, flashOutline, gridOutline, listOutline, settingsOutline, shieldCheckmarkOutline, timeOutline, trashOutline, waterOutline } from 'ionicons/icons';
import { MalarService } from '../../services/malar.service';

interface SampleReport {
  party_name: string;
  item_id: { name: string };
  bill_number: string;
  bill_date: string | Date;
  load_number: string;
  vehicle_number: string;
  driver_name: string;
  cell_number: string;
  broker_name: string;
  delivered_at: string;
  moisture: string;
  paddy_type: string;
  bags: number;
  weight: string;
  sample_taken_by: string;
  rice: number;
  broken: number;
  bran: number;
  total_percentage: number;
  status: number;
  reason: string;
}

@Component({
  selector: 'app-samplereport',
  templateUrl: './samplereport.page.html',
  styleUrls: ['./samplereport.page.scss'],
  standalone: true,
  imports: [
    IonText, IonLabel, IonChip, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader,
    IonCard, IonList, IonCol, IonRow, IonGrid, IonIcon, IonButton, IonButtons, IonContent,
    IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule
  ]
})
export class SamplereportPage implements OnInit {
  sampleReportList: SampleReport[] = [];

  constructor(private router: Router, private malarService: MalarService) {
    addIcons({ settingsOutline, addOutline, timeOutline, flashOutline, waterOutline, createOutline, trashOutline, gridOutline, listOutline, shieldCheckmarkOutline });
  }

  ngOnInit() {
    // Example: Fetch sample reports from API or service
    // this.loadSampleReports();
  }
  ionViewWillEnter() {
    this.loadDropdowns();
  }

  loadDropdowns() {
    this.malarService.getReport().subscribe({
      next: res => this.sampleReportList = res.map(i => i),
      error: err => console.error('Item load failed', err),
    });
    if (this.sampleReportList.length == 0) {
      this.sampleReportList = [
        {
          party_name: "ABC Traders",
          item_id: { name: "Paddy" },
          bill_number: "BN12345",
          bill_date: "2024-06-01",
          load_number: "LN67890",
          vehicle_number: "TN01AB1234",
          driver_name: "Ramesh Kumar",
          cell_number: "9876543210",
          broker_name: "Suresh",
          delivered_at: "Chennai",
          moisture: "14%",
          paddy_type: "IR64",
          bags: 50,
          weight: "2500kg",
          sample_taken_by: "Vijay",
          rice: 65,
          broken: 5,
          bran: 8,
          total_percentage: 78,
          status: 1,
          reason: "Good quality"
        },
        {
          party_name: "XYZ Mills",
          item_id: { name: "Paddy" },
          bill_number: "BN54321",
          bill_date: "2024-06-02",
          load_number: "LN09876",
          vehicle_number: "TN02CD5678",
          driver_name: "Arun Kumar",
          cell_number: "9123456780",
          broker_name: "Mani",
          delivered_at: "Madurai",
          moisture: "13%",
          paddy_type: "BPT",
          bags: 40,
          weight: "2000kg",
          sample_taken_by: "Karthik",
          rice: 62,
          broken: 6,
          bran: 7,
          total_percentage: 75,
          status: 1,
          reason: "Satisfactory"
        },
        {
          party_name: "LMN Agencies",
          item_id: { name: "Paddy" },
          bill_number: "BN67890",
          bill_date: "2024-06-03",
          load_number: "LN11223",
          vehicle_number: "TN03EF9012",
          driver_name: "Selvam",
          cell_number: "9988776655",
          broker_name: "Ravi",
          delivered_at: "Coimbatore",
          moisture: "15%",
          paddy_type: "Sona Masuri",
          bags: 60,
          weight: "3000kg",
          sample_taken_by: "Prakash",
          rice: 68,
          broken: 4,
          bran: 9,
          total_percentage: 81,
          status: 2,
          reason: "High moisture"
        }
      ];
    }
  }


  editReport(report: SampleReport) {
    // Navigate to edit page with report id or data
    // Example: this.router.navigate(['/tabs/samplereport/edit', report.id]);
  }

  deleteReport(report: SampleReport) {
    // Implement delete logic here
    // Example: Remove from list or call API
    // this.sampleReportList = this.sampleReportList.filter(r => r !== report);
  }

  // private loadSampleReports() {
  //   // Fetch reports from API/service and assign to sampleReportList
  // }
}
