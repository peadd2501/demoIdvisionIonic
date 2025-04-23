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

@Component({
  selector: 'app-camera-overlay',
  templateUrl: './camera-with-overlay.component.html',
  styleUrls: ['./camera-with-overlay.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CameraWithOverlayComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  /* ▸ Inputs / Outputs */
  @Input() text1 = '';
  @Input() text2 = '';
  @Input() overlaySrc = '';
  @Input() onTakePicture!: (file: File) => Promise<boolean>;
  @Output() closeRequested = new EventEmitter<void>();

  /* ▸ Estado */
  stream: MediaStream | null = null;
  isLoading = true;

  /* ▸ Plataforma */
  private readonly isAndroid = this.platform.is('android');
  private readonly isIOS = this.platform.is('ios');

  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private modaldpiServices: ModalDpiServices
  ) {}

  /* ─────────────── Life‑cycle ─────────────── */

  async ngAfterViewInit() {
    await this.requestPermissions();

    /* DEBUG – muestra todas las cámaras halladas */
    await this.logAvailableCams();

    this.stream = await this.selectRearCamera();
    if (this.stream) this.attachStream(this.stream);

    this.isLoading = false;

    /* Eventos externos */
    this.modaldpiServices.closeOverlay$.subscribe(() => this.closeOverlay());
    this.modaldpiServices.resumeCameraSubject$.subscribe(() => this.resumeCamera());
  }

  ngOnDestroy() {
    this.stopCamera();
  }

  /* ─────────────── Permisos ─────────────── */

  private async requestPermissions() {
    if (Capacitor.getPlatform() !== 'web' && (this.isAndroid || this.isIOS)) {
      const { camera } = await Camera.requestPermissions();
      if (camera === 'denied') {
        console.error('Permiso de cámara denegado');
      }
    }
  }

  /* ─────────────── Cámara trasera robusta ─────────────── */

  /** Muestra en consola cada videoinput encontrado (para debug). */
  private async logAvailableCams() {
    const devs = await navigator.mediaDevices.enumerateDevices();
    devs
      .filter(d => d.kind === 'videoinput')
      .forEach((d, i) => console.log(`[${i}] "${d.label}" — id: ${d.deviceId}`));
  }

  /**
   * Selecciona la cámara trasera con varios intentos:
   * 1) facingMode:'environment' exact.
   * 2) Recorre todas y acepta la primera cuyo facingMode !== 'user'.
   * 3) Si hay ≥2 cámaras, prueba la segunda (suele ser trasera).
   * 4) Fallback: primera cámara disponible.
   */
  private async selectRearCamera(): Promise<MediaStream | null> {
    /* 1 — prueba facingMode exact estándar */
    try {
      const std = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: 'environment' } },
        audio: false
      });
      const fm = (std.getVideoTracks()[0].getSettings() as any).facingMode;
      if (fm === 'environment') return std;
      std.getTracks().forEach(t => t.stop());
    } catch { /* ignoramos */ }

    /* 2 — recorre cada lente buscando algo que no sea 'user' */
    const devices = (await navigator.mediaDevices.enumerateDevices())
      .filter(d => d.kind === 'videoinput');

    for (const cam of devices) {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: cam.deviceId }, width: 640, height: 480 },
          audio: false
        });
        const mode = (s.getVideoTracks()[0].getSettings() as any).facingMode || '';
        if (mode !== 'user') return s;               // aceptamos environment, back, vacío, etc.
        s.getTracks().forEach(t => t.stop());
      } catch { /* ignoramos */ }
    }

    /* 3 — plan C: prueba la segunda cámara si existe */
    if (devices.length > 1) {
      try {
        return navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: devices[1].deviceId } },
          audio: false
        });
      } catch { /* ignoramos */ }
    }

    /* 4 — último recurso */
    console.warn('Usando cámara por defecto (puede ser frontal).');
    return navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  }

  /* ─────────────── Preview en <video> ─────────────── */

  private attachStream(stream: MediaStream) {
    const video = this.videoElement.nativeElement;
    video.srcObject = stream;
    video.autoplay = true;
    video.playsInline = true;
    video.muted = true;
    video.onloadedmetadata = () => video.play().catch(console.error);
  }

  /* ─────────────── Captura de foto ─────────────── */

  async capturePhoto() {
    if (!this.stream) return console.error('La cámara no está inicializada.');

    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1920;
    canvas.height = video.videoHeight || 1080;

    const ctx = canvas.getContext('2d');
    if (!ctx) return console.error('No se pudo obtener el contexto del canvas.');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    /* compresión hasta ≤5 MB */
    let quality = 0.98;
    const maxBytes = 5 * 1024 * 1024;
    const toBlob = (q: number) =>
      new Promise<Blob | null>(res => canvas.toBlob(b => res(b), 'image/jpeg', q));

    let blob = await toBlob(quality);
    while (blob && blob.size > maxBytes && quality > 0.4) {
      quality -= 0.05;
      blob = await toBlob(quality);
    }

    if (blob && blob.size <= maxBytes) {
      const file = new File([blob], 'dpi.jpeg', { type: 'image/jpeg' });
      video.pause();
      try {
        await this.onTakePicture(file);
      } catch (err) {
        console.error('Error en onTakePicture:', err);
      }
    } else {
      console.error('No se pudo reducir la imagen por debajo de 5 MB.');
    }
  }

  /* ─────────────── Utilidades de cierre ─────────────── */

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
