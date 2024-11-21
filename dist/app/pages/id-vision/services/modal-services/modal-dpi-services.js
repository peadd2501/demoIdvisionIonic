import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class ModalDpiServices {
    constructor() {
        this.closeOverlaySubject = new Subject();
        this.resumeCameraSubject = new Subject();
        // Observable para suscribirse al cierre
        this.closeOverlay$ = this.closeOverlaySubject.asObservable();
        this.resumeCameraSubject$ = this.resumeCameraSubject.asObservable();
    }
    // Método para emitir el cierre
    requestCloseOverlay() {
        this.closeOverlaySubject.next();
    }
    requestResumeCamera() {
        this.resumeCameraSubject.next();
    }
}
ModalDpiServices.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: ModalDpiServices, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ModalDpiServices.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: ModalDpiServices, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: ModalDpiServices, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=modal-dpi-services.js.map