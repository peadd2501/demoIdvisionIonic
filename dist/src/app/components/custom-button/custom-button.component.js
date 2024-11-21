import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@ionic/angular";
function CustomButtonComponent_ion_icon_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ion-icon", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("name", ctx_r0.icon);
} }
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
CustomButtonComponent.ɵfac = function CustomButtonComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CustomButtonComponent)(); };
CustomButtonComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CustomButtonComponent, selectors: [["app-custom-button"]], inputs: { texto: "texto", disabled: "disabled", icon: "icon", showIcon: "showIcon" }, outputs: { clicked: "clicked" }, decls: 3, vars: 3, consts: [["expand", "block", 3, "click", "disabled"], ["slot", "start", 3, "name", 4, "ngIf"], ["slot", "start", 3, "name"]], template: function CustomButtonComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "ion-button", 0);
        i0.ɵɵlistener("click", function CustomButtonComponent_Template_ion_button_click_0_listener() { return ctx.onClick(); });
        i0.ɵɵtemplate(1, CustomButtonComponent_ion_icon_1_Template, 1, 1, "ion-icon", 1);
        i0.ɵɵtext(2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("disabled", ctx.disabled);
        i0.ɵɵadvance();
        i0.ɵɵproperty("ngIf", ctx.showIcon && ctx.icon);
        i0.ɵɵadvance();
        i0.ɵɵtextInterpolate1(" ", ctx.texto, "\n");
    } }, dependencies: [i1.NgIf, i2.IonButton, i2.IonIcon], styles: [".camera-container[_ngcontent-%COMP%] {\n    position: relative;\n    width: 100%;\n    height: 100vh;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background-color: black;\n  }\n  \n  .overlay-image[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 90%;\n    max-width: 400px;\n    opacity: 0.6;\n  }\n  \n  .overlay-text[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 10%;\n    left: 50%;\n    transform: translateX(-50%);\n    color: white;\n    text-align: center;\n  }\n  \n  .close-button[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 20px;\n    right: 20px;\n    color: white;\n  }\n  \n  .capture-button[_ngcontent-%COMP%] {\n    position: absolute;\n    bottom: 40px;\n    background-color: #ffcc00;\n    color: white;\n    font-size: 24px;\n    border-radius: 50%;\n    width: 70px;\n    height: 70px;\n  }"] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CustomButtonComponent, [{
        type: Component,
        args: [{ selector: 'app-custom-button', template: "<ion-button expand=\"block\"\n[disabled]=\"disabled\"\n(click)=\"onClick()\">\n<ion-icon *ngIf=\"showIcon && icon\" [name]=\"icon\" slot=\"start\"></ion-icon>\n  {{texto}}\n</ion-button>\n\n", styles: [".camera-container {\n    position: relative;\n    width: 100%;\n    height: 100vh;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background-color: black;\n  }\n  \n  .overlay-image {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 90%;\n    max-width: 400px;\n    opacity: 0.6;\n  }\n  \n  .overlay-text {\n    position: absolute;\n    top: 10%;\n    left: 50%;\n    transform: translateX(-50%);\n    color: white;\n    text-align: center;\n  }\n  \n  .close-button {\n    position: absolute;\n    top: 20px;\n    right: 20px;\n    color: white;\n  }\n  \n  .capture-button {\n    position: absolute;\n    bottom: 40px;\n    background-color: #ffcc00;\n    color: white;\n    font-size: 24px;\n    border-radius: 50%;\n    width: 70px;\n    height: 70px;\n  }\n  "] }]
    }], () => [], { texto: [{
            type: Input
        }], disabled: [{
            type: Input
        }], clicked: [{
            type: Output
        }], icon: [{
            type: Input
        }], showIcon: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CustomButtonComponent, { className: "CustomButtonComponent" }); })();
//# sourceMappingURL=custom-button.component.js.map