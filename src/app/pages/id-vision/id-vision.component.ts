import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal, ViewChild } from '@angular/core';
import { AlertController, IonicModule, IonInput, LoadingController, ModalController, Platform } from '@ionic/angular';
import { register, SwiperContainer } from 'swiper/element/bundle';
import { Swiper, SwiperOptions } from 'swiper/types';
import { CameraWithOverlayComponent } from './components/camera-with-overlay/camera-with-overlay.component';
import { CamaraVideoSelfieComponent } from './components/camara-video-selfie/camara-video-selfie.component';
import { DpiService } from './services/dpi/dpi-service.service';
import { lastValueFrom } from 'rxjs';
import { ModalDpiServices } from './services/modal-services/modal-dpi-services';


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
  private isAndroid: boolean;
  private isIOS: boolean;

  constructor(private modalController: ModalController, private dpiService: DpiService, private alertController: AlertController,
    private loadingController: LoadingController,
    private platform: Platform,
    private modalDpiServices: ModalDpiServices
    /*private storage: Storage*/,) {
    // this.init();
    this.isAndroid = this.platform.is('android');
    this.isIOS = this.platform.is('ios');
  }

  swiperElement = signal<SwiperContainer | null>(null);
  private modalRef: HTMLIonModalElement | null = null;

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
      //allowTouchMove: false,
    };
    Object.assign(swiperElemConstructor!, swiperOptions);
    this.swiperElement.set(swiperElemConstructor as SwiperContainer);
    this.swiperElement()?.initialize();

    this.modalDpiServices.closeOverlay$.subscribe(() => {
      this.closeOverlay();
    });
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
    let loader: HTMLIonLoadingElement | null = null;

    try {

          // Muestra el loader
    loader = await this.loadingController.create({
      message: 'Procesando...',
      spinner: 'crescent'
    });

    await loader.present();


      console.log('enviando DPI front')
      const file = await this.convertImagePathToFile(filePath, 'imagen_temporal.jpg');
      console.log('Archivo temporal creado:', file);
      const codigo = localStorage.getItem('codigo') ?? "";
      await this.dpiService.uploadFrontDPI(file, codigo).subscribe({
        next: (response: any) => {

                  // Oculta el loader cuando se recibe una respuesta
        if (loader) {
         loader.dismiss();
        }
          console.log(response);
          
          if (!response['error']) {

            this.showAlert(
              'Éxito',
              'DPI registrado correctamente',
              [],
              () => {
                this.closeModalFromParent();
                this.modalController.dismiss();
                this.handleSlide(2);
              }
            )
            // this.swiperElement()?.swiper?.slideNext();

          }
          else {
            this.showAlert(
              response['mensage'],
              '',
              response['details'],
              () => {
              }
            )
          }
        },
        error: (error) => {
          console.error('Error al llamar al servicio:', error);
          
                  // Oculta el loader en caso de error
        if (loader) {
          loader.dismiss();
        }
        }
      });
    } catch (error) {
      alert("error");
      console.log(error)
    }
  }

  closeModalFromParent() {
    // Emite el evento para cerrar la modal
    this.modalDpiServices.requestCloseOverlay();
  }


  async convertImagePathToFile(imagePath: string, fileName: string): Promise<File> {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  }

  async DpiBackProccess(filePath: string) {
    let loader: HTMLIonLoadingElement | null = null;

    try {

                // Muestra el loader
    loader = await this.loadingController.create({
      message: 'Procesando...',
      spinner: 'crescent'
    });

    await loader.present();

      const file = await this.convertImagePathToFile(filePath, 'imagen_temporal_back.jpg');
      console.log('Archivo temporal creado:', file);
      const codigo = localStorage.getItem('codigo') ?? "";
      this.dpiService.uploadBackDPI(file, codigo).subscribe({
        next: (response: any) => {
                  if (loader) {
         loader.dismiss();
        }
          if (!response['error']) {

            this.showAlert(
              'Éxito',
              'DPI registrado correctamente',
              [],
              () => {
                this.closeModalFromParent();
                this.modalController.dismiss();
                this.handleSlide(3);
              }
            )
           // this.swiperElement()?.swiper?.slideNext();
          } else {
            this.showAlert(
              response['mensage'],
              '',
              response['details']
            )
          }
        },
        error: (error) => {
          if (loader) {
            loader.dismiss();
          }
          console.error('Error al llamar al servicio:', error);
        }
      });
    } catch (error) {
      alert("error");
      console.log(error)
    }
  }

  async VideoSelfieProcccess(file: File) {
    try {
      // const file = await this.convertImagePathToFile(filePath, this.isIOS ? 'video_selfie.mp4' : 'video_selfie.webm',);
      console.log('Archivo temporal creado:', file);
      const codigo = localStorage.getItem('codigo') ?? "";
      await this.dpiService.videoSelfie(file, codigo).subscribe({
        next: (response: any) => {
          if (!response['error']) {
            this.handleSlide(4);
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



  async validateDPIFront(filePath: string): Promise<boolean> {
    await this.DpiFrontProccess(filePath)
    return true;
  }

  private async showAlert(header: string, message: string, details?: string[], onConfirm?: () => void, subMessage?: string) {
    const detailsMessage = details 
    ? details.map(detail => `${detail}           `).join('') 
    : '';
  
  const fullMessage = message + (detailsMessage ? `${detailsMessage}` : '');

    const alert = await this.alertController.create({
      header,
      message: fullMessage,
      buttons: [
        {
          text: 'Continuar',
          handler: () => {
            if (onConfirm) {
              onConfirm(); // Ejecuta la función pasada como parámetro
            }
          }
        }
      ]
    });
    await alert.present();
  }
  

  async openCameraOverlayFrontal() {

    //const modal 
    this.modalRef= await this.modalController.create({
      component: CameraWithOverlayComponent,
      componentProps: {
        text1: 'Parte frontal: Identificación Nacional ',
        text2: 'Guatemala',
        overlaySrc: './../../../../../assets/imagesIdvision/overlay_container.png',
        onTakePicture: this.DpiFrontProccess.bind(this),
        closeRequested: () => this.closeOverlay()
      },
      backdropDismiss: false,
    });

    await this.modalRef.present();

    // modal.onDidDismiss().then((data) => {
    //   if (data.data && data.data.closeRequested) {
    //     console.log('test');
        
    //     this.closeOverlay();
    //   }
    // });
  }

  async closeOverlay() {
    // if (this.modalRef) {
    //   const modalInstance = this.modalRef?.querySelector('app-camera-overlay') as unknown as CameraWithOverlayComponent;
    //   modalInstance?.closeRequestedFunction();
      
    // }
    console.log('Modal cerrada desde el componente padre');
  }

  //Trasero dpi services
  async validateDPIBack(filePath: string): Promise<boolean> {
    this.modalController.dismiss();
    console.log('dataaaaaa xxx :', filePath)
    await this.DpiBackProccess(filePath)
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
        onTakePicture: this.DpiBackProccess.bind(this)

      },
      backdropDismiss: false,
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    
    if (data && data.executeFuncion) {
      // Ejecutar la función que se recibió de la modal
      data.executeFuncion();
    }
  }

  async getBackModal(filePath: File) {
    //this.modalController.dismiss();
    await this.VideoSelfieProcccess(filePath);
  }

  async openAcuerdoVideo() {
    const modal = await this.modalController.create({
      component: CamaraVideoSelfieComponent,
      componentProps: {
        cssClass: 'my-custom-class',
        text1: 'Video Selfie',
        text2: 'Guatemala',
        overlaySrc: 'assets/overlay-image.png',
        backFunction: 
        
        // async (file:string) => {
        //   console.log('Video recibido en el padre:', file);
        // }
        this.getBackModal.bind(this),
      },
      backdropDismiss: false,
    });

    await modal.present();
  }
}
