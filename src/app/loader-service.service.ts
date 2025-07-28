import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderServiceService {
  private visible = new BehaviorSubject<boolean>(false);
  private message = new BehaviorSubject<string>('Please wait...');
  isVisible$ = this.visible.asObservable();
  message$ = this.message.asObservable();

  show(message: string = 'Please wait...') {
    this.message.next(message);
    this.visible.next(true);
  }

  hide() {
    this.visible.next(false);
  }

}
