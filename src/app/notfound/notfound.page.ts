import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alertCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.page.html',
  styleUrls: ['./notfound.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, CommonModule, FormsModule, ReactiveFormsModule, FormsModule, RouterModule]
})
export class NotfoundPage implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) {
    addIcons({ alertCircleOutline });
  }

  ngOnInit() {
  }

}
