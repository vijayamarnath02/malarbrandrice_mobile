import { AsyncPipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, Router } from '@angular/router';
import { App } from '@capacitor/app';
import { IonApp, IonRouterOutlet, Platform, ToastController } from '@ionic/angular/standalone';
import { LoaderServiceService } from './loader-service.service';
import { LoaderComponent } from './loaderscreen/loaderscreen.page';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, LoaderComponent, AsyncPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  visible$ = this.loaderService.isVisible$;
  message$ = this.loaderService.message$;

  private lastBackPress = 0;
  private timePeriodToExit = 2000; // 2 seconds

  constructor(
    private loaderService: LoaderServiceService,
    private router: Router,
    private platform: Platform,
    private toastCtrl: ToastController
  ) {
    // Hide loader after navigation completes
    this.router.events.subscribe(event => {
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loaderService.hide();
      }
    });

    // Handle hardware back button
    this.platform.backButton.subscribeWithPriority(10, async () => {
      const url = this.router.url;

      // Update this to your root route(s)
      if (url === '/tabs/dashboard' || url === '/tabs') {
        const currentTime = new Date().getTime();

        if (currentTime - this.lastBackPress < this.timePeriodToExit) {
          App.exitApp();
        } else {
          this.lastBackPress = currentTime;
          const toast = await this.toastCtrl.create({
            message: 'Press back again to exit',
            duration: 2000,
            position: 'bottom'
          });
          await toast.present();
        }
      } else {
        window.history.back(); // Normal back navigation
      }
    });
  }
}
