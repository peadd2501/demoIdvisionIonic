import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
export class PhotoSelfieComponent {
}
PhotoSelfieComponent.ɵfac = function PhotoSelfieComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PhotoSelfieComponent)(); };
PhotoSelfieComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PhotoSelfieComponent, selectors: [["app-photo-selfie"]], inputs: { openCamera: "openCamera" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 24, vars: 0, consts: [[1, "content"], [1, "head"], [1, "p-justify"], [1, "verify-container"], [1, "image-container"], ["src", "assets/imagesIdvision/Foco.png", "alt", ""], [1, "container-text"], ["src", "assets/imagesIdvision/rostroImage.png", "alt", ""], [1, "fixed-footer"], ["expand", "block", 1, "custom-button", 3, "click"]], template: function PhotoSelfieComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "h2");
        i0.ɵɵtext(3, "Photo Selfie");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "p", 2);
        i0.ɵɵtext(5, "Toma una foto para completar tu proceso de identificaci\u00F3n.");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(6, "ion-grid", 3)(7, "ion-row")(8, "ion-row")(9, "div", 4);
        i0.ɵɵelement(10, "img", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6)(12, "p");
        i0.ɵɵtext(13, "Si est\u00E1s en interiores, aseg\u00FArate de que la luz est\u00E9 frente a ti, no detr\u00E1s.");
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(14, "ion-row")(15, "ion-row")(16, "div", 4);
        i0.ɵɵelement(17, "img", 7);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(18, "div", 6)(19, "p");
        i0.ɵɵtext(20, "Aseg\u00FArate de que tu rostro sea visible y de no usar anteojos ni sombreros.");
        i0.ɵɵelementEnd()()()()();
        i0.ɵɵelementStart(21, "div", 8)(22, "ion-button", 9);
        i0.ɵɵlistener("click", function PhotoSelfieComponent_Template_ion_button_click_22_listener() { return ctx.openCamera(); });
        i0.ɵɵtext(23, "Abrir la c\u00E1mara");
        i0.ɵɵelementEnd()()();
    } }, dependencies: [IonicModule, i1.IonButton, i1.IonGrid, i1.IonRow] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PhotoSelfieComponent, [{
        type: Component,
        args: [{ selector: 'app-photo-selfie', standalone: true, imports: [IonicModule], template: `
    <div class="content">
      <div class="head">
        <h2>Photo Selfie</h2>
        <p class="p-justify">Toma una foto para completar tu proceso de identificación.</p>
      </div>
      <ion-grid class="verify-container">
        <ion-row>
          <ion-row>
            <div class="image-container">
              <img src="assets/imagesIdvision/Foco.png" alt="" />
            </div>
            <div class="container-text">
              <p>Si estás en interiores, asegúrate de que la luz esté frente a ti, no detrás.</p>
            </div>
          </ion-row>
        </ion-row>
        <ion-row>
          <ion-row>
            <div class="image-container">
              <img src="assets/imagesIdvision/rostroImage.png" alt="" />
            </div>
            <div class="container-text">
              <p>Asegúrate de que tu rostro sea visible y de no usar anteojos ni sombreros.</p>
            </div>
          </ion-row>
        </ion-row>
      </ion-grid>
      <div class="fixed-footer">
        <ion-button class="custom-button" expand="block" (click)="openCamera()">Abrir la cámara</ion-button>
      </div>
    </div>
  ` }]
    }], null, { openCamera: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PhotoSelfieComponent, { className: "PhotoSelfieComponent" }); })();
//# sourceMappingURL=photo-selfie.component.js.map