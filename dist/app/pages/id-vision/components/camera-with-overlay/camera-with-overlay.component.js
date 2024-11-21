import { __awaiter } from "tslib";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Camera } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDpiServices } from '../../services/modal-services/modal-dpi-services';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
import * as i2 from "@angular/platform-browser";
import * as i3 from "../../services/modal-services/modal-dpi-services";
import * as i4 from "@angular/common";
export class CameraWithOverlayComponent {
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
    ngAfterViewInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isAndroid || this.isIOS) {
                yield this.requestPermissions();
            }
            yield this.initCamera();
            this.isLoading = false;
            this.modaldpiServices.closeOverlay$.subscribe(() => {
                this.closeOverlay();
            });
            this.modaldpiServices.resumeCameraSubject$.subscribe(() => {
                this.resumeCamera();
            });
        });
    }
    requestPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isAndroid || this.isIOS) {
                const permissions = yield Camera.requestPermissions();
                if (permissions.camera === 'denied') {
                    console.error('Permiso de cámara denegado');
                    return;
                }
            }
        });
    }
    initCamera() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const constraints = {
                    video: {
                        width: { ideal: 1920 },
                        height: { ideal: 1080 },
                        facingMode: 'environment'
                    }
                };
                this.stream = yield navigator.mediaDevices.getUserMedia(constraints);
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
        });
    }
    capturePhoto() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
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
        var _a;
        console.log('ejecutando resume');
        const videoElement = (_a = this.videoElement) === null || _a === void 0 ? void 0 : _a.nativeElement;
        if (videoElement && videoElement.paused) {
            videoElement.play().catch((error) => {
                console.error('Error al intentar reanudar el video:', error);
            });
        }
    }
}
CameraWithOverlayComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: CameraWithOverlayComponent, deps: [{ token: i1.Platform }, { token: i1.ModalController }, { token: i2.DomSanitizer }, { token: i3.ModalDpiServices }], target: i0.ɵɵFactoryTarget.Component });
CameraWithOverlayComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.12", type: CameraWithOverlayComponent, selector: "app-camera-overlay", inputs: { text1: "text1", text2: "text2", overlaySrc: "overlaySrc", onTakePicture: "onTakePicture" }, outputs: { closeRequested: "closeRequested" }, viewQueries: [{ propertyName: "videoElement", first: true, predicate: ["videoElement"], descendants: true }], ngImport: i0, template: "<ion-content color=\"dark\">\n  <div class=\"camera-overlay\">\n    <div class=\"header-text\">\n      <div class=\"text-help\">\n        <p>{{text1}}</p>\n      </div>\n      <p class=\"country\">{{text2}}</p>\n    </div>\n\n\n    <div *ngIf=\"isLoading\" class=\"loading-overlay\">\n      <ion-spinner name=\"crescent\"></ion-spinner>\n    </div>\n    \n    <!-- Capa oscura con recorte en el centro -->\n    <div class=\"visible-window\"></div>\n\n    <!-- Video de la c\u00E1mara con el overlay centrado -->\n    <div class=\"camera-container\" >\n      <video #videoElement autoplay muted playsinline></video>\n      <!-- <img [src]=\"overlaySrc\" alt=\"Overlay\" class=\"overlay-frame\" /> -->\n    </div>\n\n    <!-- Bot\u00F3n de captura centrado en la parte inferior -->\n    <div class=\"button-container\">\n      <ion-button (click)=\"capturePhoto()\" class=\"capture-button\" shape=\"round\" expand=\"block\">\n        <ion-icon name=\"camera-outline\"></ion-icon>\n      </ion-button>\n    </div>\n\n    <!-- Bot\u00F3n de cerrar en la esquina superior derecha -->\n    <ion-button fill=\"clear\" (click)=\"closeOverlay()\" class=\"close-button\">\n      <ion-icon name=\"close-outline\"></ion-icon>\n    </ion-button>\n  </div>\n\n  <!-- Mostrar la imagen capturada si existe -->\n  <div *ngIf=\"capturedImageUrl\">\n    <h3>Imagen Capturada:</h3>\n    <img [src]=\"capturedImageUrl\" alt=\"Foto capturada\" />\n  </div>\n</ion-content>", styles: ["ion-content {\n  --background: black;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n\n}\n\n.modal-container {\n  max-width: 400px; // Ajusta el valor seg\u00FAn tus necesidades\n\n}\n\n.camera-overlay {\n  position: relative;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n}\n\n.camera-container {\n  width: 100%;\n  height: 100%;\n  position: relative;\n\n  video {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n  }\n}\n\n.overlay-frame {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  max-width: 70%;\n  max-height: 70%;\n  z-index: 9;\n}\n\n.header-text {\n  position: absolute;\n  top: 170px;\n  width: 100%;\n  text-align: center;\n  color: white;\n  z-index: 15;\n\n  p {\n    margin: 0;\n    font-size: 18px;\n  }\n\n  .country {\n    font-weight: bold;\n  }\n}\n\n.button-container {\n  position: absolute;\n  bottom: 50px;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 10;\n}\n\n.capture-button {\n  width: 70px;\n  height: 70px;\n  border-radius: 50%;\n\n\n  --background: var(--purple-primary);\n    --background-hover: var(--purple-secondary);\n    --background-activated: var(--purple-secondary);\n    --background-focused: var(--purple-secondary);\n  \n    --color: white;\n  \n    --border-color: var(--purple-primary);\n    --border-style: solid;\n    --border-width: 1px;\n  \n    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n  \n    --ripple-color: var(--purple-secondary);\n}\n\n.close-button {\n  position: absolute;\n  top: 14px;\n  right: 20px;\n  color: white;\n  z-index: 10;\n}\n\n.visible-window {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  // width: 70%; /* Ajusta el tama\u00F1o del cuadro */\n  // height: 45%; /* Ajusta el tama\u00F1o del cuadro */\n\n  width: 390px; /* Ajusta el tama\u00F1o del cuadro */\n  height: 420px;\n  \n  max-width: 70%;\n  max-height: 70%;\n  background: transparent;\n  border: 2px solid white; /* Color y grosor del borde */\n  border-radius: 10px; /* Ajusta para redondear las esquinas */\n  z-index: 10; /* Aseg\u00FArate de que est\u00E9 encima del overlay oscuro */\n  box-shadow: 0 0 0 100vw rgba(0, 0, 0, 0.85); /* Oscurece fuera del cuadro */\n}\n.text-help  p{\n  display: inline-block; /* Hace que solo el texto ocupe espacio */\n  background-color: white; /* Color de fondo del texto */\n  padding: 5px; /* Espaciado interno para una mejor visualizaci\u00F3n */\n  border-radius: 5px; /* Opcional, para esquinas redondeadas */\n  color: black; /* Color del texto */\n  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombra leve */\n  animation: popIn 1s ease-in-out; /* Agrega la animaci\u00F3n al aparecer */\n}\n\n/* Definimos la animaci\u00F3n \"popIn\" */\n@keyframes popIn {\n  0% {\n    transform: scale(0.8); /* Comienza m\u00E1s peque\u00F1o */\n    opacity: 0; /* Empieza invisible */\n  }\n  50% {\n    transform: scale(1.1); /* Crece un poco m\u00E1s de lo normal */\n    opacity: 1; /* Se hace visible */\n  }\n  100% {\n    transform: scale(1); /* Vuelve a su tama\u00F1o normal */\n  }\n}\n\n.loading-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.8); /* Fondo oscuro semi-transparente */\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000; /* Aseg\u00FArate de que est\u00E9 por encima del contenido */\n}\n\nion-spinner {\n  color: white;\n  width: 50px;\n  height: 50px;\n}"], dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.IonButton, selector: "ion-button", inputs: ["buttonType", "color", "disabled", "download", "expand", "fill", "form", "href", "mode", "rel", "routerAnimation", "routerDirection", "shape", "size", "strong", "target", "type"] }, { kind: "component", type: i1.IonContent, selector: "ion-content", inputs: ["color", "fixedSlotPlacement", "forceOverscroll", "fullscreen", "scrollEvents", "scrollX", "scrollY"] }, { kind: "component", type: i1.IonIcon, selector: "ion-icon", inputs: ["color", "flipRtl", "icon", "ios", "lazy", "md", "mode", "name", "sanitize", "size", "src"] }, { kind: "component", type: i1.IonSpinner, selector: "ion-spinner", inputs: ["color", "duration", "name", "paused"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: CameraWithOverlayComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-camera-overlay', template: "<ion-content color=\"dark\">\n  <div class=\"camera-overlay\">\n    <div class=\"header-text\">\n      <div class=\"text-help\">\n        <p>{{text1}}</p>\n      </div>\n      <p class=\"country\">{{text2}}</p>\n    </div>\n\n\n    <div *ngIf=\"isLoading\" class=\"loading-overlay\">\n      <ion-spinner name=\"crescent\"></ion-spinner>\n    </div>\n    \n    <!-- Capa oscura con recorte en el centro -->\n    <div class=\"visible-window\"></div>\n\n    <!-- Video de la c\u00E1mara con el overlay centrado -->\n    <div class=\"camera-container\" >\n      <video #videoElement autoplay muted playsinline></video>\n      <!-- <img [src]=\"overlaySrc\" alt=\"Overlay\" class=\"overlay-frame\" /> -->\n    </div>\n\n    <!-- Bot\u00F3n de captura centrado en la parte inferior -->\n    <div class=\"button-container\">\n      <ion-button (click)=\"capturePhoto()\" class=\"capture-button\" shape=\"round\" expand=\"block\">\n        <ion-icon name=\"camera-outline\"></ion-icon>\n      </ion-button>\n    </div>\n\n    <!-- Bot\u00F3n de cerrar en la esquina superior derecha -->\n    <ion-button fill=\"clear\" (click)=\"closeOverlay()\" class=\"close-button\">\n      <ion-icon name=\"close-outline\"></ion-icon>\n    </ion-button>\n  </div>\n\n  <!-- Mostrar la imagen capturada si existe -->\n  <div *ngIf=\"capturedImageUrl\">\n    <h3>Imagen Capturada:</h3>\n    <img [src]=\"capturedImageUrl\" alt=\"Foto capturada\" />\n  </div>\n</ion-content>", styles: ["ion-content {\n  --background: black;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n\n}\n\n.modal-container {\n  max-width: 400px; // Ajusta el valor seg\u00FAn tus necesidades\n\n}\n\n.camera-overlay {\n  position: relative;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n}\n\n.camera-container {\n  width: 100%;\n  height: 100%;\n  position: relative;\n\n  video {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n  }\n}\n\n.overlay-frame {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  max-width: 70%;\n  max-height: 70%;\n  z-index: 9;\n}\n\n.header-text {\n  position: absolute;\n  top: 170px;\n  width: 100%;\n  text-align: center;\n  color: white;\n  z-index: 15;\n\n  p {\n    margin: 0;\n    font-size: 18px;\n  }\n\n  .country {\n    font-weight: bold;\n  }\n}\n\n.button-container {\n  position: absolute;\n  bottom: 50px;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 10;\n}\n\n.capture-button {\n  width: 70px;\n  height: 70px;\n  border-radius: 50%;\n\n\n  --background: var(--purple-primary);\n    --background-hover: var(--purple-secondary);\n    --background-activated: var(--purple-secondary);\n    --background-focused: var(--purple-secondary);\n  \n    --color: white;\n  \n    --border-color: var(--purple-primary);\n    --border-style: solid;\n    --border-width: 1px;\n  \n    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n  \n    --ripple-color: var(--purple-secondary);\n}\n\n.close-button {\n  position: absolute;\n  top: 14px;\n  right: 20px;\n  color: white;\n  z-index: 10;\n}\n\n.visible-window {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  // width: 70%; /* Ajusta el tama\u00F1o del cuadro */\n  // height: 45%; /* Ajusta el tama\u00F1o del cuadro */\n\n  width: 390px; /* Ajusta el tama\u00F1o del cuadro */\n  height: 420px;\n  \n  max-width: 70%;\n  max-height: 70%;\n  background: transparent;\n  border: 2px solid white; /* Color y grosor del borde */\n  border-radius: 10px; /* Ajusta para redondear las esquinas */\n  z-index: 10; /* Aseg\u00FArate de que est\u00E9 encima del overlay oscuro */\n  box-shadow: 0 0 0 100vw rgba(0, 0, 0, 0.85); /* Oscurece fuera del cuadro */\n}\n.text-help  p{\n  display: inline-block; /* Hace que solo el texto ocupe espacio */\n  background-color: white; /* Color de fondo del texto */\n  padding: 5px; /* Espaciado interno para una mejor visualizaci\u00F3n */\n  border-radius: 5px; /* Opcional, para esquinas redondeadas */\n  color: black; /* Color del texto */\n  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombra leve */\n  animation: popIn 1s ease-in-out; /* Agrega la animaci\u00F3n al aparecer */\n}\n\n/* Definimos la animaci\u00F3n \"popIn\" */\n@keyframes popIn {\n  0% {\n    transform: scale(0.8); /* Comienza m\u00E1s peque\u00F1o */\n    opacity: 0; /* Empieza invisible */\n  }\n  50% {\n    transform: scale(1.1); /* Crece un poco m\u00E1s de lo normal */\n    opacity: 1; /* Se hace visible */\n  }\n  100% {\n    transform: scale(1); /* Vuelve a su tama\u00F1o normal */\n  }\n}\n\n.loading-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.8); /* Fondo oscuro semi-transparente */\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000; /* Aseg\u00FArate de que est\u00E9 por encima del contenido */\n}\n\nion-spinner {\n  color: white;\n  width: 50px;\n  height: 50px;\n}"] }]
        }], ctorParameters: () => [{ type: i1.Platform }, { type: i1.ModalController }, { type: i2.DomSanitizer }, { type: i3.ModalDpiServices }], propDecorators: { videoElement: [{
                type: ViewChild,
                args: ['videoElement']
            }], text1: [{
                type: Input
            }], text2: [{
                type: Input
            }], overlaySrc: [{
                type: Input
            }], onTakePicture: [{
                type: Input
            }], closeRequested: [{
                type: Output
            }] } });
//# sourceMappingURL=camera-with-overlay.component.js.map