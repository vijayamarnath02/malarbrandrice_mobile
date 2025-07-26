import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-newstreaming',
  templateUrl: './newstreaming.page.html',
  styleUrls: ['./newstreaming.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewstreamingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
