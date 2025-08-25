import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCol, IonContent, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-viewsamplereport',
  templateUrl: './viewsamplereport.page.html',
  styleUrls: ['./viewsamplereport.page.scss'],
  standalone: true,
  imports: [IonRow, IonCol, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ViewsamplereportPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
