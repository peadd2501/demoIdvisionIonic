import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Camera } from '@capacitor/camera';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ModalDpiServices } from '../../services/modal-services/modal-dpi-services';

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
  @Input() backFunction!: (filePath: File) => Promise<void>;


  capturedVideoUrl: any;
  capVideo?: File;
  stream: MediaStream | null = null;
  private isAndroid: boolean;
  private isIOS: boolean;
  private scanTimeout: any;
  isRecording = false;
  mediaRecorder: MediaRecorder | null = null;
  recordedChunks: Blob[] = [];
  countdown: number = 0; // Propiedad para la cuenta regresiva

  private recordingTimer: any;
  private minRecordingTime = 10000; // 8 seconds
  private maxRecordingTime = 12000; // 12 seconds
  timeRemaining: number = this.maxRecordingTime / 1000; // Inicializar con el tiempo máximo en segundos
  canStopRecording = true;


  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private alertController: AlertController,
    private modaldpiServices: ModalDpiServices,
    private changeDetector: ChangeDetectorRef

  ) {
    this.isAndroid = this.platform.is('android');
    this.isIOS = this.platform.is('ios');
  }

  async ngAfterViewInit() {
    if (this.isAndroid || this.isIOS) {
      await this.requestPermissions();
    }
    await this.initCamera();
    await this.startRecording();

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
          width: { ideal: 1280 },
          height: { ideal: 720 },
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
    const options = { mimeType: this.isIOS ? 'video/mp4' : 'video/webm', videoBitsPerSecond: 600000 };
    this.mediaRecorder = new MediaRecorder(this.stream, options);
    const chunks: Blob[] = [];

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      } else {

      }
    };



    this.mediaRecorder.onstop = async () => {
      if (chunks.length === 0) {
        console.error('No se capturaron datos en la grabación.');
        return;
      }
    
      const fileType = this.isIOS ? 'video/mp4' : 'video/webm';
      const fileExtension = this.isIOS ? 'mp4' : 'webm';
    
      const videoBlob = new Blob(chunks, { type: fileType });
      const videoFile = new File([videoBlob], `video-selfie.${fileExtension}`, { type: fileType });
    
      // console.log('Archivo generado en el hijo:', videoFile);
    
      if (this.backFunction) {
        // console.log('Enviando archivo al padre:', videoFile);
        await this.backFunction(videoFile);
      }
    };
    



    // Inicia la animación de borde progresiva
    // this.renderer.addClass(this.progressRing.nativeElement, 'progress-active');


    // Detiene la grabación después de 10 segundos
    setTimeout(async () => {
      await this.stopRecording();
    }, 10000);
  }


  recordVideo() {
    // Mostrar la cuenta regresiva antes de iniciar la grabación
    this.countdown = 3;
    const countdownInterval = setInterval(() => {
      this.countdown -= 1;
      if (this.countdown <= 0) {
        clearInterval(countdownInterval);
        this.startVideoRecord(); // Iniciar la grabación después de la cuenta regresiva
      }
      this.changeDetector.detectChanges(); // Actualizar la vista
    }, 1000);
  }

  startVideoRecord() {
    if (this.mediaRecorder && !this.isRecording) {
      this.mediaRecorder.start(100);
      this.isRecording = true;
      this.renderer.addClass(this.progressRing.nativeElement, 'progress-active');
      this.canStopRecording = false;
      this.timeRemaining = this.maxRecordingTime / 1000; // Reiniciar el tiempo restante
      this.updateTimeRemaining(); // Iniciar la actualización del tiempo restante
      setTimeout(() => {
        this.canStopRecording = true;
      }, this.minRecordingTime);

      this.recordingTimer = setTimeout(async () => {
        await this.stopRecording();
      }, this.maxRecordingTime);
    }
  }

  updateTimeRemaining() {
    const interval = 1000; // Actualizar cada segundo
    const timer = setInterval(() => {
      if (this.isRecording) {
        this.timeRemaining -= 1;
        if (this.timeRemaining <= 0) {
          clearInterval(timer);
        }
      } else {
        clearInterval(timer);
      }
      this.changeDetector.detectChanges(); // Actualizar la vista
    }, interval);
  }

  async stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      await this.backFunction(this.capVideo!);
      this.mediaRecorder.stop();
      this.isRecording = false;
    }

    if (this.scanTimeout) {
      clearTimeout(this.scanTimeout);
    }

    // Detiene la animación del borde circular
    this.renderer.removeClass(this.progressRing.nativeElement, 'progress-active');

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

          }
        }
      ]
    });

    await alert.present();
  }

  public closeRequestedFunction() {
    this.closeOverlay();
    this.modaldpiServices.requestCloseOverlay();
  }
}
