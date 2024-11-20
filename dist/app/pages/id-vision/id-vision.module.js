import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Slide1Component } from '../slides/slide1/slide1.component';
import { Slide2Component } from '../slides/slide2/slide2.component';
import { Slide3Component } from '../slides/slide3/slide3.component';
import { Slide4Component } from '../slides/slide4/slide4.component';
let IdVisionModule = class IdVisionModule {
};
IdVisionModule = __decorate([
    NgModule({
        declarations: [
            //IdVisionComponent, // Declara el componente de la página
            Slide1Component, // Declara los slides aquí
            Slide2Component,
            Slide3Component,
            Slide4Component,
        ],
        imports: [CommonModule, IonicModule],
        exports: [
        //IdVisionComponent, // Exporta si necesitas usarlo en otras partes
        ],
    })
], IdVisionModule);
export { IdVisionModule };
//# sourceMappingURL=id-vision.module.js.map