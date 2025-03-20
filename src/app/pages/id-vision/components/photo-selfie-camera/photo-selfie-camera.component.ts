import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Camera } from '@capacitor/camera';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ModalVideoSelfieServices } from '../../services/modal-services/modal-video-selfie-services';
import { ScreenBrightness } from '@capacitor-community/screen-brightness';
import { ModalDpiServices } from '../../services/modal-services/modal-dpi-services';
import { Capacitor } from '@capacitor/core';
import { PhotoSelfieServices } from '../../services/modal-services/photo-selfie-services';

@Component({
  selector: 'app-photo-selfie-camera',
  templateUrl: './photo-selfie-camera.component.html',
  styleUrls: ['./photo-selfie-camera.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PhotoSelfieCameraComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  @Input() text1: string = '';
  @Input() text2: string = '';
  @Input() onTakePicture!: (filePath: File) => Promise<boolean>;
  @Output() closeRequested = new EventEmitter<void>();

  capturedImage: SafeUrl | null = null;
  stream: MediaStream | null = null;

  private isAndroid: boolean;
  private isIOS: boolean;

  isLoading: boolean = true;

  file?: File;
  capturedImageUrl: string | null = null;

  // overlaySrc: String = '';

  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private sanitizer: DomSanitizer,
    private modalDpiServices: ModalDpiServices
  ) {
    this.isAndroid = this.platform.is('android');
    this.isIOS = this.platform.is('ios');
  }

  async ngOnDestroy() {
    this.stopCamera();
  }

  async ngAfterViewInit() {
    if (this.isAndroid || this.isIOS) {
      await this.requestPermissions();
    }
    
    await this.initCamera();
    this.isLoading = false;
    this.modalDpiServices.closePhotoSelfieSubject$.subscribe(() => {
      this.closeOverlay();
    });

    this.modalDpiServices.resumeCameraSubject$.subscribe(() => {
      this.resumeCamera();
    });
  }

  async requestPermissions() {
    if(Capacitor.getPlatform() !== 'web') {
      if (this.isAndroid || this.isIOS) {
        const permissions = await Camera.requestPermissions();
        if (permissions.camera === 'denied') {
          console.error('Permiso de cámara denegado');
          return;
        }
      }
    }
  }

  async initCamera() {
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: 'environment'
        },
        audio: false
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);

      const videoElement = this.videoElement.nativeElement;
      videoElement.srcObject = this.stream;
      videoElement.autoplay = true;
      videoElement.playsInline = true;
      videoElement.muted = true;

      videoElement.onloadedmetadata = () => {
        videoElement.play().catch((error) => {
          console.error('Error al intentar reproducir el video:', error);
        });
      };
    } catch (error) {
      console.error('Error al inicializar la cámara:', error);
      this.isLoading = false;
    }
  }

  async capturePhoto() {
    if (!this.stream) {
      console.error('La cámara no está inicializada.');
      return;
    };
  
    const canvas = document.createElement('canvas');
    const videoElement = this.videoElement.nativeElement;
  
    canvas.width =videoElement.videoWidth || 1920;
    canvas.height = videoElement.videoHeight || 1080;
  

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      // Convierte el contenido del canvas a un Blob
      canvas.toBlob((blob) => {
        if (blob && blob.size > 0) {      

          this.file = this.blobToFile(blob, 'dpi.jpeg');
          videoElement.pause();
          this.onTakePicture(this.file).catch(
            (err) => console.error('Error en onTakePicture:', err)
          );
        } else {
          console.error('El Blob generado está vacío o no válido.');
        }
      }, 'image/jpeg', 0.75);

      
      //this.closeOverlay();
    }
  }

  blobToFile(blob: Blob, fileName: string): File { 
    const b: any = blob;
    b.lastModified = new Date().getTime();
    b.lastModifiedDate = new Date();
    b.name = fileName;
    //Cast to a File() type
    return <File>b;
  }
  
  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }
  
  closeOverlay() {
    this.stopCamera();
    this.modalController.dismiss();
  }

  public closeRequestedFunction() {
    this.closeOverlay();
    this.modalDpiServices.requestClosePhotoSelfieSubject();
  }

  resumeCamera() {
    const videoElement = this.videoElement?.nativeElement;
    if (videoElement && videoElement.paused) {
      videoElement.play().catch((error) => {
        console.error('Error al intentar reanudar el video:', error);
      });
    }
  }
}
