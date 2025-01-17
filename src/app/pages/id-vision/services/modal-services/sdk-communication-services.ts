import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SdkCommunicationService {
  private exitSubject = new Subject<boolean>();

  onExit$ = this.exitSubject.asObservable();

  emitExit(result: boolean): void {
    this.exitSubject.next(result);
  }
}