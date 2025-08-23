import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import {
  IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonList, IonRow, IonText,
  IonTitle, IonToolbar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, flashOutline, gridOutline, listOutline, settingsOutline, shieldCheckmarkOutline, timeOutline, trashOutline, waterOutline } from 'ionicons/icons';
import { MalarService } from '../../services/malar.service';

interface SampleReport {
  _id?: string;
  party_name: string;
  item_id: { _id: string; name: string };
  bill_number: string;
  bill_date: string | Date;
  load_number: string;
  vehicle_number: string;
  driver_name: string;
  cell_number: string;
  broker_name: string;
  delivered_at: string;
  moisture: number;
  paddy_type: number;
  bags: number;
  weight: number;
  sample_taken_by: string;
  rice: number;
  broken: number;
  bran: number;
  total_percentage: number;
  status: number;
  reason?: string;
  date: string;
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

  constructor(
    private router: Router,
    private malarService: MalarService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({ settingsOutline, addOutline, timeOutline, flashOutline, waterOutline, createOutline, trashOutline, gridOutline, listOutline, shieldCheckmarkOutline });
  }

  ngOnInit() {
    this.loadSampleReports();
  }

  ionViewWillEnter() {
    this.loadSampleReports();
  }

  loadSampleReports() {
    this.malarService.getReport().subscribe({
      next: (res) => {
        this.sampleReportList = res || [];
        console.log('Sample reports loaded:', this.sampleReportList);
      },
      error: (err) => {
        console.error('Failed to load sample reports:', err);
        this.showToast('Failed to load sample reports', 'danger');
        // Fallback to dummy data for demonstration
        this.loadDummyData();
      },
    });
  }

  private loadDummyData() {
    this.sampleReportList = [
      {
        _id: '1',
        party_name: "ABC Traders",
        item_id: { _id: '68a1a9688cb013e1b9f1a35e', name: "Paddy" },
        bill_number: "BN12345",
        bill_date: "2024-06-01",
        date: "2024-06-01",
        load_number: "LN67890",
        vehicle_number: "TN01AB1234",
        driver_name: "Ramesh Kumar",
        cell_number: "9876543210",
        broker_name: "Suresh",
        delivered_at: "Chennai",
        moisture: 14,
        paddy_type: 1,
        bags: 50,
        weight: 2500,
        sample_taken_by: "Vijay",
        rice: 65,
        broken: 5,
        bran: 8,
        total_percentage: 78,
        status: 1,
        reason: "Good quality"
      },
      {
        _id: '2',
        party_name: "XYZ Mills",
        item_id: { _id: '68a1a9688cb013e1b9f1a35e', name: "Paddy" },
        bill_number: "BN54321",
        bill_date: "2024-06-02",
        date: "2024-06-02",
        load_number: "LN09876",
        vehicle_number: "TN02CD5678",
        driver_name: "Arun Kumar",
        cell_number: "9123456780",
        broker_name: "Mani",
        delivered_at: "Madurai",
        moisture: 13,
        paddy_type: 2,
        bags: 40,
        weight: 2000,
        sample_taken_by: "Karthik",
        rice: 62,
        broken: 6,
        bran: 7,
        total_percentage: 75,
        status: 1,
        reason: "Satisfactory"
      },
      {
        _id: '3',
        party_name: "LMN Agencies",
        item_id: { _id: '68a1a9688cb013e1b9f1a35e', name: "Paddy" },
        bill_number: "BN67890",
        bill_date: "2024-06-03",
        date: "2024-06-03",
        load_number: "LN11223",
        vehicle_number: "TN03EF9012",
        driver_name: "Selvam",
        cell_number: "9988776655",
        broker_name: "Ravi",
        delivered_at: "Coimbatore",
        moisture: 15,
        paddy_type: 1,
        bags: 60,
        weight: 3000,
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

  async editReport(report: SampleReport) {
    if (report._id) {
      this.router.navigate(['/tabs/samplereport/edit', report._id]);
    } else {
      this.showToast('Cannot edit report: ID not found', 'warning');
    }
  }

  async deleteReport(report: SampleReport) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete the report for ${report.party_name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.performDelete(report);
          },
        },
      ],
    });

    await alert.present();
  }

  private performDelete(report: SampleReport) {
    if (report._id) {
      this.malarService.deleteReport(report._id).subscribe({
        next: () => {
          this.showToast('Report deleted successfully', 'success');
          this.loadSampleReports(); // Reload the list
        },
        error: (err) => {
          console.error('Delete failed:', err);
          this.showToast('Failed to delete report', 'danger');
        },
      });
    } else {
      // For dummy data, just remove from list
      this.sampleReportList = this.sampleReportList.filter(r => r !== report);
      this.showToast('Report deleted successfully', 'success');
    }
  }

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom',
    });
    await toast.present();
  }

  // Helper method to get paddy type display name
  getPaddyTypeName(paddyType: number): string {
    const types = {
      1: 'IR64',
      2: 'BPT',
      3: 'Sona Masuri',
      4: 'Basmati'
    };
    return types[paddyType as keyof typeof types] || 'Unknown';
  }

  // Helper method to format dates
  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString();
  }
}
