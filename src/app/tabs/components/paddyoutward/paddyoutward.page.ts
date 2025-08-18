import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-paddyoutward',
  templateUrl: './paddyoutward.page.html',
  styleUrls: ['./paddyoutward.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PaddyoutwardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
