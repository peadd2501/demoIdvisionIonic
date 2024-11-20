import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { Camera } from '@capacitor/camera';
import { ScreenBrightness } from '@capacitor-community/screen-brightness';
let CamaraVideoSelfieComponent = class CamaraVideoSelfieComponent {
    constructor(platform, modalController, sanitizer, renderer, alertController, modaldpiServices, changeDetector, modalVideoSelfieServices) {
        this.platform = platform;
        this.modalController = modalController;
        this.sanitizer = sanitizer;
        this.renderer = renderer;
        this.alertController = alertController;
        this.modaldpiServices = modaldpiServices;
        this.changeDetector = changeDetector;
        this.modalVideoSelfieServices = modalVideoSelfieServices;
        this.text1 = '';
        this.text2 = '';
        this.stream = null;
        this.isRecording = false;
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.countdown = 0; // Propiedad para la cuenta regresiva
        this.minRecordingTime = 10000; // 10 seconds
        this.maxRecordingTime = 12000; // 12 seconds
        this.timeRemaining = this.maxRecordingTime / 1000; // Inicializar con el tiempo máximo en segundos
        this.canStopRecording = true;
        this.isLoading = true; // Variable para mostrar el loader
        this.defaultBrightness = null; // Para guardar el brillo original del dispositivo
        this.isAndroid = this.platform.is('android');
        this.isIOS = this.platform.is('ios');
    }
    async ngAfterViewInit() {
        const { brightness } = await ScreenBrightness.getBrightness();
        this.defaultBrightness = brightness;
        await ScreenBrightness.setBrightness({ brightness: 1.0 });
        if (this.isAndroid || this.isIOS) {
            await this.requestPermissions();
        }
        await this.initCamera();
        // await this.startRecording();
        await this.waitForCameraReady();
        this.modaldpiServices.closeOverlay$.subscribe(() => {
            this.closeOverlay();
        });
    }
    async waitForCameraReady() {
        return new Promise((resolve) => {
            this.videoElement.nativeElement.onloadedmetadata = () => {
                resolve();
            };
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
        let isCameraReady = false;
        try {
            const constraints = {
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: 'user'
                }
            };
            this.stream = await navigator.mediaDevices.getUserMedia(constraints);
            this.videoElement.nativeElement.srcObject = this.stream;
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
            await this.startRecording();
        }
        catch (error) {
            console.error('Error al inicializar la cámara:', error);
            this.isLoading = false;
        }
    }
    async startRecording() {
        if (!this.stream)
            return;
        const options = { mimeType: this.isIOS ? 'video/mp4' : 'video/webm', videoBitsPerSecond: 400000 };
        this.mediaRecorder = new MediaRecorder(this.stream, options);
        let chunks = [];
        this.mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                chunks.push(event.data);
            }
            else {
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
        // setTimeout(async () => {
        //   await this.stopRecording();
        // }, 10000);
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
    async startVideoRecord() {
        if (this.mediaRecorder && !this.isRecording) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            this.mediaRecorder.start(100);
            this.isRecording = true;
            this.canStopRecording = false; // Deshabilitar el botón de detener inicialmente
            this.renderer.addClass(this.progressRing.nativeElement, 'progress-active');
            this.timeRemaining = this.maxRecordingTime / 1000; // Reiniciar el tiempo restante
            this.updateTimeRemaining(); // Iniciar la actualización del tiempo restante
            // Habilitar el botón de detener después de minRecordingTime
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
            }
            else {
                clearInterval(timer);
            }
            this.changeDetector.detectChanges(); // Actualizar la vista
        }, interval);
    }
    async stopRecording() {
        if (this.mediaRecorder && this.isRecording && this.canStopRecording) {
            await this.backFunction(this.capVideo);
            this.mediaRecorder.stop();
            this.isRecording = false;
        }
        if (this.scanTimeout) {
            clearTimeout(this.scanTimeout);
        }
        // Detiene la animación del borde circular
        this.renderer.removeClass(this.progressRing.nativeElement, 'progress-active');
    }
    async closeOverlay() {
        this.stopCamera();
        // Restaura el brillo original si estaba guardado
        if (this.defaultBrightness !== null) {
            await ScreenBrightness.setBrightness({ brightness: this.defaultBrightness });
        }
        this.modalController.dismiss();
    }
    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach((track) => track.stop());
            this.stream = null;
        }
        if (this.scanTimeout)
            clearTimeout(this.scanTimeout);
    }
    closeRequestedFunction() {
        this.closeOverlay();
        this.modalVideoSelfieServices.requestCloseOverlay();
    }
};
__decorate([
    ViewChild('videoElement')
], CamaraVideoSelfieComponent.prototype, "videoElement", void 0);
__decorate([
    ViewChild('progressRing')
], CamaraVideoSelfieComponent.prototype, "progressRing", void 0);
__decorate([
    Input()
], CamaraVideoSelfieComponent.prototype, "text1", void 0);
__decorate([
    Input()
], CamaraVideoSelfieComponent.prototype, "text2", void 0);
__decorate([
    Input()
], CamaraVideoSelfieComponent.prototype, "backFunction", void 0);
CamaraVideoSelfieComponent = __decorate([
    Component({
        selector: 'app-camara-video-selfie',
        templateUrl: './camara-video-selfie.component.html',
        styleUrls: ['./camara-video-selfie.component.scss'],
    })
], CamaraVideoSelfieComponent);
export { CamaraVideoSelfieComponent };
//# sourceMappingURL=camara-video-selfie.component.js.map