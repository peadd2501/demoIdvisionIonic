import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
import * as i2 from "@angular/common";
function MessageModalComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "img", 9);
    i0.ɵɵelementContainerEnd();
} }
function MessageModalComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "img", 10);
    i0.ɵɵelementContainerEnd();
} }
function MessageModalComponent_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "img", 9);
    i0.ɵɵelementContainerEnd();
} }
function MessageModalComponent_div_8_li_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const error_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(error_r2);
} }
function MessageModalComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "ul", 11);
    i0.ɵɵtemplate(2, MessageModalComponent_div_8_li_2_Template, 2, 1, "li", 12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.errorMessages);
} }
function MessageModalComponent_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.message);
} }
export class MessageModalComponent {
    set errors(value) {
        if (Array.isArray(value)) {
            this.errorMessages = value;
        }
        else if (value && typeof value === 'string') {
            this.errorMessages = value.includes(',')
                ? value.split(',').map(msg => msg.trim())
                : [value];
        }
        else {
            this.errorMessages = [];
        }
    }
    constructor(modalCtrl) {
        this.modalCtrl = modalCtrl;
        this.title = '';
        this.variant = 'dpi';
        this.message = '';
        this.errorMessages = [];
    }
    closeModal() {
        this.modalCtrl.dismiss();
    }
    static { this.ɵfac = function MessageModalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MessageModalComponent)(i0.ɵɵdirectiveInject(i1.ModalController)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MessageModalComponent, selectors: [["app-modal-error"]], inputs: { title: "title", variant: "variant", message: "message", errors: "errors" }, decls: 13, vars: 6, consts: [["singleMessage", ""], [1, "custom-modal-content"], [1, "modal-wrapper"], [3, "ngSwitch"], [4, "ngSwitchCase"], [4, "ngSwitchDefault"], [1, "modal-title"], [4, "ngIf", "ngIfElse"], ["expand", "block", 1, "modal-button", 3, "click"], ["src", "assets/imagesIdvision/icons/dpi-error.svg", "alt", "Icono DPI", 1, "modal-icon"], ["src", "assets/imagesIdvision/icons/video-error.svg", "alt", "Icono Video", 1, "modal-icon"], [1, "error-list"], [4, "ngFor", "ngForOf"], [1, "modal-message"]], template: function MessageModalComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "ion-content", 1)(1, "div", 2);
            i0.ɵɵelementContainerStart(2, 3);
            i0.ɵɵtemplate(3, MessageModalComponent_ng_container_3_Template, 2, 0, "ng-container", 4)(4, MessageModalComponent_ng_container_4_Template, 2, 0, "ng-container", 4)(5, MessageModalComponent_ng_container_5_Template, 2, 0, "ng-container", 5);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementStart(6, "h2", 6);
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(8, MessageModalComponent_div_8_Template, 3, 1, "div", 7)(9, MessageModalComponent_ng_template_9_Template, 2, 1, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(11, "ion-button", 8);
            i0.ɵɵlistener("click", function MessageModalComponent_Template_ion_button_click_11_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeModal()); });
            i0.ɵɵtext(12, " Ok ");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            const singleMessage_r4 = i0.ɵɵreference(10);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngSwitch", ctx.variant);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "dpi");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "video");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.errorMessages && ctx.errorMessages.length > 0)("ngIfElse", singleMessage_r4);
        } }, dependencies: [i2.NgForOf, i2.NgIf, i2.NgSwitch, i2.NgSwitchCase, i2.NgSwitchDefault, i1.IonButton, i1.IonContent], styles: [".custom-modal-content[_ngcontent-%COMP%] {\n    --background: transparent; // Para que el fondo del ion-content sea transparente\n  }\n  \n  .modal-wrapper[_ngcontent-%COMP%] {\n    background-color: #fff;\n    margin: auto;\n    margin-top: 50%;\n    width: 80%;\n    max-width: 320px;\n    border-radius: 8px;\n    text-align: center;\n    padding: 20px;\n    box-shadow: 0 2px 8px rgba(0,0,0,0.2);\n  }\n  \n  .modal-icon[_ngcontent-%COMP%] {\n    font-size: 3rem;\n    color: var(--orange-primary);\n    margin-bottom: 8px;\n  }\n  \n  \n\n  .modal-title[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n    font-weight: bold;\n    color: #333;\n    margin-bottom: 8px;\n  }\n  \n  \n\n  .modal-message[_ngcontent-%COMP%] {\n    font-size: 1rem;\n    color: #666;\n    margin-bottom: 16px;\n  }\n  \n.error-list[_ngcontent-%COMP%] {\n    list-style-type: disc;\n    padding-left: 20px;\n    margin-bottom: 16px;\n    text-align: left;\n    color: #666;\n    font-size: 1rem;\n  }\n  \n  .error-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    margin-bottom: 8px;\n  }\n\n  .modal-button[_ngcontent-%COMP%] {\n    // --background: #F8AA00; \n\n    // --color: #fff;\n    // --border-radius: 4px;\n        //   max-width: 300px; // anteriormente 300\n        width: auto;\n        margin: 0 auto;\n        background-color: #ffcc00;\n        color: #ffffff;\n        font-weight: bold;\n        border-radius: 20px;\n    \n        --background: var(--orange-primary);\n        --background-hover: var(--orange-secondary);\n        --background-activated: var(--orange-secondary);\n        --background-focused: var(--orange-secondary);\n      \n        --color: var(--orange-primary);\n      \n        --border-radius: 20px;\n        --border-color: var(--orange-primary);\n        --border-style: solid;\n        --border-width: 1px;\n      \n        --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n      \n        --ripple-color: var(--orange-secondary);\n      \n    \n        &:hover {\n          background-color: #ffb300;\n        }\n    \n        &:active {\n          background-color: #e6a800;\n        }\n      \n  }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MessageModalComponent, [{
        type: Component,
        args: [{ selector: 'app-modal-error', template: "<ion-content class=\"custom-modal-content\">\n  <div class=\"modal-wrapper\">\n    <ng-container [ngSwitch]=\"variant\">\n      <ng-container *ngSwitchCase=\"'dpi'\">\n        <img src=\"assets/imagesIdvision/icons/dpi-error.svg\" alt=\"Icono DPI\" class=\"modal-icon\">\n      </ng-container>\n      <ng-container *ngSwitchCase=\"'video'\">\n        <img src=\"assets/imagesIdvision/icons/video-error.svg\" alt=\"Icono Video\" class=\"modal-icon\">\n      </ng-container>\n      <ng-container *ngSwitchDefault>\n        <img src=\"assets/imagesIdvision/icons/dpi-error.svg\" alt=\"Icono DPI\" class=\"modal-icon\">\n      </ng-container>\n    </ng-container>\n    <h2 class=\"modal-title\">{{ title }}</h2>\n        <div *ngIf=\"errorMessages && errorMessages.length > 0; else singleMessage\">\n          <ul class=\"error-list\">\n            <li *ngFor=\"let error of errorMessages\">{{ error }}</li>\n          </ul>\n        </div>\n        <ng-template #singleMessage>\n          <p class=\"modal-message\">{{ message }}</p>\n        </ng-template>\n        \n    <ion-button (click)=\"closeModal()\" expand=\"block\" class=\"modal-button\">\n      Ok\n    </ion-button>\n  </div>\n</ion-content>\n", styles: [".custom-modal-content {\n    --background: transparent; // Para que el fondo del ion-content sea transparente\n  }\n  \n  .modal-wrapper {\n    background-color: #fff;\n    margin: auto;\n    margin-top: 50%;\n    width: 80%;\n    max-width: 320px;\n    border-radius: 8px;\n    text-align: center;\n    padding: 20px;\n    box-shadow: 0 2px 8px rgba(0,0,0,0.2);\n  }\n  \n  .modal-icon {\n    font-size: 3rem;\n    color: var(--orange-primary);\n    margin-bottom: 8px;\n  }\n  \n  /* T\u00EDtulo */\n  .modal-title {\n    font-size: 1.2rem;\n    font-weight: bold;\n    color: #333;\n    margin-bottom: 8px;\n  }\n  \n  /* Mensaje */\n  .modal-message {\n    font-size: 1rem;\n    color: #666;\n    margin-bottom: 16px;\n  }\n  \n.error-list {\n    list-style-type: disc;\n    padding-left: 20px;\n    margin-bottom: 16px;\n    text-align: left;\n    color: #666;\n    font-size: 1rem;\n  }\n  \n  .error-list li {\n    margin-bottom: 8px;\n  }\n\n  .modal-button {\n    // --background: #F8AA00; /* Mismo color del \u00EDcono */\n    // --color: #fff;\n    // --border-radius: 4px;\n        //   max-width: 300px; // anteriormente 300\n        width: auto;\n        margin: 0 auto;\n        background-color: #ffcc00;\n        color: #ffffff;\n        font-weight: bold;\n        border-radius: 20px;\n    \n        --background: var(--orange-primary);\n        --background-hover: var(--orange-secondary);\n        --background-activated: var(--orange-secondary);\n        --background-focused: var(--orange-secondary);\n      \n        --color: var(--orange-primary);\n      \n        --border-radius: 20px;\n        --border-color: var(--orange-primary);\n        --border-style: solid;\n        --border-width: 1px;\n      \n        --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n      \n        --ripple-color: var(--orange-secondary);\n      \n    \n        &:hover {\n          background-color: #ffb300;\n        }\n    \n        &:active {\n          background-color: #e6a800;\n        }\n      \n  }\n  "] }]
    }], () => [{ type: i1.ModalController }], { title: [{
            type: Input
        }], variant: [{
            type: Input
        }], message: [{
            type: Input
        }], errors: [{
            type: Input
        }, {
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MessageModalComponent, { className: "MessageModalComponent" }); })();
//# sourceMappingURL=message-modal.component.js.map