import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IdVisionComponent } from './pages/id-vision/id-vision.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { CameraWithOverlayComponent } from './pages/id-vision/components/camera-with-overlay/camera-with-overlay.component';
import { CamaraVideoSelfieComponent } from './pages/id-vision/components/camara-video-selfie/camara-video-selfie.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { CustomSlideComponent } from './pages/id-vision/components/custom-slide/custom-slide.component';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
import * as i2 from "@ionic/storage-angular";
export class AppModule {
}
AppModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: AppModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AppModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.12", ngImport: i0, type: AppModule, bootstrap: [AppComponent], declarations: [AppComponent, CustomButtonComponent, CameraWithOverlayComponent, CamaraVideoSelfieComponent /*,CustomSlideComponent, IdVisionComponent*/], imports: [BrowserModule, i1.IonicModule, CommonModule, AppRoutingModule, HttpClientModule, i2.IonicStorageModule, IdVisionComponent, CustomSlideComponent] });
AppModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: AppModule, providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }], imports: [BrowserModule, IonicModule.forRoot(), CommonModule, AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot(), IdVisionComponent] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: AppModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AppComponent, CustomButtonComponent, CameraWithOverlayComponent, CamaraVideoSelfieComponent /*,CustomSlideComponent, IdVisionComponent*/],
                    imports: [BrowserModule, IonicModule.forRoot(), CommonModule, AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot(), IdVisionComponent, CustomSlideComponent
                    ],
                    exports: [],
                    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
                    bootstrap: [AppComponent],
                }]
        }] });
//# sourceMappingURL=app.module.js.map