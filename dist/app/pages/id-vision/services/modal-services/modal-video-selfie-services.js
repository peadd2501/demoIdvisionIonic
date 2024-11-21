import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class ModalVideoSelfieServices {
    constructor() {
        this.closeOverlaySubject = new Subject();
        this.closeOverlay$ = this.closeOverlaySubject.asObservable();
    }
    requestCloseOverlay() {
        this.closeOverlaySubject.next();
    }
}
ModalVideoSelfieServices.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: ModalVideoSelfieServices, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ModalVideoSelfieServices.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: ModalVideoSelfieServices, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: ModalVideoSelfieServices, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=modal-video-selfie-services.js.map