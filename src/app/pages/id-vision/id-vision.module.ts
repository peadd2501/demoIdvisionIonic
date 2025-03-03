import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DpiFrontComponent } from '../slides/dpi-front/slide1.component';
import { DpiBackComponent } from '../slides/dpi-back/slide2.component';
import { VideoSelfieComponent } from '../slides/video-selfie/slide3.component';
import { Slide4Component } from '../slides/slide4/slide4.component';
import { IdVisionComponent } from './id-vision.component';

@NgModule({
  declarations: [
    // IdVisionComponent, // Declara el componente de la página
    // DpiFrontComponent, // Declara los slides aquí
    // DpiBackComponent,
    // VideoSelfieComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    // IdVisionComponent, // Exporta si necesitas usarlo en otras partes
    
  ],
})
export class IdVisionModule {}
