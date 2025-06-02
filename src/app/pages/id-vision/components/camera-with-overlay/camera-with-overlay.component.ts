import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Camera } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { ModalDpiServices } from '../../services/modal-services/modal-dpi-services';

interface CamInfo {
  label: string;
  deviceId: string;
}

@Component({
  selector: 'app-camera-overlay',
  templateUrl: './camera-with-overlay.component.html',
  styleUrls: ['./camera-with-overlay.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CameraWithOverlayComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  /* ─── Inputs / Outputs ─── */
  @Input() text1 = '';
  @Input() text2 = '';
  @Input() overlaySrc = '';
  @Input() onTakePicture!: (file: File) => Promise<boolean>;
  @Output() closeRequested = new EventEmitter<void>();

  /* ─── Estado ─── */
  stream: MediaStream | null = null;
  isLoading = true;
  rearCams: CamInfo[] = [];
  selectedCamId: string | null = null;
  currentRearIndex = 0;               // ← índice de la lente trasera activa

  private readonly isMobile = this.platform.is('android') || this.platform.is('ios');

  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private modaldpiServices: ModalDpiServices
  ) { }

  /* ═════════ LIFE-CYCLE ═════════ */

  async ngAfterViewInit() {
    if (this.isMobile) await this.requestPermissions();
    await this.enumerateRearCams();              // llena rearCams y abre cámara por defecto
    this.isLoading = false;

    this.modaldpiServices.closeOverlay$.subscribe(() => this.closeOverlay());
    this.modaldpiServices.resumeCameraSubject$.subscribe(() => this.resumeCamera());
  }

  ngOnDestroy() {
    this.stopCamera();
  }

  /* ═════════ Permisos ═════════ */

  private async requestPermissions() {
    if (Capacitor.getPlatform() !== 'web') {
      const { camera } = await Camera.requestPermissions();
      if (camera === 'denied') console.error('Permiso de cámara denegado');
    }
  }

  /* ═════════ Enumerar cámaras traseras ═════════ */

  private async enumerateRearCams() {
    let devices = (await navigator.mediaDevices.enumerateDevices()).filter(d => d.kind === 'videoinput');

    /* Si los labels vienen vacíos, pedimos un stream corto para que aparezcan. */
    if (!devices.some(d => d.label)) {
      try {
        const tmp = await navigator.mediaDevices.getUserMedia({ video: true });
        tmp.getTracks().forEach(t => t.stop());
        devices = (await navigator.mediaDevices.enumerateDevices()).filter(d => d.kind === 'videoinput');
      } catch { /* ignorar */ }
    }

    this.rearCams = devices
      .filter(d => /back|rear|environment/i.test(d.label))
      .map((d, i) => ({ label: d.label || `Cámara trasera ${i + 1}`, deviceId: d.deviceId }));

    if (!this.rearCams.length && devices.length > 1) {
      /* plan B – todo menos la primera (suele ser frontal) */
      this.rearCams = devices.slice(1).map((d, i) => ({
        label: d.label || `Cámara ${i + 1}`,
        deviceId: d.deviceId
      }));
    }

    /* ─── Elegir la cámara por defecto ─── */
    if (this.rearCams.length) {
      let preferred = this.rearCams.find(c => /camera2\s?0/i.test(c.label));     // 1) “camera2 0…”
      if (!preferred) preferred = this.rearCams.find(c => /back/i.test(c.label)); // 2) cualquier “back”
      const chosen = preferred ?? this.rearCams[0];                               // 3) primera

      this.selectedCamId = chosen.deviceId;
      this.currentRearIndex = this.rearCams.findIndex(c => c.deviceId === chosen.deviceId);
      await this.openCamera(this.selectedCamId);
    } else if (devices.length) {
      /* Fallback final: primera cámara disponible */
      await this.openCamera(devices[0].deviceId);
    }
  }

  /* ═════════ Abrir / cambiar cámara ═════════ */

  async openCamera(deviceId?: string) {
    this.stopCamera();
    if (!deviceId) return;
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: { exact: deviceId },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          aspectRatio: 1.7777778
        },
        audio: false
      });
      this.attachStream(this.stream);
    } catch (err) {
      console.error('No se pudo abrir la cámara:', err);
    }
  }

  /** Avanza al siguiente sensor trasero en modo carrusel */
  toggleRearCam() {
    if (!this.rearCams.length) return;

    this.currentRearIndex = (this.currentRearIndex + 1) % this.rearCams.length;
    const nextCam = this.rearCams[this.currentRearIndex];
    this.selectedCamId = nextCam.deviceId;
    this.openCamera(nextCam.deviceId);
  }

  private attachStream(stream: MediaStream) {
    const video = this.videoElement.nativeElement;
    video.srcObject = stream;
    video.autoplay = true;
    video.playsInline = true;
    video.muted = true;
    video.onloadedmetadata = () => video.play().catch(console.error);
  }

  /* ═════════ Captura de foto ═════════ */

  async capturePhoto() {
    if (!this.stream) return console.error('Cámara no inicializada.');


    try {
      const video = this.videoElement.nativeElement;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 1920;
      canvas.height = video.videoHeight || 1080;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const toBlob = (q: number) =>
        new Promise<Blob | null>(res => canvas.toBlob(b => res(b), 'image/jpeg', q));

      let quality = 0.98;
      let blob = await toBlob(quality);
      //console.log('blob', blob);
      const maxBytes = 3 * 1024 * 1024;
      while (blob && blob.size > maxBytes && quality > 0.4) {
        quality -= 0.05;
        blob = await toBlob(quality);
      }

      if (blob && blob.size <= maxBytes) {
        //const file = new File([blob], 'dpi.jpeg', { type: 'image/jpeg' });
        // const newBlob = new Blob([blob], { type: 'video/jpeg' });
        const file = this.blobToFile(blob, 'dpi.jpeg');
        video.pause();
        await this.onTakePicture?.(file);
      } else {
        alert('Imagen mayor a 5 MEGAS')
        console.error('Imagen > 3 MB.');
      }
    } catch (error) {
      console.error(error)
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

  /* ═════════ Utilidades ─ cierre / reanudar ═════════ */

  private stopCamera() {
    this.stream?.getTracks().forEach(t => t.stop());
    this.stream = null;
  }

  closeOverlay() {
    this.stopCamera();
    this.modalController.dismiss();
  }

  resumeCamera() {
    const video = this.videoElement?.nativeElement;
    if (video && video.paused) video.play().catch(console.error);
  }
}
