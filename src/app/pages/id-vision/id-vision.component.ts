import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { AlertController, IonicModule, IonInput, LoadingController, ModalController, NavController, Platform } from '@ionic/angular';
import { register, SwiperContainer } from 'swiper/element/bundle';
import { Swiper, SwiperOptions } from 'swiper/types';
import { CameraWithOverlayComponent } from './components/camera-with-overlay/camera-with-overlay.component';
import { CamaraVideoSelfieComponent } from './components/camara-video-selfie/camara-video-selfie.component';
import { DpiService } from './services/dpi/dpi-service.service';
import { ModalDpiServices } from './services/modal-services/modal-dpi-services';
import { CustomSlideComponent } from './components/custom-slide/custom-slide.component';
import { ModalVideoSelfieServices } from './services/modal-services/modal-video-selfie-services';
import { SdkCommunicationService } from './services/modal-services/sdk-communication-services';
import { Router } from '@angular/router';
import { ValidateMetaGService } from './services/validate-meta-g/validate-meta-g';
import { HttpClientModule } from '@angular/common/http';


register();

@Component({
  selector: 'app-id-vision',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, CustomSlideComponent],
  providers: [DpiService], 
  // providers: [DpiService, ModalDpiServices, ModalVideoSelfieServices],
  templateUrl: './id-vision.component.html',
  styleUrls: ['./id-vision.component.scss'],
  encapsulation: ViewEncapsulation.None

})

export class IdVisionComponent implements OnInit, AfterViewInit {
  @ViewChild('dpi', { static: false }) dpi!: IonInput;
  private isAndroid: boolean;
  private isIOS: boolean;
  tutoImage1: string = 'assets/imagesIdvision/documentsImage.png';
  tutoImage2: string = 'assets/imagesIdvision/documentsImage.png';
  tutoImage3: string = 'assets/imagesIdvision/56.png';
  tutoImage4: string = 'assets/imagesIdvision/57.png';

  constructor(private modalController: ModalController, private dpiService: DpiService, private alertController: AlertController,
    private loadingController: LoadingController,
    private platform: Platform,
    private modalDpiServices: ModalDpiServices,
    private modalVideoSelfieServices: ModalVideoSelfieServices,
    private sdkCommunicationService: SdkCommunicationService,
    private navController: NavController,
    private validateMetaGService: ValidateMetaGService
    ) {
    this.isAndroid = this.platform.is('android');
    this.isIOS = this.platform.is('ios');
    this.validateMetaG = { 
      dpiFront: false,
      dpiBack: false,
      videoSelfie: false
    };
  }

  swiperElement = signal<SwiperContainer | null>(null);
  private modalRef: HTMLIonModalElement | null = null;
  @Input() isSwipe: boolean = false; 
  @Input() dpiCode: string = '';
  validateMetaG : {
    'dpiFront': boolean,
    'dpiBack': boolean,
    'videoSelfie': boolean
  };

  ngOnInit() {

    const swiperElemConstructor = document.querySelector('swiper-container');

    const swiperOptions: SwiperOptions = {
      slidesPerView: 1,
      pagination: false,
      navigation: {
        enabled: false,
      },
      allowTouchMove: this.isSwipe,
    };
    Object.assign(swiperElemConstructor!, swiperOptions);
    this.swiperElement.set(swiperElemConstructor as SwiperContainer);
    this.swiperElement()?.initialize();

    this.modalDpiServices.closeOverlay$.subscribe(() => {
      this.closeOverlay();
    });

    this.modalVideoSelfieServices.closeOverlay$.subscribe(() => {
      this.closeModalOverlay();
    });
    
  }

  ngAfterViewInit() {
    if (this.dpi) {
      this.dpi.value = this.dpiCode ?? '';
      console.log('dpi', this.dpiCode);
    }
  }

  handleClick() {
    this.InitProccess();

  }

  async handleSlide(slide: number) {
    setTimeout(() => {
      if (this.swiperElement()?.swiper) {
        this.swiperElement()?.swiper.slideTo(slide);
      }
    }, 300);

  }

  handleGetInit() {
    this.swiperElement()?.swiper?.slideTo(0);
  }

  handleExit(): void {
    const result = this.validateMetaG.dpiBack && this.validateMetaG.dpiFront && this.validateMetaG.videoSelfie;
    this.sdkCommunicationService.emitExit(result);
    this.navController.back();
  }

  isAllValid(): boolean {
    let isValid = this.validateMetaG.dpiFront && this.validateMetaG.dpiBack && this.validateMetaG.videoSelfie;
    this.validateMetaGService.setValidateMetaG(isValid);
    return isValid;
  }
  
  handleSkipTutorial() {
    this.swiperElement()?.swiper?.slideTo(5);
  }

  handleNext () {
    this.swiperElement()?.swiper?.slideNext();
  }

  async InitProccess() {
    let loader: HTMLIonLoadingElement | null = null;
    try {
      loader = await this.loadingController.create({
        message: 'Procesando...',
        spinner: 'crescent'
      });

      await loader.present();

      this.dpiService.InitProccess(this.dpi.value + '', '673259d3f027711b51e71202').subscribe({
        next: (response: any) => {
          console.log(response);
          if (loader) {
            loader.dismiss();
          }
          if (!response['error']) {
            localStorage.setItem('codigo', response['details']);
            this.handleSlide(1)
          } else {
            const dpiValue = this.dpi.value as string;           
            if (!dpiValue || dpiValue.trim().length === 0) {              
              this.showAlert('Error', 'El campo DPI no puede estar vacío', [])
            } else if(dpiValue && dpiValue.length > 12) {
              this.showAlert('Error', response['message'], [])
            } 
            else {
              const errorMessage = response['message']['errors']['CUI'][0];
              this.showAlert('Error', errorMessage, [])
            }
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
      const file = await this.convertImagePathToFile(filePath, 'imagen_temporal.png');
      console.log('Archivo temporal creado:', file);
      const codigo = localStorage.getItem('codigo') ?? "";
      console.log('codigo antes', codigo)
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
                this.validateMetaG.dpiFront = true;
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
                this.resumeCameraFromParent();
              }
            );
            this.validateMetaG.dpiFront = false;
          }
        },
        error: (error) => {
          this.showAlert(
            'Error',
            '',
            error,
            () => {
              this.resumeCameraFromParent();
            }
          );

          this.validateMetaG.dpiFront = false;
          // Oculta el loader en caso de error
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

  closeModalFromParent() {
    // Emite el evento para cerrar la modal
    this.modalDpiServices.requestCloseOverlay();
  }
  closeModalVideoSelfie() {
    this.modalVideoSelfieServices.requestCloseOverlay();
  }

  resumeCameraFromParent() {
    this.modalDpiServices.requestResumeCamera();
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
      // console.log('Archivo temporal creado:', file);
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
                this.validateMetaG.dpiBack = true;
                this.handleSlide(3);
              }
            )
            // this.swiperElement()?.swiper?.slideNext();
          } else {
            this.showAlert(
              response['mensage'],
              '',
              response['details']
            );
            this.validateMetaG.dpiBack = false;
          }
        },
        error: (error) => {
          this.showAlert(
            'Error',
            '',
            error,
            () => {
              this.resumeCameraFromParent();
            }
          );

          if (loader) {
            loader.dismiss();
          }
          this.validateMetaG.dpiBack = false;
          console.error('Error al llamar al servicio:', error);
        }
      });
    } catch (error) {
      alert("error");
      console.log(error)
    }
  }

  async VideoSelfieProcccess(file: File) {
    let loader: HTMLIonLoadingElement | null = null;
    try {

      loader = await this.loadingController.create({
        message: 'Procesando...',
        spinner: 'crescent'
      });

      await loader.present();
      // const file = await this.convertImagePathToFile(filePath, this.isIOS ? 'video_selfie.mp4' : 'video_selfie.webm',);
      // console.log('Archivo temporal creado:', file);
      const codigo = localStorage.getItem('codigo') ?? "";
      this.dpiService.videoSelfie(file, codigo).subscribe({
        next: (response: any) => {
          if (loader) {
            loader.dismiss();
          }
          if (!response['error']) {

            this.showAlert('Éxito', response['message'], [], () => {

              this.closeModalVideoSelfie();
              // this.closeModalFromParent();
              this.modalController.dismiss();
              this.validateMetaG.videoSelfie = true;
              this.handleSlide(4);
            })
          } else {
            this.showAlert('Error', response['message'], [], () => {
              this.closeModalVideoSelfie();
            });
            this.validateMetaG.videoSelfie = false;
          }
        },
        error: (error) => {
          this.showAlert(
            'Error',
            '',
            error,
            () => {
              this.resumeCameraFromParent();
            }
          );

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
    this.modalRef = await this.modalController.create({
      component: CameraWithOverlayComponent,
      componentProps: {
        text1: 'Coloca la parte frontal de tu DPI',
        text2: '',
        overlaySrc: 'assets/imagesIdvision/overlay_container.png',
        onTakePicture: this.DpiFrontProccess.bind(this),
        closeRequested: () => this.closeOverlay()
      },
      backdropDismiss: false,
    });

    await this.modalRef.present();
  }

  async closeOverlay() {
    console.log('Modal cerrada desde el componente padre');
  }

  async closeModalOverlay() {
    console.log('test');
    
  }
  //Trasero dpi services
  async validateDPIBack(filePath: string): Promise<boolean> {
    this.modalController.dismiss();
    await this.DpiBackProccess(filePath)
    return true;
  }

  async openCameraOverlayTrasero() {
    const modal = await this.modalController.create({
      component: CameraWithOverlayComponent,
      componentProps: {
        text1: 'Coloca el reverso de tu DPI',
        text2: '',
        overlaySrc: 'assets/imagesIdvision/overlay_container.png',
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

  async getBackModal(file: File) {
    if (!file || file.size === 0) {
      // console.log('Archivo temporal recibido está vacío o no válido.');
      return;
    }
    //this.modalController.dismiss();
    await this.VideoSelfieProcccess(file);
  }

  async openAcuerdoVideo() {
    const modal = await this.modalController.create({
      component: CamaraVideoSelfieComponent,
      componentProps: {
        cssClass: 'my-custom-class',
        text1: 'Video Selfie',
        text2: 'Guatemala',
        overlaySrc: 'assets/overlay-image.png',
        backFunction: async (file: File) => {
          // console.log('Video recibido en el padre:', file);
          await this.getBackModal(file);
        },
      },
      backdropDismiss: false,
    });

    await modal.present();
  }
}
