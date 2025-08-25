import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, trashOutline } from 'ionicons/icons';
import { MalarService } from '../../services/malar.service';

@Component({
  selector: 'app-paddyout',
  templateUrl: './paddyout.page.html',
  styleUrls: ['./paddyout.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonGrid, IonLabel, IonChip, IonCol, IonRow, IonIcon, IonButton, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class PaddyoutPage implements OnInit {
  wetPaddyOutwards: any = [];
  processId: any;
  constructor(private malarService: MalarService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.processId = this.route.snapshot.paramMap.get('id') || null;
    addIcons({ addOutline, createOutline, trashOutline });
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    localStorage.removeItem('paddyOutProcessId');
    this.loadSampleReports();
  }
  loadSampleReports() {
    this.malarService.getWetOutPaddy(this.processId).subscribe({
      next: (data) => {
        this.wetPaddyOutwards = data;
      },
      error: (error) => {
        console.error('Error fetching wet paddy outwards:', error);
      }
    });
  }

  editOutward(outward: any) {
    localStorage.setItem('paddyOutProcessId', this.processId || '');
    this.router.navigate([`/tabs/newwetpaddyout/${outward._id}`]);
  }
  deleteOutward(outward: any) {

  }
  addNewWetPaddy() {
    localStorage.setItem('paddyOutProcessId', this.processId || '');
  }

}
