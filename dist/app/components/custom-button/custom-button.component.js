import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@ionic/angular";
export class CustomButtonComponent {
    constructor() {
        this.texto = 'Button'; // Texto del botón
        this.disabled = false; // Para desactivar el botón
        this.clicked = new EventEmitter(); // Evento de clic
        this.showIcon = false;
    }
    ngOnInit() { }
    onClick() {
        this.clicked.emit(); // Emite el evento al hacer clic
    }
}
CustomButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: CustomButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CustomButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.12", type: CustomButtonComponent, selector: "app-custom-button", inputs: { texto: "texto", disabled: "disabled", icon: "icon", showIcon: "showIcon" }, outputs: { clicked: "clicked" }, ngImport: i0, template: "<ion-button expand=\"block\"\n[disabled]=\"disabled\"\n(click)=\"onClick()\">\n<ion-icon *ngIf=\"showIcon && icon\" [name]=\"icon\" slot=\"start\"></ion-icon>\n  {{texto}}\n</ion-button>\n\n", styles: [".camera-container {\n    position: relative;\n    width: 100%;\n    height: 100vh;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background-color: black;\n  }\n  \n  .overlay-image {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 90%;\n    max-width: 400px;\n    opacity: 0.6;\n  }\n  \n  .overlay-text {\n    position: absolute;\n    top: 10%;\n    left: 50%;\n    transform: translateX(-50%);\n    color: white;\n    text-align: center;\n  }\n  \n  .close-button {\n    position: absolute;\n    top: 20px;\n    right: 20px;\n    color: white;\n  }\n  \n  .capture-button {\n    position: absolute;\n    bottom: 40px;\n    background-color: #ffcc00;\n    color: white;\n    font-size: 24px;\n    border-radius: 50%;\n    width: 70px;\n    height: 70px;\n  }\n  "], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.IonButton, selector: "ion-button", inputs: ["buttonType", "color", "disabled", "download", "expand", "fill", "form", "href", "mode", "rel", "routerAnimation", "routerDirection", "shape", "size", "strong", "target", "type"] }, { kind: "component", type: i2.IonIcon, selector: "ion-icon", inputs: ["color", "flipRtl", "icon", "ios", "lazy", "md", "mode", "name", "sanitize", "size", "src"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: CustomButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-custom-button', template: "<ion-button expand=\"block\"\n[disabled]=\"disabled\"\n(click)=\"onClick()\">\n<ion-icon *ngIf=\"showIcon && icon\" [name]=\"icon\" slot=\"start\"></ion-icon>\n  {{texto}}\n</ion-button>\n\n", styles: [".camera-container {\n    position: relative;\n    width: 100%;\n    height: 100vh;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background-color: black;\n  }\n  \n  .overlay-image {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 90%;\n    max-width: 400px;\n    opacity: 0.6;\n  }\n  \n  .overlay-text {\n    position: absolute;\n    top: 10%;\n    left: 50%;\n    transform: translateX(-50%);\n    color: white;\n    text-align: center;\n  }\n  \n  .close-button {\n    position: absolute;\n    top: 20px;\n    right: 20px;\n    color: white;\n  }\n  \n  .capture-button {\n    position: absolute;\n    bottom: 40px;\n    background-color: #ffcc00;\n    color: white;\n    font-size: 24px;\n    border-radius: 50%;\n    width: 70px;\n    height: 70px;\n  }\n  "] }]
        }], ctorParameters: () => [], propDecorators: { texto: [{
                type: Input
            }], disabled: [{
                type: Input
            }], clicked: [{
                type: Output
            }], icon: [{
                type: Input
            }], showIcon: [{
                type: Input
            }] } });
//# sourceMappingURL=custom-button.component.js.map