import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-camera-overlay',
  templateUrl: './camera-with-overlay.component.html',
  styleUrls: ['./camera-with-overlay.component.scss'],
})
export class CameraWithOverlayComponent implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('overlayImage') overlayImage!: ElementRef<HTMLImageElement>;
  text1 = 'Texto superior';
  text2 = 'Texto inferior';
  overlaySrc = 'assets/overlay-image.png';
  capturedImage: SafeUrl | null = null;
  stream: MediaStream | null = null;


  public isCameraEnabled = false;

  private isMovil = true; // Ajusta esta variable según tu lógica de plataforma
  @ViewChild('captureElement') captureElement!: ElementRef<HTMLVideoElement>;



  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit () {
    const isNative = Capacitor.isNativePlatform();
    //if (isNative) {
    //await this.requestCameraPermission();
    //  await this.startCamera();
    //} else {
      await this.initCamera();
    //}
  }

  // Método para abrir la cámara
  async startCamera() {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl, // Devuelve la foto como base64
        source: CameraSource.Camera, // Abre la cámara en lugar de seleccionar de archivos

        
      });

      var imageUrl = photo.webPath;

      // Can be set to the src of an image now
      //imageElement.src = imageUrl;
      
      // Sanitiza la imagen capturada para mostrarla en la vista
      this.capturedImage = this.sanitizer.bypassSecurityTrustUrl(photo.dataUrl!);
    } catch (error) {
      console.error("Error al abrir la cámara:", error);
      this.closeOverlay();
    }
  }

  async requestCameraPermission() {
    const permission = await Camera.requestPermissions({ permissions: ['camera'] });
    if (permission.camera !== 'granted') {
      console.warn("Permiso de cámara no concedido");
      this.closeOverlay();
    }
  }

  async startWebCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.nativeElement.srcObject = this.stream;
      this.videoElement.nativeElement.play();
    } catch (error) {
      console.error("Error al acceder a la cámara web:", error);
      this.closeOverlay();
    }
  }


  async initCamera() {
    try {
      // Configuración de la cámara
      const constraints: MediaStreamConstraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: this.isMovil ? 'user' : 'environment'
        }
      };

      // Obtener el stream de la cámara
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.isCameraEnabled = true;

      // Mostrar el stream en el elemento de video
      const videoElement = this.captureElement.nativeElement;
      videoElement.srcObject = this.stream;
      videoElement.muted = true;
      videoElement.setAttribute('playsinline', '');
      videoElement.play();

    } catch (error) {
      console.error('Error al inicializar la cámara:', error);
    }
  }

  capturePhoto() {
    if (!this.stream) return;

    // Crear un canvas para capturar la imagen
    const canvas = document.createElement('canvas');
    const videoElement = this.captureElement.nativeElement;

    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      this.capturedImage = canvas.toDataURL('image/png'); // Guarda la imagen en formato Base64
    }
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
      this.isCameraEnabled = false;
    }
  }
  // Método para cerrar el modal y devolver la foto capturada
  async saveAndClose() {
    await this.modalController.dismiss({ image: this.capturedImage });
  }

  // Método para cerrar el modal sin guardar
  closeOverlay() {
    this.modalController.dismiss();
    this.stopWebCamera();
  }

  async captureWebPhoto() {
    const canvas = document.createElement('canvas');
    const video = this.videoElement.nativeElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      this.capturedImage = this.sanitizer.bypassSecurityTrustUrl(dataUrl);
      this.stopWebCamera();
    }
  }

  stopWebCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }
}
