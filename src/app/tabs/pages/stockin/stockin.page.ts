import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  processId: string | null = null;
  stockInwards: any = [
  ];
  constructor(
    private router: Router,
    private malarService: MalarService,
    private route: ActivatedRoute,
  ) {
    this.processId = this.route.snapshot.paramMap.get('id') || null;
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
    localStorage.setItem('stockInProcessId', this.processId || '');
    this.router.navigate([`/tabs/stockinward/${inward._id}`]);
  }
  addNewWetPaddy() {
    localStorage.setItem('stockInProcessId', this.processId || '');
  }

  deleteStockIn(id: string) {
    this.malarService.deleteStockIn(id).subscribe({
      next: () => {
        console.log('Stock In deleted successfully');
        this.loadSampleReports(); // Refresh the list
      },
      error: (err) => {
        console.error('Failed to delete Stock In:', err);
      },
    });
  }
}
