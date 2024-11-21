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
Slide1Component.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: Slide1Component, deps: [], target: i0.ɵɵFactoryTarget.Component });
Slide1Component.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.12", type: Slide1Component, selector: "app-slide1", ngImport: i0, template: "\n<h2>Verifiquemos tu identidad</h2>\n<p>Para ser verificado, necesitar\u00E1s:</p>\n<ion-grid>\n  <ion-row>\n    <ion-col>\n      <ion-icon name=\"document-outline\"></ion-icon>\n      <p>Sube fotos de documentos que prueben tu identidad</p>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col>\n      <ion-icon name=\"videocam-outline\"></ion-icon>\n      <p>Graba un video selfie mientras lees el texto en voz alta</p>\n    </ion-col>\n  </ion-row>\n</ion-grid>\n<ion-button expand=\"block\" (click)=\"goToNext()\">Empecemos</ion-button>", styles: [""], dependencies: [{ kind: "component", type: i1.IonButton, selector: "ion-button", inputs: ["buttonType", "color", "disabled", "download", "expand", "fill", "form", "href", "mode", "rel", "routerAnimation", "routerDirection", "shape", "size", "strong", "target", "type"] }, { kind: "component", type: i1.IonCol, selector: "ion-col", inputs: ["offset", "offsetLg", "offsetMd", "offsetSm", "offsetXl", "offsetXs", "pull", "pullLg", "pullMd", "pullSm", "pullXl", "pullXs", "push", "pushLg", "pushMd", "pushSm", "pushXl", "pushXs", "size", "sizeLg", "sizeMd", "sizeSm", "sizeXl", "sizeXs"] }, { kind: "component", type: i1.IonGrid, selector: "ion-grid", inputs: ["fixed"] }, { kind: "component", type: i1.IonIcon, selector: "ion-icon", inputs: ["color", "flipRtl", "icon", "ios", "lazy", "md", "mode", "name", "sanitize", "size", "src"] }, { kind: "component", type: i1.IonRow, selector: "ion-row" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: Slide1Component, decorators: [{
            type: Component,
            args: [{ selector: 'app-slide1', template: "\n<h2>Verifiquemos tu identidad</h2>\n<p>Para ser verificado, necesitar\u00E1s:</p>\n<ion-grid>\n  <ion-row>\n    <ion-col>\n      <ion-icon name=\"document-outline\"></ion-icon>\n      <p>Sube fotos de documentos que prueben tu identidad</p>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col>\n      <ion-icon name=\"videocam-outline\"></ion-icon>\n      <p>Graba un video selfie mientras lees el texto en voz alta</p>\n    </ion-col>\n  </ion-row>\n</ion-grid>\n<ion-button expand=\"block\" (click)=\"goToNext()\">Empecemos</ion-button>" }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=slide1.component.js.map