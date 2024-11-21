import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class CustomSlideComponent {
}
CustomSlideComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: CustomSlideComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CustomSlideComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.12", type: CustomSlideComponent, isStandalone: true, selector: "app-custom-slide", inputs: { image1: "image1", image2: "image2" }, ngImport: i0, template: "<div class=\"container\">\n  <ion-row>\n    <ion-col size=\"6\">\n      <img [src]=\"image1\" alt=\"Imagen 1\" />\n    </ion-col>\n    <ion-col size=\"6\">\n      <img [src]=\"image2\" alt=\"Imagen 2\" />\n    </ion-col>\n  </ion-row>\n</div>", styles: [".container {\n    display: flex;\n    justify-content: center; /* Centra las im\u00E1genes horizontalmente */\n    align-items: center;    /* Centra las im\u00E1genes verticalmente */\n     height: 100%;           /* Asegura que el contenedor ocupe todo el espacio */\n  }\n  \n  ion-row {\n    display: flex; /* Activa el layout de flexbox en el row */\n    justify-content: space-between; /* Separa las im\u00E1genes uniformemente */\n  }\n  ion-col {\n    justify-content: center;\n    align-items: center;\n  }\n  \n  ion-col img {\n    width: 100%; /* Ajusta la imagen al ancho del contenedor */\n    height: auto; /* Mantiene la proporci\u00F3n de la imagen */\n    object-fit: contain; /* Asegura que la imagen no se deforme */\n  }\n  "] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: CustomSlideComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-custom-slide', standalone: true, schemas: [CUSTOM_ELEMENTS_SCHEMA], template: "<div class=\"container\">\n  <ion-row>\n    <ion-col size=\"6\">\n      <img [src]=\"image1\" alt=\"Imagen 1\" />\n    </ion-col>\n    <ion-col size=\"6\">\n      <img [src]=\"image2\" alt=\"Imagen 2\" />\n    </ion-col>\n  </ion-row>\n</div>", styles: [".container {\n    display: flex;\n    justify-content: center; /* Centra las im\u00E1genes horizontalmente */\n    align-items: center;    /* Centra las im\u00E1genes verticalmente */\n     height: 100%;           /* Asegura que el contenedor ocupe todo el espacio */\n  }\n  \n  ion-row {\n    display: flex; /* Activa el layout de flexbox en el row */\n    justify-content: space-between; /* Separa las im\u00E1genes uniformemente */\n  }\n  ion-col {\n    justify-content: center;\n    align-items: center;\n  }\n  \n  ion-col img {\n    width: 100%; /* Ajusta la imagen al ancho del contenedor */\n    height: auto; /* Mantiene la proporci\u00F3n de la imagen */\n    object-fit: contain; /* Asegura que la imagen no se deforme */\n  }\n  "] }]
        }], propDecorators: { image1: [{
                type: Input
            }], image2: [{
                type: Input
            }] } });
//# sourceMappingURL=custom-slide.component.js.map