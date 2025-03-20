import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoSelfieServices {
  private resumeCameraSubject = new Subject<void>();
  private closePhotoSelfieSubject = new Subject<void>();

  // Observable para suscribirse al cierre
  resumeCameraSubject$ = this.resumeCameraSubject.asObservable();
  closePhotoSelfieSubject$ = this.closePhotoSelfieSubject.asObservable();

  requestResumePhotoCamera() {
    this.resumeCameraSubject.next();
  }

  requestClosePhotoSelfieSubject () {
    this.closePhotoSelfieSubject.next();
  }
}
