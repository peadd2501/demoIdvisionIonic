import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Camera } from '@capacitor/camera';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Capacitor } from '@capacitor/core';

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
  @Input() onTakePicture!: (filePath: File) => Promise<boolean>;

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
    private sanitizer: DomSanitizer
  ) {
    this.isAndroid = this.platform.is('android');
    this.isIOS = this.platform.is('ios');
  }

  async ngAfterViewInit() {
    if (this.isAndroid || this.isIOS) {
      await this.requestPermissions();
    }
    
    await this.initCamera();
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
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: this.platform.is('android') || this.platform.is('ios') ? 'environment' : 'user'
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
  
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
  
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      // Convierte el contenido del canvas a un Blob
      canvas.toBlob((blob) => {
        if (blob) {
          this.file = new File([blob], 'dpi.png', { type: 'image/png' });
          console.log('file', this.file);
          
          this.capturedImageUrl = URL.createObjectURL(this.file); // Crea una URL temporal

          
          // this.uploadPhoto(file); // Llama a una función para enviar el archivo
        }
      }, 'image/jpeg', 0.5);

      const resp = await this.onTakePicture(this.file!);
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
}
