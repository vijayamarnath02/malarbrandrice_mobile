import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-newstockinward',
  templateUrl: './newstockinward.page.html',
  styleUrls: ['./newstockinward.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewstockinwardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
