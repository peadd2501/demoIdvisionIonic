import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Slide1Component } from '../slides/slide1/slide1.component';
import { Slide2Component } from '../slides/slide2/slide2.component';
import { Slide3Component } from '../slides/slide3/slide3.component';
import { Slide4Component } from '../slides/slide4/slide4.component';
import * as i0 from "@angular/core";
export class IdVisionModule {
}
IdVisionModule.ɵfac = function IdVisionModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || IdVisionModule)(); };
IdVisionModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: IdVisionModule });
IdVisionModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule, IonicModule] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IdVisionModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    // IdVisionComponent, // Declara el componente de la página
                    Slide1Component, // Declara los slides aquí
                    Slide2Component,
                    Slide3Component,
                    Slide4Component,
                ],
                imports: [CommonModule, IonicModule],
                exports: [
                // IdVisionComponent, // Exporta si necesitas usarlo en otras partes
                ],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(IdVisionModule, { declarations: [
        // IdVisionComponent, // Declara el componente de la página
        Slide1Component, // Declara los slides aquí
        Slide2Component,
        Slide3Component,
        Slide4Component], imports: [CommonModule, IonicModule] }); })();
//# sourceMappingURL=id-vision.module.js.map