import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Camera } from '@capacitor/camera';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-camara-video-selfie',
  templateUrl: './camara-video-selfie.component.html',
  styleUrls: ['./camara-video-selfie.component.scss'],
})
export class CamaraVideoSelfieComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('progressRing') progressRing!: ElementRef<HTMLElement>;

  @Input() text1: string = '';
  @Input() text2: string = '';
  @Input() backFunction!: () => {};


  capturedVideoUrl: SafeUrl | null = null;
  capVideo?: File;
  stream: MediaStream | null = null;
  private isAndroid: boolean;
  private isIOS: boolean;
  private scanTimeout: any;
  isRecording = false;
  mediaRecorder: MediaRecorder | null = null;
  recordedChunks: Blob[] = [];

  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private alertController: AlertController
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
          facingMode: 'user'
        }
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoElement.nativeElement.srcObject = this.stream;
    } catch (error) {
      console.error('Error al inicializar la cámara:', error);
    }
  }

  async startRecording() {
    if (!this.stream) return;

    const options = { mimeType: this.isIOS ? 'video/mp4' : 'video/webm', videoBitsPerSecond: 400000 };

    this.isRecording = true;
    this.recordedChunks = [];
    this.mediaRecorder = new MediaRecorder(this.stream, options);
    
    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };

    this.mediaRecorder.onstop = () => {

      const videoBlob = new Blob(this.recordedChunks, { type: 'video/mp4' });
      const videoFile = new File([videoBlob], 'video-selfie.mp4', { type: 'video/mp4' });
      const videoUrl = URL.createObjectURL(videoBlob);
      this.capturedVideoUrl = this.sanitizer.bypassSecurityTrustUrl(videoUrl);

      this.capVideo = videoFile;
      //logica
     this.showSuccessAlert();

      //logica


      console.log('Video File:', videoFile);
      console.log('Video URL:', this.capturedVideoUrl);

    };



    this.mediaRecorder.start();

    // Inicia la animación de borde progresiva
    this.renderer.addClass(this.progressRing.nativeElement, 'progress-active');


    // Detiene la grabación después de 10 segundos
    this.scanTimeout = setTimeout(() => {
      this.stopRecording();
    }, 10000);
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }

    if (this.scanTimeout) {
      clearTimeout(this.scanTimeout);
    }

    // Detiene la animación del borde circular
    this.renderer.removeClass(this.progressRing.nativeElement, 'progress-active');

    console.log('video', this.capturedVideoUrl);
    
  }

  closeOverlay() {
    this.stopCamera();
    this.modalController.dismiss();
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    if (this.scanTimeout) clearTimeout(this.scanTimeout);
  }

  async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      cssClass: 'custom-alert', // Aplica una clase personalizada
      message: 'El video se ha capturado satisfactoriamente.',
      buttons: [
        {
          text: 'Aceptar',
          handler: async () => {
            await this.backFunction();
          }
        }
      ]
    });

    await alert.present();
  }
}
