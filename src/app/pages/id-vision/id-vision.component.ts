import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from '@angular/core';
import { AlertController, IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { register, SwiperContainer } from 'swiper/element/bundle';
import { Swiper, SwiperOptions } from 'swiper/types';
import { CameraWithOverlayComponent } from './components/camera-with-overlay/camera-with-overlay.component';
import { CamaraVideoSelfieComponent } from './components/camara-video-selfie/camara-video-selfie.component';
import { DpiService } from './services/dpi/dpi-service.service';
import { lastValueFrom } from 'rxjs';


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

  
  constructor(private modalController: ModalController, private dpiService: DpiService, private alertController: AlertController,
    private loadingController: LoadingController
    /*private storage: Storage*/,) {
     // this.init();
     }

  swiperElement = signal<SwiperContainer | null>(null);
  // async init() {
  //   await this.storage['create']; // Inicializa Storage
  // }
  ngOnInit() {
    const swiperElemConstructor = document.querySelector('swiper-container');

    const swiperOptions: SwiperOptions = {
      slidesPerView: 1,
      pagination: false,
      navigation: {
        enabled: false,
      },
      allowTouchMove: false, 
    };
    Object.assign(swiperElemConstructor!, swiperOptions);
    this.swiperElement.set(swiperElemConstructor as SwiperContainer);
    this.swiperElement()?.initialize();
  }

  handleClick() {
    this.swiperElement()?.swiper?.slideNext();
  }

  async handleSlide(slide: number) {
    setTimeout(() => {
      if (this.swiperElement()?.swiper) {
        this.swiperElement()?.swiper.slideTo(slide);
      }
    }, 250);
    
  }

  handleGetInit() {
    this.swiperElement()?.swiper?.slideTo(0);
  }

//Frontal dpi services

async validateDPIFront(filePath: File): Promise<boolean> {
  this.modalController.dismiss();
     this.handleSlide(2);
  return true;
}

private async showAlert(header: string, message: string, subMessage?: string) {
  const alert = await this.alertController.create({
    header,
    message: message + (subMessage ? `<br/><small>${subMessage}</small>` : ''),
    buttons: ['Continuar']
  });
  await alert.present();
}

  async openCameraOverlayFrontal () {
    const modal = await this.modalController.create({
      component: CameraWithOverlayComponent,
      componentProps: {
        text1: 'Parte frontal: Identificación Nacional ',
        text2: 'Guatemala',
        overlaySrc: './../../../../../assets/imagesIdvision/overlay_container.png',
        onTakePicture: this.validateDPIFront.bind(this)
      },
      backdropDismiss: false,
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('Imagen capturada:', data.imagePath);
    }
  }

  //Trasero dpi services
  async validateDPIBack(filePath: File): Promise<boolean> {
    this.modalController.dismiss();
      this.handleSlide(3);
      return true;
    }
    
  async openCameraOverlayTrasero () {
    const modal = await this.modalController.create({
      component: CameraWithOverlayComponent,
      componentProps: {
        text1: 'Parte trasera: Identificación Nacional ',
        text2: 'Guatemala',
        overlaySrc: './../../../../../assets/imagesIdvision/overlay_container.png',
        onTakePicture: this.validateDPIBack.bind(this)

      },
      backdropDismiss: false,
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('Imagen capturada:', data.imagePath);
    }
  }

  getBackModal() {
    this.modalController.dismiss();
    this.handleSlide(4);
// this.handleClick();
  }

  async openAcuerdoVideo () {
    const modal = await this.modalController.create({
      component: CamaraVideoSelfieComponent,
      componentProps: {
        text1: 'Video Selfie',
        text2: 'Guatemala',
        overlaySrc: 'assets/overlay-image.png',
        backFunction: this.getBackModal.bind(this),
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
