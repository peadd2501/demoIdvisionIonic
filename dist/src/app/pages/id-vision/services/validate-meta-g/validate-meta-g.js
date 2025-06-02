import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ValidateMetaGService {
    constructor() {
        this.validateMetaG = null;
    }
    setValidateMetaG(value) {
        this.validateMetaG = value;
    }
    getValidateMetaG() {
        return this.validateMetaG;
    }
    static { this.ɵfac = function ValidateMetaGService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ValidateMetaGService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ValidateMetaGService, factory: ValidateMetaGService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ValidateMetaGService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=validate-meta-g.js.map