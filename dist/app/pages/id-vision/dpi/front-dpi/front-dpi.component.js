import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
export class FrontDpiComponent {
    constructor(
    // private dpiService: DpiService,
    alertController, loadingController, modalController) {
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.modalController = modalController;
    }
}
FrontDpiComponent.ɵfac = function FrontDpiComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FrontDpiComponent)(i0.ɵɵdirectiveInject(i1.AlertController), i0.ɵɵdirectiveInject(i1.LoadingController), i0.ɵɵdirectiveInject(i1.ModalController)); };
FrontDpiComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FrontDpiComponent, selectors: [["app-front-dpi"]], decls: 2, vars: 0, template: function FrontDpiComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "p");
        i0.ɵɵtext(1, " front-dpi works!\n");
        i0.ɵɵelementEnd();
    } } });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FrontDpiComponent, [{
        type: Component,
        args: [{ selector: 'app-front-dpi', template: "<p>\n  front-dpi works!\n</p>\n" }]
    }], () => [{ type: i1.AlertController }, { type: i1.LoadingController }, { type: i1.ModalController }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FrontDpiComponent, { className: "FrontDpiComponent" }); })();
//# sourceMappingURL=front-dpi.component.js.map