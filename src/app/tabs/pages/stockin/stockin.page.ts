import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, trashOutline } from 'ionicons/icons';
import { MalarService } from '../../services/malar.service';

@Component({
  selector: 'app-stockin',
  templateUrl: './stockin.page.html',
  styleUrls: ['./stockin.page.scss'],
  standalone: true,
  imports: [IonText, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid, IonCardContent, IonChip, IonLabel, IonRow, IonCol, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class StockinPage implements OnInit {
  stockInwards: any = [
  ];
  constructor(
    private router: Router,
    private malarService: MalarService,
  ) {
    addIcons({ addOutline, createOutline, trashOutline });
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.loadSampleReports();
  }

  loadSampleReports() {
    this.malarService.getStockIn().subscribe({
      next: (res) => {
        this.stockInwards = res || [];
        console.log('Sample reports loaded:', this.stockInwards);
      },
      error: (err) => {
        console.error('Failed to load sample reports:', err);
      },
    });
  }


  editStockIn(inward: any) {
    this.router.navigate([`/tabs/stockinward/${inward._id}`]);
  }

  deleteStockIn(id: string) {
    // Confirm and delete
    console.log('Delete stock inward', id);
  }
}
