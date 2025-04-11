import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AlertController,
  IonicModule,
  IonInput,
  LoadingController,
  ModalController,
  NavController,
  Platform,
} from '@ionic/angular';
// import { register, SwiperContainer } from 'swiper/element/bundle';
// import { Swiper, SwiperOptions } from 'swiper/types';
import { CameraWithOverlayComponent } from './components/camera-with-overlay/camera-with-overlay.component';
import { CamaraVideoSelfieComponent } from './components/camara-video-selfie/camara-video-selfie.component';
import { DpiService } from './services/dpi/dpi-service.service';
import { ModalDpiServices } from './services/modal-services/modal-dpi-services';
import { ModalVideoSelfieServices } from './services/modal-services/modal-video-selfie-services';
import { SdkCommunicationService } from './services/modal-services/sdk-communication-services';
import { ValidateMetaGService } from './services/validate-meta-g/validate-meta-g';
import {
  register,
  SwiperContainer,
  SwiperOptions,
} from './../../../swiper-wrapper';
import { PhotoSelfieCameraComponent } from './components/photo-selfie-camera/photo-selfie-camera.component';
import { PhotoSelfieServices } from './services/modal-services/photo-selfie-services';
import { CamaraAcuerdoVideoComponent } from './components/camara-acuerdo-video/camara-acuerdo.video.component';
import { SimpleAcuerdoVideoComponent } from './components/simple-acuerdo-video/simple-acuerdo-video.component';
import { MessageModalComponent } from './components/message-modal/message-modal.component';
import { App } from '@capacitor/app';
register();

@Component({
  selector: 'app-id-vision',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule],
  providers: [DpiService],

  // providers: [DpiService, ModalDpiServices, ModalVideoSelfieServices],
  templateUrl: './id-vision.component.html',
  styleUrls: ['./id-vision.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class IdVisionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dpi', { static: false }) dpi!: IonInput;
  private isAndroid: boolean;
  private isIOS: boolean;
  tutoImage1: string = 'assets/imagesIdvision/documentsImage.png';
  tutoImage2: string = 'assets/imagesIdvision/documentsImage.png';
  tutoImage3: string = 'assets/imagesIdvision/56.png';
  tutoImage4: string = 'assets/imagesIdvision/57.png';



  constructor(
    private modalController: ModalController,
    private dpiService: DpiService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private platform: Platform,
    private modalDpiServices: ModalDpiServices,
    private modalVideoSelfieServices: ModalVideoSelfieServices,
    private sdkCommunicationService: SdkCommunicationService,
    private navController: NavController,
    private validateMetaGService: ValidateMetaGService,
    private cdRef: ChangeDetectorRef,
    private photoSelfieServices: PhotoSelfieServices
  ) {
    this.isAndroid = this.platform.is('android');
    this.isIOS = this.platform.is('ios');
    this.validateMetaG = {
      acuerdoVideo: false,
      dpiFront: false,
      dpiBack: false,
      videoSelfie: false,
      photoSelfie: false
    }
  }

  swiperElement = signal<SwiperContainer | null>(null);
  private modalRef: HTMLIonModalElement | null = null;

  @Input() isSwipe: boolean = false;
  @Input() dpiCode: string = '';
  @Input() connection: string = '';
  @Input() apikey: string = '';
  @Input() validationConfig: any[] = [];
  versionSDK: string = '';

  validateMetaG: {
    acuerdoVideo: boolean;
    dpiFront: boolean;
    dpiBack: boolean;
    videoSelfie: boolean;
    photoSelfie: boolean;
  };
  swiperRef: any;

  simpleProcess: boolean = false;

  // Booleans para habilitar cada step
  showAcuerdoVideo: boolean = false;
  showDpiFront: boolean = false;
  showDpiBack: boolean = false;
  showVideoSelfie: boolean = false;
  showPhotoSelfie: boolean = false;
  isValid = false;



  async loadMockValidationConfig() {

    let loader: HTMLIonLoadingElement | null = null;

    try {
      loader = await this.loadingController.create({
        message: 'Procesando...',
        spinner: 'crescent',
      });

      await loader.present();

      this.dpiService.getConnectionById(this.connection).subscribe({
        next: (connection: any) => {


          // console.log(connection.details);
          if (connection?.details?.config && Array.isArray(connection.details.config)) {

            let configData = connection.details.config
              .map((config: { id: number, type: number, order: string }) => ({
                id: config.id,
                type: config.type,
                order: Number(config.order),
                action: this.getStepAction(config.type)
              }));

            // 🔥 Si `simpleProcess` es true, solo incluimos el paso de Acuerdo de Video (type: 1)
            if (this.simpleProcess) {
              // console.log("🔄 Modo simpleProcess activado, solo Acuerdo de Video.");
              configData = configData.filter((config: { type: number; }) => config.type === 1);
              if (loader) {
                loader.dismiss();
              }
              this.InitProccess();
            }

            if (loader) {
              loader.dismiss();
            }

            // 🔥 Ordenamos la configuración filtrada
            this.validationConfig = configData.sort((a: { order: number; }, b: { order: number; }) => a.order - b.order);

            // console.log("Configuración ordenada y lista:", this.validationConfig);
            this.setValidationConfig();
          } else {
            console.warn("La configuración obtenida no es válida:", connection);
          }
        },
        error: (err) => {
          console.error("Error al obtener la conexión:", err);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  getStepAction(type: number): () => void {
    switch (type) {
      case 1: return () => this.openSimpleAcuerdo(); //this.openAcuerdoVideo
      case 2: return () => this.openCameraOverlayFrontal();
      case 3: return () => this.openCameraOverlayTrasero();
      case 4: return () => this.openVideoSelfie();
      case 5: return () => this.openPhotoSelfie();
      case 6: return () => this.openAcuerdoVideo(); //Provisional para pruebas
      default: return () => console.warn('Tipo de paso desconocido:', type);
    }
  }




  setValidationConfig() {
    // 🔥 Depuración en consola

    // console.log("Ejecutando setValidationConfig con:", this.validationConfig);

    this.validationConfig.forEach(config => {
      switch (config.type) {
        case 1:
          this.showAcuerdoVideo = true;
          break;
        case 2:
          this.showDpiFront = true;
          break;
        case 3:
          this.showDpiBack = true;
          break;
        case 4:
          this.showVideoSelfie = true;
          break;
        case 5:
          this.showPhotoSelfie = true;
      }
    });

    // console.log("Valores actualizados:", {
    //   showAcuerdoVideo: this.showAcuerdoVideo,
    //   showDpiFront: this.showDpiFront,
    //   showDpiBack: this.showDpiBack,
    //   showVideoSelfie: this.showVideoSelfie,
    //   showPhotoSelfie: this.showPhotoSelfie
    // });

    // 🔥 Forzar la detección de cambios para actualizar la UI
    this.cdRef.detectChanges();
  }

  async ngOnInit() {
    await this.loadMockValidationConfig();

    if (this.isAndroid || this.isIOS) {
      const info = await App.getInfo();
      this.versionSDK = info.version;
    } else {
      this.versionSDK = 'web'
    }


    this.modalDpiServices.closeOverlay$.subscribe(() => {
      this.closeOverlay();
    });

    this.modalDpiServices.closeModalAndChangeBrightness$.subscribe(() => {
      this.closeModalOverlay();
    });

    this.modalDpiServices.closePhotoSelfieSubject$.subscribe(() => {
      this.closePhotoSelfie();
    });

    this.modalDpiServices.closePhotoSelfieSubject$.subscribe(() => {
      this.closeModalAcuerdoVideo();
    });



    // Selecciona el elemento de video
    const video: HTMLVideoElement | null = document.getElementById(
      'dpiFront'
    ) as HTMLVideoElement;
    const video2: HTMLVideoElement | null = document.getElementById(
      'dpiBack'
    ) as HTMLVideoElement;

    if (video) {
      // Asegúrate de que el video está en loop manualmente
      video.addEventListener('ended', () => {
        video.currentTime = 0; // Reinicia el video al principio
        video.play(); // Lo reproduce nuevamente
      });
      // Forzar autoplay y mute por si no lo toma automáticamente
      video.muted = true; // Obligatorio para autoplay en iOS
      video
        .play()
        .catch((err) => console.error('Error al reproducir el video:', err));
    } else {
      console.error("No se encontró el elemento de video con ID 'dpiFront'.");
    }

    if (video2) {
      video2.addEventListener('ended', () => {
        video2.currentTime = 0; // Reinicia el video al principio
        video2.play(); // Lo reproduce nuevamente
      });
      video2.muted = true;
      video2
        .play()
        .catch((err) => console.error('Error al reproducir el video2:', err));
    } else {
      console.error("No se encontró el elemento de video con ID 'dpiBack'.");
    }
  }

  ngAfterViewInit() {

    setTimeout(() => {
      const swiperElement = document.querySelector('.custom-swiper') as SwiperContainer;

      if (swiperElement) {
        const swiperOptions: SwiperOptions = {
          slidesPerView: 1,
          pagination: false,
          navigation: {
            enabled: false,
          },
          allowTouchMove: this.isSwipe,
        };
        try {
          Object.assign(swiperElement, swiperOptions);
          this.swiperRef = swiperElement;
          this.swiperElement.set(swiperElement as SwiperContainer);
          this.swiperElement()?.initialize();
        } catch (error) {
          console.warn('Error al inicializar swiper: ', error);
        }
      } else {
        console.error('El elemento <swiper-container> no está disponible.');
      }
    }, 100);


    if (this.dpi) {
      this.dpi.value = this.dpiCode ?? '';
    } else {
      console.error('IonInput no está disponible en ngAfterViewInit');
    }
  }

  ngOnDestroy(): void {
    // this.swiperRef = null;

    if (this.swiperRef) {
      // this.swiperRef.destroy(true, true);
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

  // handleExit(): void {
  //   const result =
  //     this.validateMetaG.dpiBack &&
  //     this.validateMetaG.dpiFront &&
  //     this.validateMetaG.videoSelfie;
  //   this.sdkCommunicationService.emitExit(result);
  //   this.navController.back();
  // }


  // handleExit(): void {
  //   const result =
  //     (!this.showDpiFront || this.validateMetaG.dpiFront) &&
  //     (!this.showDpiBack || this.validateMetaG.dpiBack) &&
  //     (!this.showVideoSelfie || this.validateMetaG.videoSelfie);

  //   this.sdkCommunicationService.emitExit(result);
  //   this.navController.back();
  // }
  handleExit(): void {
    this.updateValidation();
    const result = this.isAllValid(); // Usamos la validación corregida

    // console.log("🚀 Resultado final de validación en handleExit:", result);

    this.sdkCommunicationService.emitExit(result);
    this.navController.back();
  }





  // isAllValid(): boolean {
  //   let isValid =
  //     this.validateMetaG.dpiFront &&
  //     this.validateMetaG.dpiBack &&
  //     this.validateMetaG.videoSelfie;
  //   this.validateMetaGService.setValidateMetaG(isValid);
  //   return isValid;
  // }

  isAllValid(): boolean {
    // console.log('🔎 Verificando estado de los pasos:');
    // console.log('showAcuerdoVideo:', this.showAcuerdoVideo, '| Validado:', this.validateMetaG.dpiFront);
    // console.log('showDpiFront:', this.showDpiFront, '| Validado:', this.validateMetaG.dpiFront);
    // console.log('showDpiBack:', this.showDpiBack, '| Validado:', this.validateMetaG.dpiBack);
    // console.log('showVideoSelfie:', this.showVideoSelfie, '| Validado:', this.validateMetaG.videoSelfie);
    // console.log('showPhotoSelfie:', this.showPhotoSelfie, '| Validado:', this.validateMetaG.photoSelfie);

    // Si NO hay pasos activados, devolvemos `false`
    if (!this.showAcuerdoVideo && !this.showDpiFront && !this.showDpiBack && !this.showVideoSelfie && !this.showPhotoSelfie) {
      console.log('⚠️ No hay pasos activos, devolviendo `false`.');
      return false;
    }

    let isValid = true;

    // Evaluamos cada paso ACTIVADO y verificamos si fue completado
    if (this.showAcuerdoVideo && !this.validateMetaG.acuerdoVideo) {
      isValid = false;
      console.log('Acuerdo de video NO completado.');
    }
    if (this.showDpiFront && !this.validateMetaG.dpiFront) {
      isValid = false;
      console.log('DPI Frontal NO completado.');
    }
    if (this.showDpiBack && !this.validateMetaG.dpiBack) {
      isValid = false;
      console.log('DPI Trasero NO completado.');
    }
    if (this.showVideoSelfie && !this.validateMetaG.videoSelfie) {
      isValid = false;
      console.log('Video Selfie NO completado.');
    }
    if (this.showPhotoSelfie && !this.validateMetaG.photoSelfie) {
      isValid = false;
      console.log('Photo selfie NO completado');
    }

    console.log('Resultado final de validación:', isValid);
    return isValid;
  }


  updateValidation() {
    // console.log('🔄 Actualizando validación...');

    // console.log('Estado ANTES de validar:');
    // console.log('showAcuerdoVideo:', this.showAcuerdoVideo, '| Validado:', this.validateMetaG.acuerdoVideo);
    // console.log('showDpiFront:', this.showDpiFront, '| Validado:', this.validateMetaG.dpiFront);
    // console.log('showDpiBack:', this.showDpiBack, '| Validado:', this.validateMetaG.dpiBack);
    // console.log('showVideoSelfie:', this.showVideoSelfie, '| Validado:', this.validateMetaG.videoSelfie);
    // console.log('showPhotoSelfie:', this.showPhotoSelfie, '| Validado:', this.validateMetaG.photoSelfie);

    // Validamos los pasos visibles
    const acuerdoVideo = this.showAcuerdoVideo ? this.validateMetaG.acuerdoVideo : true;
    const dpiFrontValid = this.showDpiFront ? this.validateMetaG.dpiFront : true;
    const dpiBackValid = this.showDpiBack ? this.validateMetaG.dpiBack : true;
    const videoSelfieValid = this.showVideoSelfie ? this.validateMetaG.videoSelfie : true;
    const photoSelfieValid = this.showPhotoSelfie ? this.validateMetaG.photoSelfie : true;

    this.isValid = acuerdoVideo && dpiFrontValid && dpiBackValid && videoSelfieValid && photoSelfieValid;

    // console.log('🚀 Estado FINAL de validación:', this.isValid);

    // 🔥 Forzamos la actualización de la UI
    this.cdRef.detectChanges();
  }




  handleSkipTutorial() {
    this.swiperElement()?.swiper?.slideTo(5);
  }

  handleNext() {
    setTimeout(() => {
      if (this.swiperElement()?.swiper) {
        this.swiperElement()?.swiper?.slideNext();
        // this.swiperElement()?.swiper.slideTo(slide);
      }
    }, 300);
  }

  moveToNextStep(currentType: number) {
    // console.log(`Buscando el siguiente paso después de Type ${currentType}`);

    const currentIndex = this.validationConfig.findIndex(step => step.type === currentType);

    if (currentIndex === -1) {
      console.warn('No se encontró el paso actual en validationConfig.');
      return;
    }

    const nextStep = this.validationConfig[currentIndex + 1];

    if (nextStep) {
      // console.log(`Moviendo al siguiente paso: Type ${nextStep.type}, Order ${nextStep.order}`);
      this.handleSlide(nextStep.order);
    } else {
      // console.log('No hay más pasos, proceso finalizado.');
      this.handleSlide(this.validationConfig.length + 1);
    }
  }

  async InitProccess() {


    let loader: HTMLIonLoadingElement | null = null;
    try {
      loader = await this.loadingController.create({
        message: 'Procesando...',
        spinner: 'crescent',
      });

      await loader.present();

      this.dpiService
        .InitProccess(this.dpiCode + '', this.connection, this.apikey, this.versionSDK)// '673259d3f027711b51e71202')
        .subscribe({
          next: (response: any) => {
            if (loader) {
              loader.dismiss();
            }
            if (!response['error']) {
              localStorage.setItem('codigo', response['details']);
              const isCompleted = response['completed'];

              if (isCompleted) {
                // console.log("Paso aca en el if")

                this.validateMetaG.acuerdoVideo = true;
                this.validateMetaG.dpiFront = true;
                this.validateMetaG.dpiBack = true;
                this.validateMetaG.videoSelfie = true;
                this.validateMetaG.photoSelfie = true;
                this.updateValidation();

                this.handleSlide(this.validationConfig.length + 1);
              } else {
                if (!this.simpleProcess) {
                  // console.log("Paso aca en el else")
                  this.handleSlide(1);
                } else {
                  this.openSimpleAcuerdo();
                  // this.openAcuerdoVideo();
                  // console.log("Simple process activado...")
                }
              }
            } else {
              if (this.dpi.value == null) {
                this.showAlert('Error', 'El campo DPI no puede estar vacío', [], () => {
                  this.handleExit();
                });
              }
              const dpiValue = this.dpi.value as string ?? '';
              if (!dpiValue || dpiValue.trim().length === 0) {
                this.showAlert(
                  'Error',
                  'El campo DPI no puede estar vacío',
                  []
                );
              } else if (dpiValue && dpiValue.length > 12) {
                this.showAlert('Error', response['message'], []);
              } else {
                const errorMessage = response['message'];
                this.showAlert('Error', errorMessage, []);
              }
            }
          },
          error: (error) => {
            console.error('Error al llamar al servicio:', error);
          },
        });
    } catch (error) {
      console.log(error);
    }
  }

  async DpiFrontProccess(filePath: File) {

    if (!filePath || filePath.size === 0) {
      console.error('El archivo proporcionado no es válido:', filePath);
      return;
    }

    let loader: HTMLIonLoadingElement | null = null;

    try {

      // Muestra el loader
      loader = await this.loadingController.create({
        message: 'Procesando...',
        spinner: 'crescent',
      });

      await loader.present();
      const codigo = localStorage.getItem('codigo') ?? '';
      await this.dpiService.uploadFrontDPI(filePath/*file*/, codigo, this.connection, this.apikey).subscribe({
        next: async (response: any) => {
          if (loader) {
            loader.dismiss();
          }
          if (!response['error']) {
            // this.showAlert('Éxito', 'DPI registrado correctamente', [], () => {
            //   this.closeModalFromParent();
            //   this.modalController.dismiss();
            //   this.validateMetaG.dpiFront = true;
            //   this.updateValidation();
            //   // this.handleSlide(2);
            //   // this.handleNext();
            //   this.moveToNextStep(2);
            // });


            const modal = await this.modalController.create({
              component: MessageModalComponent,
              componentProps: {
                title: 'Éxito',
                message: 'DPI registrado correctamente',
                variant: 'dpi'
              },
              backdropDismiss: false
            });
            await modal.present();

            modal.onDidDismiss().then(() => {
              this.closeModalFromParent();
              this.modalController.dismiss();
              this.validateMetaG.dpiFront = true;
              this.updateValidation();
              this.moveToNextStep(2);
            });
          } else {
            const modal = await this.modalController.create({
              component: MessageModalComponent,
              componentProps: {
                title: response['mensage'],
                errors: response['details'],
                variant: 'dpi'
              },
              backdropDismiss: false
            });
            await modal.present();
            modal.onDidDismiss().then(() => {
              this.resumeCameraFromParent();
            });


            // this.showAlert(response['mensage'], '', response['details'], () => {
            //   this.resumeCameraFromParent();
            // });

            this.validateMetaG.dpiFront = false;
            this.updateValidation();
          }
        },
        error: async (error) => {
          const modal = await this.modalController.create({
            component: MessageModalComponent,
            componentProps: {
              title: 'Error',
              errors: error || [],
              variant: 'dpi'
            },
            backdropDismiss: false
          });
          await modal.present();
          modal.onDidDismiss().then(() => {
            this.resumeCameraFromParent();
          });

          this.validateMetaG.dpiFront = false;
          this.updateValidation();

          // this.showAlert('Error', '', error, () => {
          //   this.resumeCameraFromParent();
          // });

          // this.validateMetaG.dpiFront = false;
          // this.updateValidation();
          if (loader) {
            loader.dismiss();
          }
          console.error('Error al llamar al servicio:', error);
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  closeModalFromParent() {
    // Emite el evento para cerrar la modal
    this.modalDpiServices.requestCloseOverlay();
  }
  closeModalVideoSelfie() {
    // this.modalVideoSelfieServices.requestCloseOverlayModal();

    this.modalDpiServices.requestCloseModalAndBrightness();
  }

  closeModalAcuerdoVideo() {
    // this.modalVideoSelfieServices.requestCloseOverlayModal();

    this.modalDpiServices.requestCloseModalAcuerdoVideo();
  }

  resumePhotoFromParent() {
    this.modalDpiServices.requestResumePhotoSubject();
  }

  resumeCameraFromParent() {
    this.modalDpiServices.requestResumeCamera();
  }

  closePhotoSelfieFromParent() {
    // this.modalVideoSelfieServices.requestCloseOverlayModal();

    this.modalDpiServices.requestClosePhotoSelfieSubject();
  }

  async convertImagePathToFile(
    imagePath: string,
    fileName: string
  ): Promise<File> {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  }

  async DpiBackProccess(filePath: File) {
    let loader: HTMLIonLoadingElement | null = null;

    try {
      // Muestra el loader
      loader = await this.loadingController.create({
        message: 'Procesando...',
        spinner: 'crescent',
      });

      await loader.present();
      const codigo = localStorage.getItem('codigo') ?? '';
      this.dpiService.uploadBackDPI(filePath/*file*/, codigo, this.connection, this.apikey).subscribe({
        next: async (response: any) => {
          if (loader) {
            loader.dismiss();
          }
          if (!response['error']) {
            // this.showAlert('Éxito', 'DPI registrado correctamente', [], () => {
            //   this.closeModalFromParent();
            //   this.modalController.dismiss();
            //   this.validateMetaG.dpiBack = true;
            //   this.updateValidation();
            //   this.moveToNextStep(3);
            // });
            const modal = await this.modalController.create({
              component: MessageModalComponent,
              componentProps: {
                title: 'Éxito',
                message: 'DPI registrado correctamente',
                variant: 'dpi'
              },
              backdropDismiss: false
            });
            await modal.present();

            modal.onDidDismiss().then(() => {
              this.closeModalFromParent();
              this.modalController.dismiss();
              this.validateMetaG.dpiBack = true;
              this.updateValidation();
              this.moveToNextStep(3);
            });
          } else {
            // this.showAlert(response['mensage'], '', response['details'], () => {
            //   this.resumeCameraFromParent();
            // });
            // this.validateMetaG.dpiBack = false;
            // this.updateValidation();

            const modal = await this.modalController.create({
              component: MessageModalComponent,
              componentProps: {
                title: response['mensage'],
                errors: response['details'],
                variant: 'dpi'
              },
              backdropDismiss: false
            });
            await modal.present();

            modal.onDidDismiss().then(() => {
              this.resumeCameraFromParent();
              // this.modalController.dismiss();
              this.validateMetaG.dpiBack = false;
              this.updateValidation();
            });
          }
        },
        error: async (error) => {
          const modal = await this.modalController.create({
            component: MessageModalComponent,
            componentProps: {
              title: error['mensage'],
              message: error['details'],
              variant: 'dpi'
            },
            backdropDismiss: false
          });
          await modal.present();

          modal.onDidDismiss().then(() => {
            this.resumeCameraFromParent();
            this.validateMetaG.dpiBack = false;
            this.updateValidation();
            console.error('Error al llamar al servicio:', error);
          });

          if (loader) {
            loader.dismiss();
          }
          // this.showAlert('Error', '', error, () => {
          //   this.resumeCameraFromParent();
          // });

          // if (loader) {
          //   loader.dismiss();
          // }
          // this.validateMetaG.dpiBack = false;
          // this.updateValidation();
          // console.error('Error al llamar al servicio:', error);
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async VideoSelfieProcccess(file: File) {
    let loader: HTMLIonLoadingElement | null = null;
    try {
      loader = await this.loadingController.create({
        message: 'Procesando...',
        spinner: 'crescent',
      });
      await loader.present();
      const codigo = localStorage.getItem('codigo') ?? '';
      this.dpiService.videoSelfie(file, codigo, this.connection, this.apikey).subscribe({
        next: async (response: any) => {
          if (loader) {
            loader.dismiss();
          }
          if (!response['error']) {
            // this.showAlert('Éxito', response['message'], [], () => {
            //   this.closeModalVideoSelfie();
            //   this.modalController.dismiss();
            //   this.validateMetaG.videoSelfie = true;
            //   this.updateValidation();
            //   this.moveToNextStep(4);

            // });

            const modal = await this.modalController.create({
              component: MessageModalComponent,
              componentProps: {
                title: 'Éxito',
                message: response['message'],
                variant: 'video'
              },
              backdropDismiss: false
            });
            await modal.present();

            modal.onDidDismiss().then(() => {
              this.closeModalVideoSelfie();
              this.modalController.dismiss();
              this.validateMetaG.videoSelfie = true;
              this.updateValidation();
              this.moveToNextStep(4);
            });
          } else {

            const modal = await this.modalController.create({
              component: MessageModalComponent,
              componentProps: {
                title: 'Error',
                errors: response['message'],
                variant: 'video'
              },
              backdropDismiss: false
            });
            await modal.present();

            modal.onDidDismiss().then(() => {
              this.closeModalVideoSelfie();
              // this.modalController.dismiss();
              this.validateMetaG.videoSelfie = false;
              this.updateValidation();
            });


            // this.showAlert('Error', response['message'], [], () => {
            //   this.closeModalVideoSelfie();
            // });
            // this.validateMetaG.videoSelfie = false;
            // this.updateValidation();
          }
        },
        error: async (error) => {
          const modal = await this.modalController.create({
            component: MessageModalComponent,
            componentProps: {
              title: 'Error',
              errors: error['message'],
              variant: 'video'
            },
            backdropDismiss: false
          });
          await modal.present();

          modal.onDidDismiss().then(() => {
            this.resumeCameraFromParent();
            // this.modalController.dismiss();
          });

          // this.showAlert('Error', '', error, () => {
          //   this.resumeCameraFromParent();
          // });

          console.error('Error al llamar al servicio:', error);
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async validateDPIFront(filePath: File): Promise<boolean> {
    await this.DpiFrontProccess(filePath);
    return true;
  }

  private async showAlert(
    header: string,
    message: string,
    details?: string[],
    onConfirm?: () => void,
    subMessage?: string
  ) {
    const detailsMessage = Array.isArray(details)
      ? details.map((detail) => `${detail}           `).join('')
      : '';
    const fullMessage = message + (detailsMessage ? `${detailsMessage}` : '');

    const alert = await this.alertController.create({
      backdropDismiss: false,
      header,
      message: fullMessage,
      buttons: [
        {
          text: 'Continuar',
          handler: () => {
            if (onConfirm) {
              onConfirm();
            }
          },
          cssClass: 'boton-personalizado'
        },
      ],
    });
    await alert.present();
  }

  async openCameraOverlayFrontal() {
    this.modalRef = await this.modalController.create({
      component: CameraWithOverlayComponent,
      componentProps: {
        text1: 'Coloca la parte frontal de tu DPI',
        text2: '',
        overlaySrc: 'assets/imagesIdvision/overlay_container.png',
        onTakePicture: this.DpiFrontProccess.bind(this),
        closeRequested: () => this.closeOverlay(),
      },
      backdropDismiss: false,
    });

    await this.modalRef.present();
  }

  async closeOverlay() {
    // console.log('Modal cerrada desde el componente padre');
  }

  async closeModalOverlay() {
    // console.log('test videoselfie');
  }

  async closePhotoSelfie() {
    // console.log('test videoselfie');
  }

  //Trasero dpi services
  async validateDPIBack(filePath: File): Promise<boolean> {
    this.modalController.dismiss();
    await this.DpiBackProccess(filePath);
    return true;
  }

  async openCameraOverlayTrasero() {
    const modal = await this.modalController.create({
      component: CameraWithOverlayComponent,
      componentProps: {
        text1: 'Coloca el reverso de tu DPI',
        text2: '',
        overlaySrc: 'assets/imagesIdvision/overlay_container.png',
        onTakePicture: this.DpiBackProccess.bind(this),
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
      return;
    }
    await this.VideoSelfieProcccess(file);
  }

  async photoVideoSelfieFile(filePath: File) {
    if (!filePath || filePath.size === 0) {
      return;
    }

    let loader: HTMLIonLoadingElement | null = null;

    try {
      loader = await this.loadingController.create({
        message: 'Procesando...',
        spinner: 'crescent',
      });

      await loader.present();
      const codigo = localStorage.getItem('codigo') ?? '';

      this.dpiService.photoSelfie(filePath, codigo, this.connection, this.apikey).subscribe({
        next: async (response: any) => {
          if (loader) {
            loader.dismiss();
          }

          if (!response['error']) {

            const modal = await this.modalController.create({
              component: MessageModalComponent,
              componentProps: {
                title: 'Éxito',
                message: 'Foto Selfie registrada correctamente',
                variant: 'video'
              },
              backdropDismiss: false
            });
            await modal.present();

            modal.onDidDismiss().then(() => {
              this.closePhotoSelfieFromParent();
              this.modalController.dismiss();

              this.validateMetaG.photoSelfie = true;
              this.updateValidation();

              this.moveToNextStep(5);
            });

            // this.showAlert('Éxito', 'Foto Selfie registrada correctamente', [], () => {
            //   // this.closeModalFromParent();
            //   this.closePhotoSelfieFromParent();
            //   this.modalController.dismiss();

            //   this.validateMetaG.photoSelfie = true;
            //   this.updateValidation();

            //   this.moveToNextStep(5);
            // });
          } else {

            const modal = await this.modalController.create({
              component: MessageModalComponent,
              componentProps: {
                title: 'Error',
                errors: response['message'],
                variant: 'video'
              },
              backdropDismiss: false
            });
            await modal.present();

            modal.onDidDismiss().then(() => {
              this.resumePhotoFromParent();
              // this.modalController.dismiss();

              this.validateMetaG.photoSelfie = false;
              this.updateValidation();
            });

            // this.showAlert('Error', response['message'], [], () => {
            //   this.resumePhotoFromParent();
            // });
            // this.validateMetaG.photoSelfie = false;
            // this.updateValidation();
          }
        },
        error: async (error: any) => {

          const modal = await this.modalController.create({
            component: MessageModalComponent,
            componentProps: {
              title: 'Error',
              errors: error,
              variant: 'video'
            },
            backdropDismiss: false
          });
          await modal.present();

          modal.onDidDismiss().then(() => {
            this.resumePhotoFromParent();
            // this.modalController.dismiss();
          });


          // this.showAlert('Error', '', error, () => {
          //   this.resumePhotoFromParent();
          // });

          if (loader) {
            loader.dismiss();
          }

          console.error('Error al llamar al servicio:', error);
        },
      });
    } catch (error: any) {

      const modal = await this.modalController.create({
        component: MessageModalComponent,
        componentProps: {
          title: 'Error',
          errors: error,
          variant: 'video'
        },
        backdropDismiss: false
      });
      await modal.present();

      modal.onDidDismiss().then(() => {
        this.resumePhotoFromParent();
        this.modalController.dismiss();
      });

      // this.showAlert('Error', '', error, () => {
      //   this.resumePhotoFromParent();
      // });

      if (loader) {
        loader.dismiss();
      }

      console.error("Error en el servicio: ", error);
    }
    // await this.VideoSelfieProcccess(file);
  }


  async getAcuerdoVideo(file: File) {
    if (!file || file.size === 0) {
      return;
    }
    let loader: HTMLIonLoadingElement | null = null;
    try {
      loader = await this.loadingController.create({
        message: 'Procesando...',
        spinner: 'crescent',
      });
      await loader.present();
      const codigo = localStorage.getItem('codigo') ?? '';
      this.dpiService.acuerdoVideo(file, codigo).subscribe({
        next: async (response: any) => {

          if (loader) {
            loader.dismiss();
          }
          if (!response['error']) {
            // this.showAlert('Éxito', response['message'], [], () => {
            //   this.closeModalAcuerdoVideo();
            //   this.modalController.dismiss();
            //   this.validateMetaG.acuerdoVideo = true;
            //   this.updateValidation();
            //   // this.handleSlide(4);
            //   // this.handleNext();
            //   this.moveToNextStep(1);
            // });
            const modal = await this.modalController.create({
              component: MessageModalComponent,
              componentProps: {
                title: 'Éxito',
                message: response['message'],
                variant: 'video'
              },
              backdropDismiss: false
            });
            await modal.present();

            modal.onDidDismiss().then(() => {
              this.closeModalAcuerdoVideo();
              this.modalController.dismiss();
              this.validateMetaG.acuerdoVideo = true;
              this.updateValidation();
              this.moveToNextStep(1);
            });
          } else {
            // this.showAlert('Error', response['message'], [], () => {
            //   // this.closeModalAcuerdoVideo();
            // });
            // this.validateMetaG.acuerdoVideo = false;
            // this.updateValidation();

            const modal = await this.modalController.create({
              component: MessageModalComponent,
              componentProps: {
                title: 'Error',
                errors: response['message'],
                variant: 'video'
              },
              backdropDismiss: false
            });
            await modal.present();

            modal.onDidDismiss().then(() => {
              // this.modalController.dismiss();
              this.validateMetaG.acuerdoVideo = false;
              this.updateValidation();
            });
          }
        },
        error: async (error) => {
          if (loader) {
            loader.dismiss();
          }

          const modal = await this.modalController.create({
            component: MessageModalComponent,
            componentProps: {
              title: 'Error',
              errors: error['message'],
              variant: 'video'
            },
            backdropDismiss: false
          });
          await modal.present();

          modal.onDidDismiss().then(() => {
            // this.modalController.dismiss();
            //   this.validateMetaG.acuerdoVideo = false;
            // this.updateValidation();
          });

          // this.showAlert('Error', '', error, () => {
          //   // this.resumeCameraFromParent();
          // });

          console.error('Error al llamar al servicio:', error);
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async openAcuerdoVideo() {
    const modal = await this.modalController.create({
      component: CamaraAcuerdoVideoComponent,
      componentProps: {
        //   cssClass: 'my-custom-class',
        //   text1: 'Video Selfie',
        //   text2: 'Guatemala',
        //   overlaySrc: 'assets/overlay-image.png',
        backFunction: async (file: File) => {
          await this.getAcuerdoVideo(file);
        },
        // closeRequested: () => this.closeModalOverlay(),
      },
      backdropDismiss: false,
    });

    await modal.present();
  }


  async openVideoSelfie() {
    const modal = await this.modalController.create({
      component: CamaraVideoSelfieComponent,
      componentProps: {
        cssClass: 'my-custom-class',
        text1: 'Video Selfie',
        text2: 'Guatemala',
        overlaySrc: 'assets/overlay-image.png',
        backFunction: async (file: File) => {
          await this.getBackModal(file);
        },
        closeRequested: () => this.closeModalOverlay(),
      },
      backdropDismiss: false,
    });

    await modal.present();
  }

  async openPhotoSelfie() {
    const modal = await this.modalController.create({
      component: PhotoSelfieCameraComponent,
      componentProps: {
        cssClass: 'my-custom-class',
        text1: 'Foto Selfie',
        text2: 'Guatemala',
        overlaySrc: 'assets/overlay-image.png',
        onTakePicture: async (file: File) => {
          await this.photoVideoSelfieFile(file);
        },
        closeRequested: () => this.closeModalOverlay(),
      },
      backdropDismiss: false,
    });

    await modal.present();
  }

  async openSimpleAcuerdo() {
    const modal = await this.modalController.create({
      component: SimpleAcuerdoVideoComponent,
      componentProps: {
        cssClass: 'my-custom-class',
        backFunction: async (file: File) => {
          await this.getAcuerdoVideo(file);
        },
        closeRequested: () => this.closeModalOverlay(),
      },
      backdropDismiss: false,
    });

    await modal.present();
  }

  copyProccess() {
    const codigo = localStorage.getItem('codigo') ?? '';
  }
}
