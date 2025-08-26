import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, eyeOutline, flashOutline, settingsOutline, timeOutline, trashOutline } from 'ionicons/icons';
import { MalarService } from '../../services/malar.service';

@Component({
  selector: 'app-stockout',
  templateUrl: './stockout.page.html',
  styleUrls: ['./stockout.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonGrid, IonRow, IonCol, IonChip, IonLabel, IonButton, IonIcon, IonText,
    CommonModule, RouterModule
  ]
})
export class StockoutPage implements OnInit {
  stockOutList: any[] = [];
  processId: string | null = null;
  constructor(private router: Router,
    private malarService: MalarService,
    private route: ActivatedRoute) {
    this.processId = this.route.snapshot.paramMap.get('id') || null;
    addIcons({ addOutline, createOutline, trashOutline });

  }

  ngOnInit() {
    addIcons({ settingsOutline, addOutline, eyeOutline, createOutline, trashOutline, timeOutline, flashOutline });

  }
  ionViewWillEnter() {
    this.loadSampleReports();
  }

  loadSampleReports() {
    this.malarService.getStockOut().subscribe({
      next: (res) => {
        this.stockOutList = res || [];
      },
      error: (err) => {
        console.error('Failed to load sample reports:', err);
      },
    });
  }


  editStockOut(record: any) {
    localStorage.setItem('stockOutProcessId', this.processId || '');
    this.router.navigate([`/tabs/stockoutward/${record._id}`]);
  }

  deleteStockOut(id: string) {
    this.malarService.deleteStockOut(id).subscribe({
      next: () => {
        console.log('Stock Out deleted successfully');
        this.loadSampleReports(); // Refresh the list
      },
      error: (err) => {
        console.error('Failed to delete Stock Out:', err);
      },
    });
  }
}
