import { __awaiter } from "tslib";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Camera } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDpiServices } from '../../services/modal-services/modal-dpi-services';
import { Capacitor } from '@capacitor/core';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
import * as i2 from "@angular/platform-browser";
import * as i3 from "../../services/modal-services/modal-dpi-services";
import * as i4 from "@angular/common";
const _c0 = ["videoElement"];
function PhotoSelfieCameraComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelement(1, "ion-spinner", 15);
    i0.ɵɵelementEnd();
} }
export class PhotoSelfieCameraComponent {
    // overlaySrc: String = '';
    constructor(platform, modalController, sanitizer, modalDpiServices) {
        this.platform = platform;
        this.modalController = modalController;
        this.sanitizer = sanitizer;
        this.modalDpiServices = modalDpiServices;
        this.text1 = '';
        this.text2 = '';
        this.closeRequested = new EventEmitter();
        this.capturedImage = null;
        this.stream = null;
        this.isLoading = true;
        this.capturedImageUrl = null;
        this.isAndroid = this.platform.is('android');
        this.isIOS = this.platform.is('ios');
    }
    ngOnDestroy() {
        return __awaiter(this, void 0, void 0, function* () {
            this.stopCamera();
        });
    }
    ngAfterViewInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isAndroid || this.isIOS) {
                yield this.requestPermissions();
            }
            yield this.initCamera();
            this.isLoading = false;
            this.modalDpiServices.closePhotoSelfieSubject$.subscribe(() => {
                this.closeOverlay();
            });
            this.modalDpiServices.resumeCameraSubject$.subscribe(() => {
                this.resumeCamera();
            });
        });
    }
    requestPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            if (Capacitor.getPlatform() !== 'web') {
                if (this.isAndroid || this.isIOS) {
                    const permissions = yield Camera.requestPermissions();
                    if (permissions.camera === 'denied') {
                        console.error('Permiso de cámara denegado');
                        return;
                    }
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
                    },
                    audio: false
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
            if (!this.stream) {
                console.error('La cámara no está inicializada.');
                return;
            }
            ;
            const canvas = document.createElement('canvas');
            const videoElement = this.videoElement.nativeElement;
            canvas.width = videoElement.videoWidth || 1920;
            canvas.height = videoElement.videoHeight || 1080;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                // Convierte el contenido del canvas a un Blob
                canvas.toBlob((blob) => {
                    if (blob && blob.size > 0) {
                        this.file = this.blobToFile(blob, 'dpi.jpeg');
                        videoElement.pause();
                        this.onTakePicture(this.file).catch((err) => console.error('Error en onTakePicture:', err));
                    }
                    else {
                        console.error('El Blob generado está vacío o no válido.');
                    }
                }, 'image/jpeg', 0.75);
                //this.closeOverlay();
            }
        });
    }
    blobToFile(blob, fileName) {
        const b = blob;
        b.lastModified = new Date().getTime();
        b.lastModifiedDate = new Date();
        b.name = fileName;
        //Cast to a File() type
        return b;
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
        this.modalDpiServices.requestClosePhotoSelfieSubject();
    }
    resumeCamera() {
        var _a;
        const videoElement = (_a = this.videoElement) === null || _a === void 0 ? void 0 : _a.nativeElement;
        if (videoElement && videoElement.paused) {
            videoElement.play().catch((error) => {
                console.error('Error al intentar reanudar el video:', error);
            });
        }
    }
}
PhotoSelfieCameraComponent.ɵfac = function PhotoSelfieCameraComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PhotoSelfieCameraComponent)(i0.ɵɵdirectiveInject(i1.Platform), i0.ɵɵdirectiveInject(i1.ModalController), i0.ɵɵdirectiveInject(i2.DomSanitizer), i0.ɵɵdirectiveInject(i3.ModalDpiServices)); };
PhotoSelfieCameraComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PhotoSelfieCameraComponent, selectors: [["app-photo-selfie-camera"]], viewQuery: function PhotoSelfieCameraComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.videoElement = _t.first);
    } }, inputs: { text1: "text1", text2: "text2", onTakePicture: "onTakePicture" }, outputs: { closeRequested: "closeRequested" }, decls: 16, vars: 1, consts: [["videoElement", ""], ["color", "light", 1, "custom-content"], ["class", "loading-overlay", 4, "ngIf"], [1, "ion-no-border"], ["color", "light"], ["slot", "end"], [3, "click"], ["name", "close"], [1, "camera-container"], [1, "video-wrapper"], ["muted", "", "autoplay", "", "playsinline", "", 2, "transform", "scaleX(-1)"], [1, "text-center"], [1, "fixed-footer"], ["expand", "block", 3, "click"], [1, "loading-overlay"], ["name", "crescent"]], template: function PhotoSelfieCameraComponent_Template(rf, ctx) { if (rf & 1) {
        const _r1 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "ion-content", 1);
        i0.ɵɵtemplate(1, PhotoSelfieCameraComponent_div_1_Template, 2, 0, "div", 2);
        i0.ɵɵelementStart(2, "ion-header", 3)(3, "ion-toolbar", 4)(4, "ion-buttons", 5)(5, "ion-button", 6);
        i0.ɵɵlistener("click", function PhotoSelfieCameraComponent_Template_ion_button_click_5_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeOverlay()); });
        i0.ɵɵelement(6, "ion-icon", 7);
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(7, "div", 8)(8, "div", 9);
        i0.ɵɵelement(9, "video", 10, 0);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "p", 11);
        i0.ɵɵtext(12, "Permanece quieto, con tu rostro en el centro del circulo");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "div", 12)(14, "ion-button", 13);
        i0.ɵɵlistener("click", function PhotoSelfieCameraComponent_Template_ion_button_click_14_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.capturePhoto()); });
        i0.ɵɵtext(15, "Tomar foto");
        i0.ɵɵelementEnd()()()();
    } if (rf & 2) {
        i0.ɵɵadvance();
        i0.ɵɵproperty("ngIf", ctx.isLoading);
    } }, dependencies: [i4.NgIf, i1.IonButton, i1.IonButtons, i1.IonContent, i1.IonHeader, i1.IonIcon, i1.IonSpinner, i1.IonToolbar], styles: [".camera-container[_ngcontent-%COMP%] {\n    justify-content: center;\n    align-items: center;\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    height: 70%;\n    background-color: white;\n  }\n  \n  .video-wrapper[_ngcontent-%COMP%] {\n    position: relative;\n    width: 300px;\n    height: 300px;\n    border-radius: 50%;\n    overflow: hidden;\n  }\n  \n  video[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: 50%;\n  }\n  \n  .progress-ring[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    transform: rotate(-90deg); \n\n  }\n  \n  .progress-ring__circle[_ngcontent-%COMP%] {\n    fill: transparent;\n    stroke: purple;\n    stroke-width: 12;\n    stroke-dasharray: 945; \n\n    stroke-dashoffset: 880; \n\n    transition: stroke-dashoffset 12s linear; \n\n  }\n  \n  .progress-active[_ngcontent-%COMP%]   .progress-ring__circle[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_progress-animation 5s linear forwards;\n  }\n  \n  @keyframes _ngcontent-%COMP%_progress-animation {\n    from {\n      stroke-dashoffset: 880;\n    }\n    to {\n      stroke-dashoffset: 0;\n    }\n  }\n  \n  //[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   //[_ngcontent-%COMP%]  {\n  //   color: #ffffff;\n  //   font-weight: 50px;\n  //   border-radius: 20px;\n  //   margin-top: 20px;\n  //   //width: 90%;\n  //   //max-width: 300px;\n  //   align-self: center;\n  //   text-transform: none;\n  \n  //   --background: var(--purple-primary);\n  //   --background-hover: var(--purple-secondary);\n  //   --background-activated: var(--purple-secondary);\n  //   --background-focused: var(--purple-secondary);\n  \n  //   --color: var(--purple-primary);\n  \n  //   --border-radius: 20px;\n  //   --border-color: var(--purple-primary);\n  //   --border-style: solid;\n  //   --border-width: 1px;\n  \n  //   --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n  \n  //   --ripple-color: var(--purple-secondary);\n  \n  \n  //   --padding-top: 10px;\n  //   --padding-bottom: 10px;\n  // }\n  \n  .text-container[_ngcontent-%COMP%] {\n    height: 40px;\n    color: black;\n  }\n  \n  ion-header[_ngcontent-%COMP%] {\n    --background: #ffffff; \n\n  }\n  \n  \n  \n  .centered-title[_ngcontent-%COMP%] {\n    text-align: center;\n    width: 100%; \n\n    font-weight: bold;\n  }\n  \n  .fixed-footer[_ngcontent-%COMP%] {\n  \n    position: fixed;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    padding: 10px;\n    background-color: #fff; // Color de fondo, opcional\n   // box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);\n  \n    ion-button {\n      width: 90%;\n      max-width: 300px;\n      margin: 0 auto;\n      background-color: #ffcc00;\n      color: #ffffff;\n      font-weight: bold;\n      border-radius: 20px;\n  \n      --background: var(--purple-primary);\n      --background-hover: var(--purple-secondary);\n      --background-activated: var(--purple-secondary);\n      --background-focused: var(--purple-secondary);\n    \n      --color: var(--purple-primary);\n    \n      --border-radius: 20px;\n      --border-color: var(--purple-primary);\n      --border-style: solid;\n      --border-width: 1px;\n    \n      --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n    \n      --ripple-color: var(--purple-secondary);\n    \n  \n      &:hover {\n        background-color: #ffb300;\n      }\n  \n      &:active {\n        background-color: #e6a800;\n      }\n    }\n  }\n  \n  \n  ion-header[_ngcontent-%COMP%] {\n    --background: #ffffff; \n\n    color: #000000; \n\n  }\n  \n  ion-toolbar[_ngcontent-%COMP%] {\n    --ion-background-color: #ffffff !important;\n    --background: #ffffff !important;\n    color: #000000;\n  }\n  \n  \n  ion-header[_ngcontent-%COMP%] {\n    --background: #ffffff; \n\n  }\n  \n  ion-toolbar[_ngcontent-%COMP%] {\n    --ion-background-color: #ffffff !important;\n    --background: #ffffff !important;\n    color: #000000;\n    display: flex;\n    justify-content: space-between; \n\n    align-items: center;\n  }\n  \n  .centered-title[_ngcontent-%COMP%] {\n    flex: 1;\n    text-align: center; \n\n    font-weight: bold;\n    color: #000000;\n    margin: 0; \n\n  }\n  \n  ion-buttons[_ngcontent-%COMP%] {\n    justify-content: flex-end; \n\n  }\n  .countdown-overlay[_ngcontent-%COMP%] {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.6); \n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin: 0;\n    padding: 0;\n    z-index: 1000; \n\n    animation: _ngcontent-%COMP%_fadeIn 0.5s ease-out, _ngcontent-%COMP%_fadeOut 0.5s ease-out 2.5s; \n\n    box-sizing: border-box;\n    border-radius: 0px;\n  \n  }\n  \n  ion-content.custom-content[_ngcontent-%COMP%] {\n    --padding-top: 0;\n    --padding-bottom: 0;\n    margin: 0;\n    padding: 0;\n  }\n  \n  .countdown[_ngcontent-%COMP%] {\n    font-size: 100px;\n    font-weight: bold;\n    color: white;\n    animation: _ngcontent-%COMP%_scaleUp 0.5s ease-out, _ngcontent-%COMP%_scaleDown 0.5s ease-out 2.5s; \n\n  }\n  \n  \n\n  @keyframes _ngcontent-%COMP%_fadeIn {\n    from {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n  }\n  \n  @keyframes _ngcontent-%COMP%_fadeOut {\n    from {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n    }\n  }\n  \n  \n\n  @keyframes _ngcontent-%COMP%_scaleUp {\n    from {\n      transform: scale(0.8);\n      opacity: 0;\n    }\n    to {\n      transform: scale(1);\n      opacity: 1;\n    }\n  }\n  \n  @keyframes _ngcontent-%COMP%_scaleDown {\n    from {\n      transform: scale(1);\n      opacity: 1;\n    }\n    to {\n      transform: scale(0.8);\n      opacity: 0;\n    }\n  }\n  \n  .red[_ngcontent-%COMP%] {\n    padding: 10px;\n    color: red;\n  }\n  \n  .text-center[_ngcontent-%COMP%]{\n    text-align: center;\n    padding-left: 20%;\n    padding-right: 20%;\n    color: #333;\n  }\n  \n  .loading-overlay[_ngcontent-%COMP%] {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.8); \n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 1000; \n\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n    border-radius: 0px;\n  }\n  \n  ion-spinner[_ngcontent-%COMP%] {\n    color: white;\n    width: 50px;\n    height: 50px;\n  }"] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PhotoSelfieCameraComponent, [{
        type: Component,
        args: [{ selector: 'app-photo-selfie-camera', encapsulation: ViewEncapsulation.Emulated, template: "<ion-content color=\"light\" class=\"custom-content\">\n    <div *ngIf=\"isLoading\" class=\"loading-overlay\">\n      <ion-spinner name=\"crescent\"></ion-spinner>\n    </div>\n    \n    <ion-header class=\"ion-no-border\">\n      <ion-toolbar color=\"light\">\n        <!-- <ion-title class=\"centered-title\">Video Selfie</ion-title> -->\n        <ion-buttons slot=\"end\">\n          <ion-button (click)=\"closeOverlay()\">\n            <ion-icon name=\"close\"></ion-icon>\n          </ion-button>\n        </ion-buttons>\n      </ion-toolbar>\n    </ion-header>\n  \n    <!-- Contenedor de la c\u00E1mara y progresi\u00F3n -->\n    <div class=\"camera-container\">\n      <div class=\"video-wrapper\">\n        <video #videoElement muted autoplay playsinline style=\"transform: scaleX(-1)\"></video>\n      </div>\n\n          <p class=\"text-center\">Permanece quieto, con tu rostro en el centro del circulo</p>\n          <!-- Botones de grabaci\u00F3n -->\n          <div class=\"fixed-footer\">\n            <ion-button expand=\"block\" (click)=\"capturePhoto()\">Tomar foto</ion-button>\n          </div>\n    </div>\n  </ion-content>", styles: [".camera-container {\n    justify-content: center;\n    align-items: center;\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    height: 70%;\n    background-color: white;\n  }\n  \n  .video-wrapper {\n    position: relative;\n    width: 300px;\n    height: 300px;\n    border-radius: 50%;\n    overflow: hidden;\n  }\n  \n  video {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: 50%;\n  }\n  \n  .progress-ring {\n    position: absolute;\n    top: 0;\n    left: 0;\n    transform: rotate(-90deg); /* Rotamos el c\u00EDrculo para que la animaci\u00F3n inicie desde arriba */\n  }\n  \n  .progress-ring__circle {\n    fill: transparent;\n    stroke: purple;\n    stroke-width: 12;\n    stroke-dasharray: 945; /* La circunferencia del c\u00EDrculo  880*/\n    stroke-dashoffset: 880; /* Oculto por completo al inicio */\n    transition: stroke-dashoffset 12s linear; /* Esto controlar\u00E1 el llenado progresivo */\n  }\n  \n  .progress-active .progress-ring__circle {\n    animation: progress-animation 5s linear forwards;\n  }\n  \n  @keyframes progress-animation {\n    from {\n      stroke-dashoffset: 880;\n    }\n    to {\n      stroke-dashoffset: 0;\n    }\n  }\n  \n  // div \n  //  {\n  //   color: #ffffff;\n  //   font-weight: 50px;\n  //   border-radius: 20px;\n  //   margin-top: 20px;\n  //   //width: 90%;\n  //   //max-width: 300px;\n  //   align-self: center;\n  //   text-transform: none;\n  \n  //   --background: var(--purple-primary);\n  //   --background-hover: var(--purple-secondary);\n  //   --background-activated: var(--purple-secondary);\n  //   --background-focused: var(--purple-secondary);\n  \n  //   --color: var(--purple-primary);\n  \n  //   --border-radius: 20px;\n  //   --border-color: var(--purple-primary);\n  //   --border-style: solid;\n  //   --border-width: 1px;\n  \n  //   --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n  \n  //   --ripple-color: var(--purple-secondary);\n  \n  \n  //   --padding-top: 10px;\n  //   --padding-bottom: 10px;\n  // }\n  \n  .text-container {\n    height: 40px;\n    color: black;\n  }\n  \n  ion-header {\n    --background: #ffffff; /* Fondo blanco para el header */\n  }\n  \n  \n  \n  .centered-title {\n    text-align: center;\n    width: 100%; /* Asegura que el t\u00EDtulo est\u00E9 centrado */\n    font-weight: bold;\n  }\n  \n  .fixed-footer {\n  \n    position: fixed;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    padding: 10px;\n    background-color: #fff; // Color de fondo, opcional\n   // box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);\n  \n    ion-button {\n      width: 90%;\n      max-width: 300px;\n      margin: 0 auto;\n      background-color: #ffcc00;\n      color: #ffffff;\n      font-weight: bold;\n      border-radius: 20px;\n  \n      --background: var(--purple-primary);\n      --background-hover: var(--purple-secondary);\n      --background-activated: var(--purple-secondary);\n      --background-focused: var(--purple-secondary);\n    \n      --color: var(--purple-primary);\n    \n      --border-radius: 20px;\n      --border-color: var(--purple-primary);\n      --border-style: solid;\n      --border-width: 1px;\n    \n      --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n    \n      --ripple-color: var(--purple-secondary);\n    \n  \n      &:hover {\n        background-color: #ffb300;\n      }\n  \n      &:active {\n        background-color: #e6a800;\n      }\n    }\n  }\n  \n  \n  ion-header {\n    --background: #ffffff; /* Fondo blanco */\n    color: #000000; /* Texto negro */\n  }\n  \n  ion-toolbar {\n    --ion-background-color: #ffffff !important;\n    --background: #ffffff !important;\n    color: #000000;\n  }\n  \n  \n  ion-header {\n    --background: #ffffff; /* Fondo blanco */\n  }\n  \n  ion-toolbar {\n    --ion-background-color: #ffffff !important;\n    --background: #ffffff !important;\n    color: #000000;\n    display: flex;\n    justify-content: space-between; /* Espacio entre t\u00EDtulo y bot\u00F3n */\n    align-items: center;\n  }\n  \n  .centered-title {\n    flex: 1;\n    text-align: center; /* Centrar el t\u00EDtulo */\n    font-weight: bold;\n    color: #000000;\n    margin: 0; /* Quita cualquier margen del t\u00EDtulo */\n  }\n  \n  ion-buttons {\n    justify-content: flex-end; /* Alinea el bot\u00F3n a la derecha */\n  }\n  .countdown-overlay {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.6); /* Fondo semi-transparente */\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin: 0;\n    padding: 0;\n    z-index: 1000; /* Asegurarse de que est\u00E9 encima de otros elementos */\n    animation: fadeIn 0.5s ease-out, fadeOut 0.5s ease-out 2.5s; /* Animaciones de entrada y salida */\n    box-sizing: border-box;\n    border-radius: 0px;\n  \n  }\n  \n  ion-content.custom-content {\n    --padding-top: 0;\n    --padding-bottom: 0;\n    margin: 0;\n    padding: 0;\n  }\n  \n  .countdown {\n    font-size: 100px;\n    font-weight: bold;\n    color: white;\n    animation: scaleUp 0.5s ease-out, scaleDown 0.5s ease-out 2.5s; /* Escalar en entrada y salida */\n  }\n  \n  /* Animaci\u00F3n para desvanecer la superposici\u00F3n */\n  @keyframes fadeIn {\n    from {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n  }\n  \n  @keyframes fadeOut {\n    from {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n    }\n  }\n  \n  /* Animaci\u00F3n para escalar el n\u00FAmero */\n  @keyframes scaleUp {\n    from {\n      transform: scale(0.8);\n      opacity: 0;\n    }\n    to {\n      transform: scale(1);\n      opacity: 1;\n    }\n  }\n  \n  @keyframes scaleDown {\n    from {\n      transform: scale(1);\n      opacity: 1;\n    }\n    to {\n      transform: scale(0.8);\n      opacity: 0;\n    }\n  }\n  \n  .red {\n    padding: 10px;\n    color: red;\n  }\n  \n  .text-center{\n    text-align: center;\n    padding-left: 20%;\n    padding-right: 20%;\n    color: #333;\n  }\n  \n  .loading-overlay {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.8); /* Fondo oscuro semi-transparente */\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 1000; /* Aseg\u00FArate de que est\u00E9 por encima del contenido */\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n    border-radius: 0px;\n  }\n  \n  ion-spinner {\n    color: white;\n    width: 50px;\n    height: 50px;\n  }"] }]
    }], () => [{ type: i1.Platform }, { type: i1.ModalController }, { type: i2.DomSanitizer }, { type: i3.ModalDpiServices }], { videoElement: [{
            type: ViewChild,
            args: ['videoElement']
        }], text1: [{
            type: Input
        }], text2: [{
            type: Input
        }], onTakePicture: [{
            type: Input
        }], closeRequested: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PhotoSelfieCameraComponent, { className: "PhotoSelfieCameraComponent" }); })();
//# sourceMappingURL=photo-selfie-camera.component.js.map