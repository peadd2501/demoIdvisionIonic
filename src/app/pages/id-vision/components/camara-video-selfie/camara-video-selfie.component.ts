import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Camera } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalVideoSelfieServices } from '../../services/modal-services/modal-video-selfie-services';
import { ScreenBrightness } from '@capacitor-community/screen-brightness';
import { ModalDpiServices } from '../../services/modal-services/modal-dpi-services';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-camara-video-selfie',
  templateUrl: './camara-video-selfie.component.html',
  styleUrls: ['./camara-video-selfie.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class CamaraVideoSelfieComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('progressRing') progressRing!: ElementRef<HTMLElement>;

  @Input() text1: string = '';
  @Input() text2: string = '';
  @Input() backFunction!: (filePath: File) => Promise<void>;
  @Output() closeRequested = new EventEmitter<void>();

  capturedVideoUrl: any;
  capVideo?: File;
  stream: MediaStream | null = null;
  private isAndroid: boolean;
  private isIOS: boolean;
  private scanTimeout: any;
  isRecording = false;
  mediaRecorder: MediaRecorder | null = null;
  recordedChunks: Blob[] = [];
  countdown: number = 0;

  private recordingTimer: any;
  private minRecordingTime = 3000;
  private maxRecordingTime = 5000;
  timeRemaining: number = this.maxRecordingTime / 1000;
  canStopRecording = true;
  isLoading: boolean = true;
  private defaultBrightness: number | null = null;

  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private alertController: AlertController,
    private changeDetector: ChangeDetectorRef,
    private modalVideoSelfieServices: ModalVideoSelfieServices,
    private modalDpiServices: ModalDpiServices
  ) {
    this.isAndroid = this.platform.is('android');
    this.isIOS = this.platform.is('ios');
  }

  async ngAfterViewInit() {
    if (this.isAndroid || this.isIOS) {
      try {
        const { brightness } = await ScreenBrightness.getBrightness();
        this.defaultBrightness = brightness;
        await ScreenBrightness.setBrightness({ brightness: 1.0 });
      } catch (error) {
        console.warn('Error al obtener el brillo de la pantalla:', error);
      }
      await this.requestPermissions();
    }

    await this.initCamera();
    await this.waitForCameraReady();

    this.modalDpiServices.closeModalAndChangeBrightness$.subscribe(
      async () => {
        await this.closeOverlayVideo();
      }
    );
  }

  async ngOnDestroy() {
    this.stopCamera();
    try {
      if (this.defaultBrightness !== null) {
        await ScreenBrightness.setBrightness({
          brightness: this.defaultBrightness,
        });
      }
    } catch (error) {
      console.warn('Error al restaurar el brillo original:', error);
    }
  }

  async waitForCameraReady(): Promise<void> {
    return new Promise((resolve) => {
      this.videoElement.nativeElement.onloadedmetadata = () => {
        resolve();
      };
    });
  }

  async requestPermissions() {
    if (Capacitor.getPlatform() !== 'web') {
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
    let isCameraReady = false;

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoElement.nativeElement.srcObject = this.stream;

      this.videoElement.nativeElement.onloadedmetadata = () => {
        isCameraReady = true;
      };

      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (isCameraReady) {
            clearInterval(interval);
            resolve(true);
          }
        }, 100);
      });

      this.isLoading = false;

      await this.startRecording();
    } catch (error) {
      console.error('Error al inicializar la cámara:', error);
      this.isLoading = false;
    }
  }

  async startRecording() {
    if (!this.stream) return;

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }

    const options = {
      mimeType: this.isIOS ? 'video/mp4' : 'video/webm',
      videoBitsPerSecond: 400000,
    };

    this.recordedChunks = [];

    this.mediaRecorder = new MediaRecorder(this.stream, options);

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };

    this.mediaRecorder.onstop = async () => {
      if (this.recordedChunks.length === 0) {
        console.error('No se capturaron datos en la grabación.');
        return;
      }

      const fileType = this.isIOS ? 'video/mp4' : 'video/webm';
      const fileExtension = this.isIOS ? 'mp4' : 'webm';
      const videoBlob = new Blob(this.recordedChunks, { type: fileType });
      const videoFile = this.blobToFile(videoBlob, `video-selfie.${fileExtension}`);

      this.capVideo = videoFile;

      if (this.backFunction) {
        await this.backFunction(videoFile);
      }

      this.recordedChunks = [];
    };
  }

  blobToFile(blob: Blob, fileName: string): File {
    const b: any = blob;
    b.lastModified = new Date().getTime();
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return <File>b;
  }

  recordVideo() {
    this.countdown = 3;
    const countdownInterval = setInterval(() => {
      this.countdown -= 1;
      if (this.countdown <= 0) {
        clearInterval(countdownInterval);
        this.startVideoRecord();
      }
      this.changeDetector.detectChanges();
    }, 1000);
  }

  async startVideoRecord() {
    if (this.mediaRecorder && !this.isRecording) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      this.mediaRecorder.start(100);
      this.isRecording = true;

      this.canStopRecording = false;

      this.renderer.addClass(
        this.progressRing.nativeElement,
        'progress-active'
      );
      this.timeRemaining = this.maxRecordingTime / 1000;
      this.updateTimeRemaining();

      setTimeout(() => {
        this.canStopRecording = true;
      }, this.minRecordingTime);

      this.recordingTimer = setTimeout(async () => {
        await this.stopRecording();
      }, this.maxRecordingTime);
    }
  }

  updateTimeRemaining() {
    const interval = 1000;
    const timer = setInterval(() => {
      if (this.isRecording) {
        this.timeRemaining -= 1;
        if (this.timeRemaining <= 0) {
          clearInterval(timer);
        }
      } else {
        clearInterval(timer);
      }
      this.changeDetector.detectChanges();
    }, interval);
  }

  async stopRecording() {
    if (this.mediaRecorder && this.isRecording && this.canStopRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }

    if (this.scanTimeout) {
      clearTimeout(this.scanTimeout);
    }

    this.renderer.removeClass(
      this.progressRing.nativeElement,
      'progress-active'
    );
  }

  async closeOverlayVideo() {
    this.stopCamera();
    if (this.defaultBrightness !== null) {
      await ScreenBrightness.setBrightness({
        brightness: this.defaultBrightness,
      });
    }
    this.modalController.dismiss();
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    if (this.scanTimeout) clearTimeout(this.scanTimeout);
  }

  public closeRequestedFunction() {
    this.closeOverlayVideo();
    this.modalDpiServices.requestCloseModalAndBrightness();
  }
}
