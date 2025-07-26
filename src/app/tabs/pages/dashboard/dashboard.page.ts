import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonToolbar, IonContent, IonHeader, IonTitle, CommonModule, FormsModule]
})
export class DashboardPage implements OnInit {

  constructor(private readonly router: Router) { }

  ngOnInit() {
  }

}
