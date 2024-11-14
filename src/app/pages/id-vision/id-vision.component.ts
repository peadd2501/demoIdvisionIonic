import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal, ViewChild } from '@angular/core';
import { AlertController, IonicModule, IonInput, LoadingController, ModalController } from '@ionic/angular';
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
export class IdVisionComponent implements OnInit {
  @ViewChild('dpi', { static: false }) dpi!: IonInput;

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
    this.InitProccess();

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

  async InitProccess() {
    try {
      this.dpiService.InitProccess(this.dpi.value + '', '673259d3f027711b51e71202').subscribe({
        next: (response: any) => {
          if (!response['error']) {
            localStorage.setItem('codigo', response['details']);
            this.handleSlide(1)
            // this.swiperElement()?.swiper?.slideNext();
          }
        },
        error: (error) => {
          console.error('Error al llamar al servicio:', error);
        }
      });
    } catch (error) {
      alert("error");
      console.log(error)
    }
  }


  async DpiFrontProccess(filePath: string) {
    try {
      console.log('enviando DPI front')
      const file = await this.convertImagePathToFile(filePath, 'imagen_temporal.jpg');
      console.log('Archivo temporal creado:', file);
      const codigo = localStorage.getItem('codigo') ?? "";
      this.dpiService.uploadFrontDPI(file, codigo).subscribe({
        next: (response: any) => {
          if (!response['error']) {
            this.swiperElement()?.swiper?.slideNext();
          }
        },
        error: (error) => {
          console.error('Error al llamar al servicio:', error);
        }
      });
    } catch (error) {
      alert("error");
      console.log(error)
    }
  }

  async convertImagePathToFile(imagePath: string, fileName: string): Promise<File> {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  }

  async DpiBackProccess(filePath: string) {
    try {
      const file = await this.convertImagePathToFile(filePath, 'imagen_temporal_back.jpg');
      console.log('Archivo temporal creado:', file);
      const codigo = localStorage.getItem('codigo') ?? "";
      this.dpiService.uploadBackDPI(file, codigo).subscribe({
        next: (response: any) => {
          if (!response['error']) {
            this.swiperElement()?.swiper?.slideNext();
          }
        },
        error: (error) => {
          console.error('Error al llamar al servicio:', error);
        }
      });
    } catch (error) {
      alert("error");
      console.log(error)
    }
  }

  async VideoSelfieProcccess(filePath: string) {
    try {
      const file = await this.convertImagePathToFile(filePath, 'video_selfie.mp4');
      console.log('Archivo temporal creado:', file);
      const codigo = localStorage.getItem('codigo') ?? "";
      this.dpiService.videoSelfie(file, codigo).subscribe({
        next: (response: any) => {
          if (!response['error']) {
            this.swiperElement()?.swiper?.slideNext();
          }
        },
        error: (error) => {
          console.error('Error al llamar al servicio:', error);
        }
      });
    } catch (error) {
      alert("error");
      console.log(error)
    }
  }



  async validateDPIFront(filePath: string): Promise<boolean> {
    await this.DpiFrontProccess(filePath)
    this.modalController.dismiss();
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

  async openCameraOverlayFrontal() {

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
  }

  //Trasero dpi services
  async validateDPIBack(filePath: string): Promise<boolean> {
    this.modalController.dismiss();
    console.log('dataaaaaa xxx :', filePath)
    await this.DpiFrontProccess(filePath)
    //  this.handleSlide(3);
    return true;
  }

  async openCameraOverlayTrasero() {
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
  }

  getBackModal(filePath: string) {
    this.modalController.dismiss();
    this.VideoSelfieProcccess(filePath);
  }

  async openAcuerdoVideo() {
    const modal = await this.modalController.create({
      component: CamaraVideoSelfieComponent,
      componentProps: {
        cssClass: 'my-custom-class',
        text1: 'Video Selfie',
        text2: 'Guatemala',
        overlaySrc: 'assets/overlay-image.png',
        backFunction: this.getBackModal.bind(this),
      },
      backdropDismiss: false,
    });

    await modal.present();
  }
}
