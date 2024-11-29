import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class SdkCommunicationService {
    constructor() {
        this.exitSubject = new Subject();
        this.onExit$ = this.exitSubject.asObservable();
    }
    emitExit(result) {
        this.exitSubject.next(result);
    }
}
SdkCommunicationService.ɵfac = function SdkCommunicationService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SdkCommunicationService)(); };
SdkCommunicationService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SdkCommunicationService, factory: SdkCommunicationService.ɵfac, providedIn: 'root' });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SdkCommunicationService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=sdk-communication-services.js.map