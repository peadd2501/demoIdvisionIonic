import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class ModalDpiServices {
    constructor() {
        this.closeOverlaySubject = new Subject();
        this.resumeCameraSubject = new Subject();
        this.closeModalAndChangeBrightness = new Subject();
        this.closePhotoSelfieSubject = new Subject();
        this.resumePhotoSubject = new Subject();
        this.closeModalAcuerdoVideo = new Subject();
        // Observable para suscribirse al cierre
        this.closeOverlay$ = this.closeOverlaySubject.asObservable();
        this.resumeCameraSubject$ = this.resumeCameraSubject.asObservable();
        this.closeModalAndChangeBrightness$ = this.closeModalAndChangeBrightness.asObservable();
        this.closePhotoSelfieSubject$ = this.closePhotoSelfieSubject.asObservable();
        this.resumePhotoSubject$ = this.resumePhotoSubject.asObservable();
        this.closeModalAcuerdoVideo$ = this.closeModalAcuerdoVideo.asObservable();
    }
    // Método para emitir el cierre
    requestCloseOverlay() {
        this.closeOverlaySubject.next();
    }
    requestResumeCamera() {
        this.resumeCameraSubject.next();
    }
    requestCloseModalAndBrightness() {
        this.closeModalAndChangeBrightness.next();
    }
    requestCloseModalAcuerdoVideo() {
        this.closeModalAcuerdoVideo.next();
    }
    requestClosePhotoSelfieSubject() {
        this.closePhotoSelfieSubject.next();
    }
    requestResumePhotoSubject() {
        this.resumePhotoSubject.next();
    }
    static { this.ɵfac = function ModalDpiServices_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ModalDpiServices)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ModalDpiServices, factory: ModalDpiServices.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ModalDpiServices, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=modal-dpi-services.js.map