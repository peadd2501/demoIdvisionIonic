import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalDpiServices {
  private closeOverlaySubject = new Subject<void>();

  // Observable para suscribirse al cierre
  closeOverlay$ = this.closeOverlaySubject.asObservable();

  // Método para emitir el cierre
  requestCloseOverlay() {
    this.closeOverlaySubject.next();
  }
}
