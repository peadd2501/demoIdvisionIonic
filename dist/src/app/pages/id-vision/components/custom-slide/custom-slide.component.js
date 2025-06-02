import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
export class CustomSlideComponent {
    static { this.ɵfac = function CustomSlideComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CustomSlideComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CustomSlideComponent, selectors: [["app-custom-slide"]], inputs: { image1: "image1", image2: "image2" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 6, vars: 2, consts: [[1, "container"], ["size", "6"], ["alt", "Imagen 1", 3, "src"], ["alt", "Imagen 2", 3, "src"]], template: function CustomSlideComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "ion-row")(2, "ion-col", 1);
            i0.ɵɵelement(3, "img", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "ion-col", 1);
            i0.ɵɵelement(5, "img", 3);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("src", ctx.image1, i0.ɵɵsanitizeUrl);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("src", ctx.image2, i0.ɵɵsanitizeUrl);
        } }, styles: [".container[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: center; \n\n    align-items: center;    \n\n     height: 100%;           \n\n  }\n  \n  ion-row[_ngcontent-%COMP%] {\n    display: flex; \n\n    justify-content: space-between; \n\n  }\n  ion-col[_ngcontent-%COMP%] {\n    justify-content: center;\n    align-items: center;\n  }\n  \n  ion-col[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 100%; \n\n    height: auto; \n\n    object-fit: contain; \n\n  }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CustomSlideComponent, [{
        type: Component,
        args: [{ selector: 'app-custom-slide', standalone: true, schemas: [CUSTOM_ELEMENTS_SCHEMA], encapsulation: ViewEncapsulation.Emulated, template: "<div class=\"container\">\n  <ion-row>\n    <ion-col size=\"6\">\n      <img [src]=\"image1\" alt=\"Imagen 1\" />\n    </ion-col>\n    <ion-col size=\"6\">\n      <img [src]=\"image2\" alt=\"Imagen 2\" />\n    </ion-col>\n  </ion-row>\n</div>", styles: [".container {\n    display: flex;\n    justify-content: center; /* Centra las im\u00E1genes horizontalmente */\n    align-items: center;    /* Centra las im\u00E1genes verticalmente */\n     height: 100%;           /* Asegura que el contenedor ocupe todo el espacio */\n  }\n  \n  ion-row {\n    display: flex; /* Activa el layout de flexbox en el row */\n    justify-content: space-between; /* Separa las im\u00E1genes uniformemente */\n  }\n  ion-col {\n    justify-content: center;\n    align-items: center;\n  }\n  \n  ion-col img {\n    width: 100%; /* Ajusta la imagen al ancho del contenedor */\n    height: auto; /* Mantiene la proporci\u00F3n de la imagen */\n    object-fit: contain; /* Asegura que la imagen no se deforme */\n  }\n  "] }]
    }], null, { image1: [{
            type: Input
        }], image2: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CustomSlideComponent, { className: "CustomSlideComponent" }); })();
//# sourceMappingURL=custom-slide.component.js.map