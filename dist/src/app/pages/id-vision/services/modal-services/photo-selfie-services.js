import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class PhotoSelfieServices {
    constructor() {
        this.resumeCameraSubject = new Subject();
        this.closePhotoSelfieSubject = new Subject();
        // Observable para suscribirse al cierre
        this.resumeCameraSubject$ = this.resumeCameraSubject.asObservable();
        this.closePhotoSelfieSubject$ = this.closePhotoSelfieSubject.asObservable();
    }
    requestResumePhotoCamera() {
        this.resumeCameraSubject.next();
    }
    requestClosePhotoSelfieSubject() {
        this.closePhotoSelfieSubject.next();
    }
    static { this.ɵfac = function PhotoSelfieServices_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PhotoSelfieServices)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: PhotoSelfieServices, factory: PhotoSelfieServices.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PhotoSelfieServices, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=photo-selfie-services.js.map