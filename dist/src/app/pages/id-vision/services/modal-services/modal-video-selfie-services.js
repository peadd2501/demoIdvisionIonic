import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class ModalVideoSelfieServices {
    constructor() {
        this.closeOverlaySubjectModal = new Subject();
        this.closeOverlayModal$ = this.closeOverlaySubjectModal.asObservable();
    }
    requestCloseOverlayModal() {
        this.closeOverlaySubjectModal.next();
    }
    static { this.ɵfac = function ModalVideoSelfieServices_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ModalVideoSelfieServices)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ModalVideoSelfieServices, factory: ModalVideoSelfieServices.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ModalVideoSelfieServices, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=modal-video-selfie-services.js.map