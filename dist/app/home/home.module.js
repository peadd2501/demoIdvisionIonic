import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import * as i0 from "@angular/core";
export class HomePageModule {
}
HomePageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: HomePageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
HomePageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.12", ngImport: i0, type: HomePageModule, declarations: [HomePage], imports: [CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule] });
HomePageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: HomePageModule, imports: [CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: HomePageModule, decorators: [{
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
        }] });
//# sourceMappingURL=home.module.js.map