import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let ModalVideoSelfieServices = class ModalVideoSelfieServices {
    constructor() {
        this.closeOverlaySubject = new Subject();
        this.closeOverlay$ = this.closeOverlaySubject.asObservable();
    }
    requestCloseOverlay() {
        this.closeOverlaySubject.next();
    }
};
ModalVideoSelfieServices = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ModalVideoSelfieServices);
export { ModalVideoSelfieServices };
//# sourceMappingURL=modal-video-selfie-services.js.map