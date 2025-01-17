import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalDpiServices {
  private closeOverlaySubject = new Subject<void>();
  private resumeCameraSubject = new Subject<void>();
  private closeModalAndChangeBrightness = new Subject<void>();

  // Observable para suscribirse al cierre
  closeOverlay$ = this.closeOverlaySubject.asObservable();
  resumeCameraSubject$ = this.resumeCameraSubject.asObservable();
  closeModalAndChangeBrightness$ = this.closeModalAndChangeBrightness.asObservable();



  // Método para emitir el cierre
  requestCloseOverlay() {
    this.closeOverlaySubject.next();
  }

  requestResumeCamera() {
    this.resumeCameraSubject.next();
  }

  requestCloseModalAndBrightness () {
    this.closeModalAndChangeBrightness.next();
  }
  
}
