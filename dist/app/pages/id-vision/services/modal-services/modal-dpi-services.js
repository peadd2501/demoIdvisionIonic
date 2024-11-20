import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let ModalDpiServices = class ModalDpiServices {
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
};
ModalDpiServices = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ModalDpiServices);
export { ModalDpiServices };
//# sourceMappingURL=modal-dpi-services.js.map