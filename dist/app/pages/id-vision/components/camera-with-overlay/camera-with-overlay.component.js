import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Camera } from '@capacitor/camera';
let CameraWithOverlayComponent = class CameraWithOverlayComponent {
    // overlaySrc: String = '';
    constructor(platform, modalController, sanitizer, modaldpiServices) {
        this.platform = platform;
        this.modalController = modalController;
        this.sanitizer = sanitizer;
        this.modaldpiServices = modaldpiServices;
        this.text1 = '';
        this.text2 = '';
        this.overlaySrc = '';
        this.closeRequested = new EventEmitter();
        this.capturedImage = null;
        this.stream = null;
        this.isLoading = true; // Variable para mostrar el loader
        this.capturedImageUrl = null;
        this.isAndroid = this.platform.is('android');
        this.isIOS = this.platform.is('ios');
    }
    async ngAfterViewInit() {
        if (this.isAndroid || this.isIOS) {
            await this.requestPermissions();
        }
        await this.initCamera();
        this.isLoading = false;
        this.modaldpiServices.closeOverlay$.subscribe(() => {
            this.closeOverlay();
        });
        this.modaldpiServices.resumeCameraSubject$.subscribe(() => {
            this.resumeCamera();
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
            const constraints = {
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
        }
        catch (error) {
            console.error('Error al inicializar la cámara:', error);
            this.isLoading = false;
        }
    }
    async capturePhoto() {
        if (!this.stream)
            return;
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
                    this.capturedImageUrl = URL.createObjectURL(this.file); // Crea una URL temporal
                    videoElement.pause();
                    this.onTakePicture(this.capturedImageUrl).then(() => {
                        //this.closeOverlay();
                    });
                    // this.uploadPhoto(file); // Llama a una función para enviar el archivo
                }
            }, 'image/jpeg', 1);
            //this.closeOverlay();
        }
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
    closeRequestedFunction() {
        this.closeOverlay();
        this.modaldpiServices.requestCloseOverlay();
    }
    resumeCamera() {
        console.log('ejecutando resume');
        const videoElement = this.videoElement?.nativeElement;
        if (videoElement && videoElement.paused) {
            videoElement.play().catch((error) => {
                console.error('Error al intentar reanudar el video:', error);
            });
        }
    }
};
__decorate([
    ViewChild('videoElement')
], CameraWithOverlayComponent.prototype, "videoElement", void 0);
__decorate([
    Input()
], CameraWithOverlayComponent.prototype, "text1", void 0);
__decorate([
    Input()
], CameraWithOverlayComponent.prototype, "text2", void 0);
__decorate([
    Input()
], CameraWithOverlayComponent.prototype, "overlaySrc", void 0);
__decorate([
    Input()
], CameraWithOverlayComponent.prototype, "onTakePicture", void 0);
__decorate([
    Output()
], CameraWithOverlayComponent.prototype, "closeRequested", void 0);
CameraWithOverlayComponent = __decorate([
    Component({
        selector: 'app-camera-overlay',
        templateUrl: './camera-with-overlay.component.html',
        styleUrls: ['./camera-with-overlay.component.scss'],
    })
], CameraWithOverlayComponent);
export { CameraWithOverlayComponent };
//# sourceMappingURL=camera-with-overlay.component.js.map