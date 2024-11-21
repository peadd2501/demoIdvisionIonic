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
IdVisionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: IdVisionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
IdVisionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.12", ngImport: i0, type: IdVisionModule, declarations: [
        // IdVisionComponent, // Declara el componente de la página
        Slide1Component, // Declara los slides aquí
        Slide2Component,
        Slide3Component,
        Slide4Component], imports: [CommonModule, IonicModule] });
IdVisionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: IdVisionModule, imports: [CommonModule, IonicModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: IdVisionModule, decorators: [{
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
        }] });
//# sourceMappingURL=id-vision.module.js.map