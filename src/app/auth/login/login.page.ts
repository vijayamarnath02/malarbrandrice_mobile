import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInput, IonItem, IonList } from '@ionic/angular/standalone';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonItem, IonInput, IonList]
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
