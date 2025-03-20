import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ModalDpiServices } from '../../services/modal-services/modal-dpi-services';

@Component({
  selector: 'app-acuerdo-video',
  templateUrl: './camara-acuerdo.video.component.html',
  styleUrls: ['./camara-acuerdo.video.component.scss'],
})
export class CamaraAcuerdoVideoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  @Input() backFunction!: (filePath: File) => Promise<void>;

  capVideo?: File;
  countdown: number = 0;
  isRecording: boolean = false;
  timeRemaining: number = 15; // 🔥 Ahora empieza en 15s
  canStopRecording = false; // 🔥 Solo se habilita cuando faltan 5 segundos
  private isAndroid: boolean;
  private isIOS: boolean;
  stream: MediaStream | null = null;
  mediaRecorder: MediaRecorder | null = null;
  recordingTimer: any;

  isLoading: boolean = true; // Variable para mostrar el loader


  constructor(
    private platform: Platform,
    private changeDetector: ChangeDetectorRef,
    private modalDpiServices: ModalDpiServices,
    private modalController: ModalController,

  ) {
    this.isAndroid = this.platform.is('android');
    this.isIOS = this.platform.is('ios');
  }

  async ngOnInit() {
    await this.initCamera();
  }

  async ngAfterViewInit() { 
    this.modalDpiServices.closeModalAcuerdoVideo$.subscribe( async () => {
        await this.closeOverlayVideo();
      });
  }

  async ngOnDestroy() {
    this.stopCamera();
  }

  async initCamera() {
    let isCameraReady = false;

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
        audio: true
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoElement.nativeElement.srcObject = this.stream;
      this.videoElement.nativeElement.muted = true;

            // Esperar hasta que la cámara esté lista
            this.videoElement.nativeElement.onloadedmetadata = () => {
                isCameraReady = true;
              };
        
              // Espera activa para asegurarte de que está lista
              await new Promise((resolve) => {
                const interval = setInterval(() => {
                  if (isCameraReady) {
                    clearInterval(interval);
                    resolve(true);
                  }
                }, 100);
              });
        
              this.isLoading = false;
        
            //   await this.startVideoRecord();
    } catch (error) {
      console.error('Error al inicializar la cámara:', error);
    }
  }

  async recordVideo() {
    // 🔥 Iniciar cuenta regresiva antes de grabar
    this.countdown = 3;
    const countdownInterval = setInterval(() => {
      this.countdown--;
      this.changeDetector.detectChanges();

      if (this.countdown <= 0) {
        clearInterval(countdownInterval);
        this.startVideoRecord(); // Iniciar grabación después de la cuenta regresiva
      }
    }, 1000);
  }

  async startVideoRecord() {
    if (!this.stream || this.isRecording) return;

    this.isRecording = true;
    this.timeRemaining = 15; // 🔥 Reiniciar cuenta regresiva a 15 segundos
    this.canStopRecording = false; // 🔥 Deshabilitar botón de detener al inicio
    this.changeDetector.detectChanges();

    const options = {
         mimeType: this.isIOS ? 'video/mp4' : 'video/webm'
         , videoBitsPerSecond: 400000 };
    this.mediaRecorder = new MediaRecorder(this.stream, options);
    let chunks: Blob[] = [];

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    this.mediaRecorder.onstop = async () => {
    if (chunks.length === 0) {
        console.error('No se capturaron datos en la grabación.');
        return;
      }
      const videoBlob = new Blob(chunks, { type: this.isIOS ? 'video/mp4' : 'video/webm' });
      const fileExtension = this.isIOS ? 'mp4' : 'webm';
      const videoFile = this.blobToFile(videoBlob, `acuerdo-video.${fileExtension}`);
      if (this.backFunction) {
        await this.backFunction(videoFile);
      }
    };

    this.mediaRecorder.start(100);

    // 🔥 Iniciar cuenta regresiva para detener
    this.recordingTimer = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;

        // 🔥 Habilitar botón de detener cuando falten 5 segundos
        if (this.timeRemaining === 5) {
          this.canStopRecording = true;
        }

        this.changeDetector.detectChanges();
      } else {
        clearInterval(this.recordingTimer);
        this.stopRecording();
      }
    }, 1000);
  }

  async stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      await this.backFunction(this.capVideo!);
      this.isRecording = false;
      this.canStopRecording = false;
      clearInterval(this.recordingTimer);
      this.changeDetector.detectChanges();
    }
  }

  blobToFile(blob: Blob, fileName: string): File {
    return new File([blob], fileName, { type: blob.type });
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    // if (this.scanTimeout) clearTimeout(this.scanTimeout);
  }


  async closeOverlayVideo() {
    this.stopCamera();
    this.modalController.dismiss();
  }


  public closeRequestedFunction() {
    this.closeOverlayVideo();
    this.modalDpiServices.requestCloseModalAcuerdoVideo();
    // this.modalVideoSelfieServices.requestCloseOverlayModal();
  }

}
