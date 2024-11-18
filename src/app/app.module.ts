import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IdVisionComponent } from './pages/id-vision/id-vision.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { CameraWithOverlayComponent } from './pages/id-vision/components/camera-with-overlay/camera-with-overlay.component';
import { CamaraVideoSelfieComponent } from './pages/id-vision/components/camara-video-selfie/camara-video-selfie.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { CustomSlideComponent } from './pages/id-vision/components/custom-slide/custom-slide.component';

@NgModule({
  declarations: [AppComponent, CustomButtonComponent, CameraWithOverlayComponent, CamaraVideoSelfieComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IdVisionComponent, HttpClientModule,     IonicStorageModule.forRoot() // Agrega esta línea
  ],
  exports: [],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
