import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
export class Slide1Component {
    constructor() { }
    ngOnInit() {
        this.temp = "";
    }
    goToNext() {
        console.log("test");
    }
}
Slide1Component.ɵfac = function Slide1Component_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Slide1Component)(); };
Slide1Component.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Slide1Component, selectors: [["app-slide1"]], decls: 17, vars: 0, consts: [["name", "document-outline"], ["name", "videocam-outline"], ["expand", "block", 3, "click"]], template: function Slide1Component_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "h2");
        i0.ɵɵtext(1, "Verifiquemos tu identidad");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(2, "p");
        i0.ɵɵtext(3, "Para ser verificado, necesitar\u00E1s:");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "ion-grid")(5, "ion-row")(6, "ion-col");
        i0.ɵɵelement(7, "ion-icon", 0);
        i0.ɵɵelementStart(8, "p");
        i0.ɵɵtext(9, "Sube fotos de documentos que prueben tu identidad");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(10, "ion-row")(11, "ion-col");
        i0.ɵɵelement(12, "ion-icon", 1);
        i0.ɵɵelementStart(13, "p");
        i0.ɵɵtext(14, "Graba un video selfie mientras lees el texto en voz alta");
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(15, "ion-button", 2);
        i0.ɵɵlistener("click", function Slide1Component_Template_ion_button_click_15_listener() { return ctx.goToNext(); });
        i0.ɵɵtext(16, "Empecemos");
        i0.ɵɵelementEnd();
    } }, dependencies: [i1.IonButton, i1.IonCol, i1.IonGrid, i1.IonIcon, i1.IonRow] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Slide1Component, [{
        type: Component,
        args: [{ selector: 'app-slide1', template: "\n<h2>Verifiquemos tu identidad</h2>\n<p>Para ser verificado, necesitar\u00E1s:</p>\n<ion-grid>\n  <ion-row>\n    <ion-col>\n      <ion-icon name=\"document-outline\"></ion-icon>\n      <p>Sube fotos de documentos que prueben tu identidad</p>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col>\n      <ion-icon name=\"videocam-outline\"></ion-icon>\n      <p>Graba un video selfie mientras lees el texto en voz alta</p>\n    </ion-col>\n  </ion-row>\n</ion-grid>\n<ion-button expand=\"block\" (click)=\"goToNext()\">Empecemos</ion-button>" }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Slide1Component, { className: "Slide1Component" }); })();
//# sourceMappingURL=slide1.component.js.map