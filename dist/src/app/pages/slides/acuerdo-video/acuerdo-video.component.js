import { Component, Inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
export class DpiBackComponent {
    constructor(onPressed) {
        this.onPressed = onPressed;
    }
    openCamera() {
        this.onPressed();
    }
}
DpiBackComponent.ɵfac = function DpiBackComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DpiBackComponent)(i0.ɵɵdirectiveInject('onPressed')); };
DpiBackComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DpiBackComponent, selectors: [["app-dpi-back"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 12, vars: 0, consts: [[1, "content"], [1, "head"], [1, "p-center", "p-info"], [1, "dpi-container"], ["autoplay", "", "loop", "", "muted", "", "playsinline", "", "width", "1280", "height", "300"], ["src", "assets/imagesIdvision/Dpi-back-1.mp4", "type", "video/mp4"], [1, "fixed-footer"], ["expand", "block", 1, "custom-button", 3, "click"]], template: function DpiBackComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "h2");
        i0.ɵɵtext(3, "Acuerdo de video");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "p", 2);
        i0.ɵɵtext(5, "Evita sombras, reflejos y coloca tu documento dentro del recuadro.");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(6, "div", 3)(7, "video", 4);
        i0.ɵɵelement(8, "source", 5);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(9, "div", 6)(10, "ion-button", 7);
        i0.ɵɵlistener("click", function DpiBackComponent_Template_ion_button_click_10_listener() { return ctx.openCamera(); });
        i0.ɵɵtext(11, "Tomar una foto");
        i0.ɵɵelementEnd()()();
    } }, dependencies: [IonicModule, i1.IonButton] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DpiBackComponent, [{
        type: Component,
        args: [{ selector: 'app-dpi-back', standalone: true, imports: [IonicModule], template: `
    <div class="content">
      <div class="head">
        <h2>Acuerdo de video</h2>
        <p class="p-center p-info">Evita sombras, reflejos y coloca tu documento dentro del recuadro.</p>
      </div>
      <div class="dpi-container">
        <video autoplay loop muted playsinline width="1280" height="300">
          <source src="assets/imagesIdvision/Dpi-back-1.mp4" type="video/mp4">
        </video>
      </div>
      <div class="fixed-footer">
        <ion-button class="custom-button" expand="block" (click)="openCamera()">Tomar una foto</ion-button>
      </div>
    </div>
  ` }]
    }], () => [{ type: undefined, decorators: [{
                type: Inject,
                args: ['onPressed']
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DpiBackComponent, { className: "DpiBackComponent" }); })();
//# sourceMappingURL=acuerdo-video.component.js.map