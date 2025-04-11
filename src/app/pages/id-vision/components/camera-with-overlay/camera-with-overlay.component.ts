import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Camera } from '@capacitor/camera';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Capacitor } from '@capacitor/core';
import { ModalDpiServices } from '../../services/modal-services/modal-dpi-services';

@Component({
  selector: 'app-camera-overlay',
  templateUrl: './camera-with-overlay.component.html',
  styleUrls: ['./camera-with-overlay.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CameraWithOverlayComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  

  @Input() text1: string = '';
  @Input() text2: string = '';
  @Input() overlaySrc: string = '';
  @Input() onTakePicture!: (filePath: File) => Promise<boolean>;
  @Output() closeRequested = new EventEmitter<void>();

  capturedImage: SafeUrl | null = null;
  stream: MediaStream | null = null;

  private isAndroid: boolean;
  private isIOS: boolean;

  isLoading: boolean = true; // Variable para mostrar el loader

  file?: File;
  capturedImageUrl: string | null = null;

  // overlaySrc: String = '';

  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private sanitizer: DomSanitizer,
    private modaldpiServices: ModalDpiServices
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
    this.modaldpiServices.closeOverlay$.subscribe(() => {
      this.closeOverlay();
    });

    this.modaldpiServices.resumeCameraSubject$.subscribe(() => {
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
    }
  
    const canvas = document.createElement('canvas');
    const videoElement = this.videoElement.nativeElement;
  
    canvas.width = videoElement.videoWidth || 1920;
    canvas.height = videoElement.videoHeight || 1080;
  
    const context = canvas.getContext('2d');
    if (!context) {
      console.error('No se pudo obtener el contexto del canvas.');
      return;
    }
  
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  
    let quality = 0.98;
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    const minQuality = 0.4;
  
    const compressImage = (quality: number): Promise<Blob | null> => {
      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => resolve(blob),
          'image/jpeg',
          quality
        );
      });
    };
  
    let blob: Blob | null = await compressImage(quality);
  
    // Reducir calidad si excede tamaño
    while (blob && blob.size > maxSizeInBytes && quality > minQuality) {
      quality -= 0.05;
      blob = await compressImage(quality);
    }
  
    if (blob && blob.size <= maxSizeInBytes) {
      this.file = this.blobToFile(blob, 'dpi.jpeg');
      videoElement.pause();
      try {
        await this.onTakePicture(this.file);
      } catch (err) {
        console.error('Error en onTakePicture:', err);
      }
    } else {
      console.error('No se pudo reducir el tamaño de la imagen por debajo de 5MB.');
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
    this.modaldpiServices.requestCloseOverlay();
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