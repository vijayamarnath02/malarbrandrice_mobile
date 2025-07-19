import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-daily-process',
  templateUrl: './daily-process.page.html',
  styleUrls: ['./daily-process.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DailyProcessPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
