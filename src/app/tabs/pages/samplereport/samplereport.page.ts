import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import {
  IonActionSheet,
  IonBadge,
  IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCol, IonContent, IonGrid, IonHeader, IonIcon,
  IonList, IonRow, IonText,
  IonTitle, IonToolbar
} from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, eyeOutline, flashOutline, gridOutline, listOutline, settingsOutline, shieldCheckmarkOutline, timeOutline, trashOutline, waterOutline } from 'ionicons/icons';
import { sampleReportListSignal } from 'src/app/signal/sample-report.signal';
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
  imports: [IonBadge, IonActionSheet,
    IonText, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader,
    IonCard, IonList, IonCol, IonRow, IonGrid, IonIcon, IonButton, IonButtons, IonContent,
    IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule
  ]
})
export class SamplereportPage implements OnInit {
  sampleReportList: SampleReport[] = [];
  isActionSheetOpen: boolean = false;
  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];
  deleteId: any;

  constructor(
    private router: Router,
    private malarService: MalarService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({ settingsOutline, addOutline, eyeOutline, createOutline, trashOutline, timeOutline, flashOutline, waterOutline, gridOutline, listOutline, shieldCheckmarkOutline });
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
      },
    });
  }



  async editReport(report: SampleReport) {
    if (report._id) {
      this.router.navigate(['/tabs/newsamplereport', report._id]);
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

  setOpen(isOpen: boolean, id?: any) {
    if (id) {
      this.deleteId = id;
    }
    this.isActionSheetOpen = isOpen;
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
  logResult(event: CustomEvent<OverlayEventDetail>) {
    this.setOpen(false);
    if (event.detail.role === 'destructive') {
      this.deleteProcess(this.deleteId)
    }
  }
  deleteProcess(process: any) {
    this.malarService.deleteReport(process).subscribe(() => {
      this.loadSampleReports();
    });

  }
  viewReport(report: SampleReport) {
    sampleReportListSignal.set(report);
    if (report._id) {
      setTimeout(() => {
        this.router.navigate(['/tabs/viewsamplereport', report._id]);
      }, 1000)
    } else {
      this.showToast('Cannot view report: ID not found', 'warning');
    }
  }
}
