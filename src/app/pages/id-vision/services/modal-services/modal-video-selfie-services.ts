import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalVideoSelfieServices {
  private closeOverlaySubject = new Subject<void>();
  closeOverlay$ = this.closeOverlaySubject.asObservable();

  requestCloseOverlay() {
    this.closeOverlaySubject.next();
  }
}