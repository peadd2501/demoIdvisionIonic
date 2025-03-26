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
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { CustomSlideComponent } from './pages/id-vision/components/custom-slide/custom-slide.component';
import { DpiService } from './pages/id-vision/services/dpi/dpi-service.service';
import { PhotoSelfieCameraComponent } from './pages/id-vision/components/photo-selfie-camera/photo-selfie-camera.component';
import { CamaraAcuerdoVideoComponent } from './pages/id-vision/components/camara-acuerdo-video/camara-acuerdo.video.component';
import { SimpleAcuerdoVideoComponent } from './pages/id-vision/components/simple-acuerdo-video/simple-acuerdo-video.component';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
import * as i2 from "@ionic/storage-angular";
export class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AppModule, bootstrap: [AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideHttpClient(), DpiService], imports: [BrowserModule, IonicModule.forRoot(), CommonModule, AppRoutingModule, IonicStorageModule.forRoot(), IdVisionComponent, HttpClientModule] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppModule, [{
        type: NgModule,
        args: [{
                declarations: [AppComponent, CustomButtonComponent, CameraWithOverlayComponent, CamaraVideoSelfieComponent /*,CustomSlideComponent, IdVisionComponent*/, PhotoSelfieCameraComponent, CamaraAcuerdoVideoComponent, SimpleAcuerdoVideoComponent],
                imports: [BrowserModule, IonicModule.forRoot(), CommonModule, AppRoutingModule, IonicStorageModule.forRoot(), IdVisionComponent, CustomSlideComponent, HttpClientModule
                ],
                exports: [],
                providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideHttpClient(), DpiService],
                bootstrap: [AppComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AppModule, { declarations: [AppComponent, CustomButtonComponent, CameraWithOverlayComponent, CamaraVideoSelfieComponent /*,CustomSlideComponent, IdVisionComponent*/, PhotoSelfieCameraComponent, CamaraAcuerdoVideoComponent, SimpleAcuerdoVideoComponent], imports: [BrowserModule, i1.IonicModule, CommonModule, AppRoutingModule, i2.IonicStorageModule, IdVisionComponent, CustomSlideComponent, HttpClientModule] }); })();
//# sourceMappingURL=app.module.js.map