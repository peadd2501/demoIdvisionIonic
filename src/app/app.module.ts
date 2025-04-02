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
import {HttpClientModule, provideHttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { CustomSlideComponent } from './pages/id-vision/components/custom-slide/custom-slide.component';
import { DpiService } from './pages/id-vision/services/dpi/dpi-service.service';
import { PhotoSelfieCameraComponent } from './pages/id-vision/components/photo-selfie-camera/photo-selfie-camera.component';
import { CamaraAcuerdoVideoComponent } from './pages/id-vision/components/camara-acuerdo-video/camara-acuerdo.video.component';
import { SimpleAcuerdoVideoComponent } from './pages/id-vision/components/simple-acuerdo-video/simple-acuerdo-video.component';
import { MessageModalComponent } from './pages/id-vision/components/message-modal/message-modal.component';

@NgModule({
  declarations: [AppComponent, CustomButtonComponent, CameraWithOverlayComponent, CamaraVideoSelfieComponent /*,CustomSlideComponent, IdVisionComponent*/, PhotoSelfieCameraComponent, CamaraAcuerdoVideoComponent, SimpleAcuerdoVideoComponent, MessageModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), CommonModule, AppRoutingModule, IonicStorageModule.forRoot(), IdVisionComponent, CustomSlideComponent, HttpClientModule
  ],
  exports: [],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideHttpClient(), DpiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
