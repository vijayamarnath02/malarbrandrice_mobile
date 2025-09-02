import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alertCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-oops',
  templateUrl: './oops.page.html',
  styleUrls: ['./oops.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonContent, CommonModule, FormsModule]
})
export class OopsPage implements OnInit {

  constructor(private router: Router) {
    addIcons({ alertCircleOutline })
  }

  goHome() {
    this.router.navigate(['/tabs/dashboard']); // Adjust to your main page
  }

  ngOnInit() {
  }

}
