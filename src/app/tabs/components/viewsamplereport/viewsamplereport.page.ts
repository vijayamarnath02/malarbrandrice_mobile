import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { archiveOutline, arrowUpOutline, cloudUploadOutline, documentTextOutline, downloadOutline, waterOutline } from 'ionicons/icons';

@Component({
  selector: 'app-viewsamplereport',
  templateUrl: './viewsamplereport.page.html',
  styleUrls: ['./viewsamplereport.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardContent, IonIcon, IonRow, IonCol, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ViewsamplereportPage implements OnInit {
  processId: any;
  constructor(private route: ActivatedRoute, private router: Router) {
    addIcons({ documentTextOutline, downloadOutline, cloudUploadOutline, archiveOutline, arrowUpOutline, waterOutline });
  }

  ngOnInit() {
    this.processId = this.route.snapshot.paramMap.get('id') || null;
  }
  goToPage(route: string, id: string) {
    console.log('Navigating to', route, 'with id', id);

    this.router.navigate([`/tabs/${route}`, id]);
  }

}
