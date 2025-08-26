import { AsyncPipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, Router } from '@angular/router';
import { IonApp, IonRouterOutlet, Platform, ToastController } from '@ionic/angular/standalone';
import { LoaderServiceService } from './loader-service.service';
import { LoaderComponent } from './loaderscreen/loaderscreen.page';

declare global {
  interface Navigator {
    app?: {
      exitApp: () => void;
    };
  }
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, LoaderComponent, AsyncPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  visible$ = this.loaderService.isVisible$;
  message$ = this.loaderService.message$;
  lastBackPress = 0;
  timePeriodToExit = 2000;
  currentUrl: any;
  constructor(
    private loaderService: LoaderServiceService,
    private router: Router,
    private platform: Platform,
    private toastCtrl: ToastController) {
    this.router.events.subscribe(event => {
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loaderService.hide();
      }
    });
    this.platform.backButton.subscribeWithPriority(10, async () => {
      const url = this.router.url;

      // Adjust this to your root or home route (example: '/tabs/dashboard')
      if (url === '/' || url === '/tabs' || url === '/tabs/dashboard') {
        const currentTime = new Date().getTime();

        if (currentTime - this.lastBackPress < this.timePeriodToExit) {
          if (navigator.app && typeof navigator.app.exitApp === 'function') {
            navigator.app.exitApp();
          }
        } else {
          this.lastBackPress = currentTime;
          const toast = await this.toastCtrl.create({
            message: 'Press back again to exit',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();
        }
      } else {
        // Navigate back normally
        window.history.back();
      }
    });

  }

}





