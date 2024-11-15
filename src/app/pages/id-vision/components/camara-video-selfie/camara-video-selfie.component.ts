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
    await this.startRecording();
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

    const options = { mimeType: this.isIOS ? 'video/mp4' : 'video/webm', videoBitsPerSecond: 800000 };

    // this.isRecording = true;

    //this.recordedChunks = [];
    this.mediaRecorder = new MediaRecorder(this.stream, options);
    const chunks: Blob[] = [];

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        console.log('Datos capturados:', event.data.size); // Depuración: muestra el tamaño de los datos
        chunks.push(event.data);

        //this.recordedChunks.push(event.data);
      } else {
        console.log('no se capturaron datos');
        
      }
    };

    this.mediaRecorder.onstop = async () => {
      if (chunks.length === 0) {
        console.error('No se capturaron datos en la grabación.'); // Asegúrate de que haya datos capturados
        return;
      }

      let fileType = 'video/webm';
      let fileExtension = 'webm';

      if (this.isIOS) {
        fileType = 'video/mp4';
        fileExtension = 'mp4';
      }

      const videoBlob = new Blob(chunks, { type: fileType });
      const videoFile = new File([videoBlob], `video-selfie.${fileExtension}`, { type: fileType });

      this.capVideo = videoFile;

      const videoUrl = URL.createObjectURL(videoBlob);
      this.capturedVideoUrl = this.sanitizer.bypassSecurityTrustUrl(videoUrl);

      
      await this.backFunction(this.capVideo);
      //logica
     //this.showSuccessAlert();

      //logica

      console.log('Archivo generado:', videoFile);
      console.log('Contenido del archivo:', videoFile.text()); 
      console.log('Video URL:', this.capturedVideoUrl);

    };

    // Inicia la animación de borde progresiva
    // this.renderer.addClass(this.progressRing.nativeElement, 'progress-active');


    // Detiene la grabación después de 10 segundos
    this.scanTimeout = setTimeout(async () => {
      await this.stopRecording();
    }, 15000);
  }

  startVideoRecord() {
    if (this.mediaRecorder && !this.isRecording) {
      this.mediaRecorder.start(100);
      this.isRecording = true;
      this.renderer.addClass(this.progressRing.nativeElement, 'progress-active');
      //this.canStopRecording = false;
     // this.timeRemaining = this.maxRecordingTime / 1000; // Reiniciar el tiempo restante
      //this.updateTimeRemaining(); // Iniciar la actualización del tiempo restante
      setTimeout(() => {
      //  this.canStopRecording = true;
      }, /*this.minRecordingTime*/);

      // this.recordingTimer = setTimeout(async () => {
      //   await this.stopRecord();
      // }, this.maxRecordingTime);
    } 
  }

  // async stopRecording() {
  //   if (this.mediaRecorder && this.isRecording) {
  //     await this.backFunction(this.capVideo!);
  //     this.mediaRecorder.stop();
  //     this.isRecording = false;
  //   }

  //   if (this.scanTimeout) {
  //     clearTimeout(this.scanTimeout);
  //   }

  //   // Detiene la animación del borde circular
  //   this.renderer.removeClass(this.progressRing.nativeElement, 'progress-active');

  //   console.log('video', this.capturedVideoUrl);
    
  // }
  async stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
  
      if (this.capVideo) {
        //await this.backFunction(this.capturedVideoUrl);
      } else {
        console.error('No se generó ningún archivo de video.');
      }
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

          }
        }
      ]
    });

    await alert.present();
  }
}
