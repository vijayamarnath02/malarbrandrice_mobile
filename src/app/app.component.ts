import { AsyncPipe, Location } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IonApp, IonRouterOutlet, ModalController, Platform } from '@ionic/angular/standalone';
import { filter, take } from 'rxjs/operators';
import { LoaderServiceService } from './loader-service.service';
import { LoaderComponent } from './loaderscreen/loaderscreen.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, LoaderComponent, AsyncPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  private lastTimeBackPress = 0;
  private timePeriodToExit = 2000;
  private isToastVisible = false;
  visible$ = this.loaderService.isVisible$;
  message$ = this.loaderService.message$;
  currentUrl: any;
  constructor(
    private platform: Platform,
    private router: Router,
    private location: Location,
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private loaderService: LoaderServiceService) {
    this.initializeApp();
  }

  initializeApp() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.urlAfterRedirects;
    });
    this.platform.ready().then(() => {
      this.handleBackButton();
    });
  }

  handleBackButton() {
    this.platform.backButton.subscribeWithPriority(10, async () => {

      // 🔐 1. Block back if loader is visible
      const isLoaderVisible = await this.loaderService.isVisible$.pipe(take(1)).toPromise();
      if (isLoaderVisible) {
        return; // ❌ Ignore back button
      }

      // 🔍 2. Check if a modal is open
      const topModal = await this.modalCtrl.getTop();
      if (topModal) {
        await topModal.dismiss();
        return;
      }

      // 🧭 3. App exit logic
      if (
        this.currentUrl === '/tabs/dashboard' ||
        this.currentUrl === '/tabs/daily-process' ||
        this.currentUrl === '/' ||
        this.currentUrl === ''
      ) {
        const timeNow = new Date().getTime();
        if (timeNow - this.lastTimeBackPress < this.timePeriodToExit) {
          (window.navigator as any).app.exitApp();
        } else if (this.currentUrl.includes('/tabs/setting')) {
          this.router.navigate(['tabs/dashboard']);
        } else {
          this.lastTimeBackPress = timeNow;
          if (!this.isToastVisible) {
            this.isToastVisible = true;
            const toast = await this.toastController.create({
              message: 'Press back again to exit.',
              duration: 2000,
              position: 'bottom',
              buttons: [
                {
                  text: 'Exit',
                  role: 'cancel',
                  handler: () => {
                    (window.navigator as any).app.exitApp();
                  },
                  icon: 'exit',
                  side: 'end',
                }
              ],
              color: 'toster'
            });

            toast.onDidDismiss().then(() => {
              this.isToastVisible = false;
            });
            await toast.present();
          }
        }
      } else {
        this.location.back();
      }
    });
  }

}
