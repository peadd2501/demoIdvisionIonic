import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Camera } from '@capacitor/camera';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Capacitor } from '@capacitor/core';
import { ModalDpiServices } from '../../services/modal-services/modal-dpi-services';

@Component({
  selector: 'app-camera-overlay',
  templateUrl: './camera-with-overlay.component.html',
  styleUrls: ['./camera-with-overlay.component.scss'],
})
export class CameraWithOverlayComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  

  @Input() text1: string = '';
  @Input() text2: string = '';
  @Input() overlaySrc: string = '';
  @Input() onTakePicture!: (filePath: String) => Promise<boolean>;
  @Output() closeRequested = new EventEmitter<void>();

  capturedImage: SafeUrl | null = null;
  stream: MediaStream | null = null;

  private isAndroid: boolean;
  private isIOS: boolean;

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

  async ngAfterViewInit() {
    if (this.isAndroid || this.isIOS) {
      await this.requestPermissions();
    }
    
    await this.initCamera();

    this.modaldpiServices.closeOverlay$.subscribe(() => {
      this.closeOverlay();
    });
  }

  async requestPermissions() {
    if (this.isAndroid || this.isIOS) {
      const permissions = await Camera.requestPermissions();
      if (permissions.camera === 'denied') {
        console.error('Permiso de cámara denegado');
        return;
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
        }
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
      alert(error);
      console.error('Error al inicializar la cámara:', error);
    }
  }

  async capturePhoto() {
    if (!this.stream) return;
  
    const canvas = document.createElement('canvas');
    const videoElement = this.videoElement.nativeElement;
  
    canvas.width =videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
  
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      // Convierte el contenido del canvas a un Blob
      canvas.toBlob((blob) => {
        if (blob) {
          this.file = new File([blob], 'dpi.png', { type: 'image/png' });
         
          
          this.capturedImageUrl = URL.createObjectURL(this.file); // Crea una URL temporal
           this.onTakePicture(this.capturedImageUrl).then(() => {
            //this.closeOverlay();
           });
          
          // this.uploadPhoto(file); // Llama a una función para enviar el archivo
        }
      }, 'image/jpeg', 1);

      
      //this.closeOverlay();
    }
  }


  uploadPhoto(file: File) {
    // const formData = new FormData();
    // formData.append('file', file);
  
    // // Aquí realiza la solicitud HTTP para enviar el archivo
    // this.http.post('URL_DE_TU_SERVICIO', formData).subscribe(
    //   (response) => {
    //     console.log('Foto subida exitosamente:', response);
    //   },
    //   (error) => {
    //     console.error('Error al subir la foto:', error);
    //   }
    // );
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
    // this.closeRequested.emit();
  }

  functionToParent() {
    this.modalController.dismiss({
      executeFunction: this.closeOverlay
    })
  }
}

