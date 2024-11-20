import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
export class HomePage {
    constructor() { }
}
HomePage.ɵfac = function HomePage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HomePage)(); };
HomePage.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HomePage, selectors: [["app-home"]], decls: 16, vars: 2, consts: [[3, "translucent"], [3, "fullscreen"], ["collapse", "condense"], ["size", "large"], ["id", "container"], ["target", "_blank", "rel", "noopener noreferrer", "href", "https://ionicframework.com/docs/components"]], template: function HomePage_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "ion-header", 0)(1, "ion-toolbar")(2, "ion-title");
        i0.ɵɵtext(3, " Blank ");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(4, "ion-content", 1)(5, "ion-header", 2)(6, "ion-toolbar")(7, "ion-title", 3);
        i0.ɵɵtext(8, "Blank");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(9, "div", 4)(10, "strong");
        i0.ɵɵtext(11, "Ready to create an app?");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(12, "p");
        i0.ɵɵtext(13, "Start with Ionic ");
        i0.ɵɵelementStart(14, "a", 5);
        i0.ɵɵtext(15, "UI Components");
        i0.ɵɵelementEnd()()()();
    } if (rf & 2) {
        i0.ɵɵproperty("translucent", true);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("fullscreen", true);
    } }, dependencies: [i1.IonContent, i1.IonHeader, i1.IonTitle, i1.IonToolbar], styles: ["#container[_ngcontent-%COMP%] {\n  text-align: center;\n\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n#container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 20px;\n  line-height: 26px;\n}\n\n#container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  line-height: 22px;\n\n  color: #8c8c8c;\n\n  margin: 0;\n}\n\n#container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  text-decoration: none;\n}"] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HomePage, [{
        type: Component,
        args: [{ selector: 'app-home', template: "<ion-header [translucent]=\"true\">\n  <ion-toolbar>\n    <ion-title>\n      Blank\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content [fullscreen]=\"true\">\n  <ion-header collapse=\"condense\">\n    <ion-toolbar>\n      <ion-title size=\"large\">Blank</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <div id=\"container\">\n    <strong>Ready to create an app?</strong>\n    <p>Start with Ionic <a target=\"_blank\" rel=\"noopener noreferrer\" href=\"https://ionicframework.com/docs/components\">UI Components</a></p>\n  </div>\n</ion-content>\n", styles: ["#container {\n  text-align: center;\n\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n#container strong {\n  font-size: 20px;\n  line-height: 26px;\n}\n\n#container p {\n  font-size: 16px;\n  line-height: 22px;\n\n  color: #8c8c8c;\n\n  margin: 0;\n}\n\n#container a {\n  text-decoration: none;\n}"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HomePage, { className: "HomePage" }); })();
//# sourceMappingURL=home.page.js.map