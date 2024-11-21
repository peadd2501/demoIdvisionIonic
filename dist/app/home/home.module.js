import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import * as i0 from "@angular/core";
export class HomePageModule {
}
HomePageModule.ɵfac = function HomePageModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HomePageModule)(); };
HomePageModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: HomePageModule });
HomePageModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HomePageModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    IonicModule,
                    HomePageRoutingModule
                ],
                declarations: [HomePage]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(HomePageModule, { declarations: [HomePage], imports: [CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule] }); })();
//# sourceMappingURL=home.module.js.map