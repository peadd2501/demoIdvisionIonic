import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { register, SwiperContainer } from 'swiper/element/bundle';
import { Swiper, SwiperOptions } from 'swiper/types';
import { CameraWithOverlayComponent } from './components/camera-with-overlay/camera-with-overlay.component';
import { CamaraVideoSelfieComponent } from './components/camara-video-selfie/camara-video-selfie.component';


register();

@Component({
  selector: 'app-id-vision',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule],
  templateUrl: './id-vision.component.html',
  styleUrls: ['./id-vision.component.scss'],
})
export class IdVisionComponent  implements OnInit {

  
  constructor(private modalController: ModalController) { }

  swiperElement = signal<SwiperContainer | null>(null);

  ngOnInit() {
    const swiperElemConstructor = document.querySelector('swiper-container');

    const swiperOptions: SwiperOptions = {
      slidesPerView: 1,
      pagination: false,
      navigation: {
        enabled: false,
      },
    };
    Object.assign(swiperElemConstructor!, swiperOptions);
    this.swiperElement.set(swiperElemConstructor as SwiperContainer);
    this.swiperElement()?.initialize();
  }

  handleClick() {
    this.swiperElement()?.swiper?.slideNext();
  }


  async openCameraOverlayFrontal () {
    const modal = await this.modalController.create({
      component: CameraWithOverlayComponent,
      componentProps: {
        text1: 'Parte frontal: Identificación Nacional ',
        text2: 'Guatemala',
        overlaySrc: 'assets/overlay-image.png',
      },
      backdropDismiss: false,
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('Imagen capturada:', data.imagePath);
    }
  }

  async openCameraOverlayTrasero () {
    const modal = await this.modalController.create({
      component: CameraWithOverlayComponent,
      componentProps: {
        text1: 'Parte trasera: Identificación Nacional ',
        text2: 'Guatemala',
        overlaySrc: 'assets/overlay-image.png',
      },
      backdropDismiss: false,
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('Imagen capturada:', data.imagePath);
    }
  }


  async openAcuerdoVideo () {
    const modal = await this.modalController.create({
      component: CamaraVideoSelfieComponent,
      componentProps: {
        text1: 'Video Selfie',
        text2: 'Guatemala',
        overlaySrc: 'assets/overlay-image.png',
      },
      backdropDismiss: false,
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('Imagen capturada:', data.imagePath);
    }
  }
}
