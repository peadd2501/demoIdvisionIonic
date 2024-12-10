import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalVideoSelfieServices {
  private closeOverlaySubjectModal = new Subject<void>();
  closeOverlayModal$ = this.closeOverlaySubjectModal.asObservable();

  requestCloseOverlay() {
    this.closeOverlaySubjectModal.next();
  }
}