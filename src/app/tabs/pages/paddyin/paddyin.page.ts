import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, trashOutline } from 'ionicons/icons';
import { MalarService } from '../../services/malar.service';

@Component({
  selector: 'app-paddyin',
  templateUrl: './paddyin.page.html',
  styleUrls: ['./paddyin.page.scss'],
  standalone: true,
  imports: [IonGrid, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonChip, IonLabel, IonIcon, IonButton, IonRow, IonCol, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, CommonModule, ReactiveFormsModule, RouterModule]
})
export class PaddyinPage implements OnInit {
  wetPaddyInwards: any[] = [];
  processId: any;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private malarService: MalarService,) {
    this.processId = this.route.snapshot.paramMap.get('id') || null;
    addIcons({ addOutline, createOutline, trashOutline });
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.loadSampleReports();
  }

  loadSampleReports() {
    this.malarService.getWetInPaddy(this.processId).subscribe({
      next: (data) => {
        this.wetPaddyInwards = data;
      },
      error: (error) => {
        console.error('Error fetching wet paddy inwards:', error);
      }
    });
  }
  editInward(inward: any) {
    localStorage.setItem('paddyInProcessId', this.processId || '');
    this.router.navigate([`/tabs/newwetpaddy/${inward._id}`]);
  }

  deleteInward(id: string) {
    // Call delete API
    console.log('Delete inward id', id);
  }
  addNewWetPaddy() {
    localStorage.setItem('paddyInProcessId', this.processId || '');
  }

}
