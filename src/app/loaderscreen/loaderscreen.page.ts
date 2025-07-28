// src/app/components/loader/loader.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, IonSpinner],
  template: `
    <div *ngIf="visible" class="loader-overlay">
      <ion-spinner name="crescent"></ion-spinner>
      <p>{{ message }}</p>
    </div>
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      color: white;
      font-size: 1.2rem;
    }
  `]
})
export class LoaderComponent {
  @Input() visible = false;
  @Input() message = 'Please wait...';
}
