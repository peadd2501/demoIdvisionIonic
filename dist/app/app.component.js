import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
import * as i2 from "./pages/id-vision/id-vision.component";
export class AppComponent {
    constructor() { }
}
AppComponent.ɵfac = function AppComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppComponent)(); };
AppComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppComponent, selectors: [["app-root"]], decls: 2, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "ion-app");
        i0.ɵɵelement(1, "app-id-vision");
        i0.ɵɵelementEnd();
    } }, dependencies: [i1.IonApp, i2.IdVisionComponent] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppComponent, [{
        type: Component,
        args: [{ selector: 'app-root', template: "<ion-app>\n  <app-id-vision></app-id-vision>\n</ion-app>\n" }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AppComponent, { className: "AppComponent" }); })();
//# sourceMappingURL=app.component.js.map