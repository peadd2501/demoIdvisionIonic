import { __awaiter } from "tslib";
import { ChangeDetectorRef, Component, ElementRef, Input, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Camera } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDpiServices } from '../../services/modal-services/modal-dpi-services';
import { ModalVideoSelfieServices } from '../../services/modal-services/modal-video-selfie-services';
import { ScreenBrightness } from '@capacitor-community/screen-brightness';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
import * as i2 from "@angular/platform-browser";
import * as i3 from "../../services/modal-services/modal-dpi-services";
import * as i4 from "../../services/modal-services/modal-video-selfie-services";
import * as i5 from "@angular/common";
const _c0 = ["videoElement"];
const _c1 = ["progressRing"];
const _c2 = a0 => ({ "red": a0 });
function CamaraVideoSelfieComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵelement(1, "ion-spinner", 21);
    i0.ɵɵelementEnd();
} }
function CamaraVideoSelfieComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22)(1, "div", 23);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.countdown);
} }
function CamaraVideoSelfieComponent_ion_button_20_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ion-button", 24);
    i0.ɵɵlistener("click", function CamaraVideoSelfieComponent_ion_button_20_Template_ion_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.recordVideo()); });
    i0.ɵɵtext(1, "Iniciar Grabaci\u00F3n");
    i0.ɵɵelementEnd();
} }
function CamaraVideoSelfieComponent_ion_button_21_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ion-button", 25);
    i0.ɵɵlistener("click", function CamaraVideoSelfieComponent_ion_button_21_Template_ion_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.stopRecording()); });
    i0.ɵɵtext(1, "Detener Grabaci\u00F3n");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", !ctx_r1.canStopRecording);
} }
export class CamaraVideoSelfieComponent {
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
        this.minRecordingTime = 3000; // 3 seconds
        this.maxRecordingTime = 5000; // 5 seconds
        this.timeRemaining = this.maxRecordingTime / 1000; // Inicializar con el tiempo máximo en segundos
        this.canStopRecording = true;
        this.isLoading = true; // Variable para mostrar el loader
        this.defaultBrightness = null; // Para guardar el brillo original del dispositivo
        this.isAndroid = this.platform.is('android');
        this.isIOS = this.platform.is('ios');
    }
    ngAfterViewInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isAndroid || this.isIOS) {
                const { brightness } = yield ScreenBrightness.getBrightness();
                this.defaultBrightness = brightness;
                yield ScreenBrightness.setBrightness({ brightness: 1.0 });
                yield this.requestPermissions();
            }
            yield this.initCamera();
            // await this.startRecording();
            yield this.waitForCameraReady();
            this.modaldpiServices.closeOverlay$.subscribe(() => {
                this.closeOverlay();
            });
        });
    }
    waitForCameraReady() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.videoElement.nativeElement.onloadedmetadata = () => {
                    resolve();
                };
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
            let isCameraReady = false;
            try {
                const constraints = {
                    video: {
                        width: { ideal: 640 },
                        height: { ideal: 480 },
                        facingMode: 'user',
                    },
                };
                this.stream = yield navigator.mediaDevices.getUserMedia(constraints);
                this.videoElement.nativeElement.srcObject = this.stream;
                // Esperar hasta que la cámara esté lista
                this.videoElement.nativeElement.onloadedmetadata = () => {
                    isCameraReady = true;
                };
                // Espera activa para asegurarte de que está lista
                yield new Promise((resolve) => {
                    const interval = setInterval(() => {
                        if (isCameraReady) {
                            clearInterval(interval);
                            resolve(true);
                        }
                    }, 100);
                });
                this.isLoading = false;
                yield this.startRecording();
            }
            catch (error) {
                console.error('Error al inicializar la cámara:', error);
                this.isLoading = false;
            }
        });
    }
    startRecording() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.stream)
                return;
            const options = {
                mimeType: this.isIOS ? 'video/mp4' : 'video/webm',
                videoBitsPerSecond: 400000,
            };
            this.mediaRecorder = new MediaRecorder(this.stream, options);
            let chunks = [];
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
                else {
                }
            };
            this.mediaRecorder.onstop = () => __awaiter(this, void 0, void 0, function* () {
                if (chunks.length === 0) {
                    console.error('No se capturaron datos en la grabación.');
                    return;
                }
                const fileType = this.isIOS ? 'video/mp4' : 'video/webm';
                const fileExtension = this.isIOS ? 'mp4' : 'webm';
                const videoBlob = new Blob(chunks, { type: fileType });
                const videoFile = new File([videoBlob], `video-selfie.${fileExtension}`, {
                    type: fileType,
                });
                // console.log('Archivo generado en el hijo:', videoFile);
                if (this.backFunction) {
                    // console.log('Enviando archivo al padre:', videoFile);
                    yield this.backFunction(videoFile);
                }
            });
            // Inicia la animación de borde progresiva
            // this.renderer.addClass(this.progressRing.nativeElement, 'progress-active');
            // Detiene la grabación después de 10 segundos
            // setTimeout(async () => {
            //   await this.stopRecording();
            // }, 10000);
        });
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
        return __awaiter(this, void 0, void 0, function* () {
            if (this.mediaRecorder && !this.isRecording) {
                yield new Promise((resolve) => setTimeout(resolve, 500));
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
                this.recordingTimer = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield this.stopRecording();
                }), this.maxRecordingTime);
            }
        });
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
    stopRecording() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.mediaRecorder && this.isRecording && this.canStopRecording) {
                yield this.backFunction(this.capVideo);
                this.mediaRecorder.stop();
                this.isRecording = false;
            }
            if (this.scanTimeout) {
                clearTimeout(this.scanTimeout);
            }
            // Detiene la animación del borde circular
            this.renderer.removeClass(this.progressRing.nativeElement, 'progress-active');
        });
    }
    closeOverlay() {
        return __awaiter(this, void 0, void 0, function* () {
            this.stopCamera();
            // Restaura el brillo original si estaba guardado
            if (this.defaultBrightness !== null) {
                yield ScreenBrightness.setBrightness({
                    brightness: this.defaultBrightness,
                });
            }
            this.modalController.dismiss();
        });
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
}
CamaraVideoSelfieComponent.ɵfac = function CamaraVideoSelfieComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CamaraVideoSelfieComponent)(i0.ɵɵdirectiveInject(i1.Platform), i0.ɵɵdirectiveInject(i1.ModalController), i0.ɵɵdirectiveInject(i2.DomSanitizer), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i1.AlertController), i0.ɵɵdirectiveInject(i3.ModalDpiServices), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i4.ModalVideoSelfieServices)); };
CamaraVideoSelfieComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CamaraVideoSelfieComponent, selectors: [["app-camara-video-selfie"]], viewQuery: function CamaraVideoSelfieComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
        i0.ɵɵviewQuery(_c1, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.videoElement = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.progressRing = _t.first);
    } }, inputs: { text1: "text1", text2: "text2", backFunction: "backFunction" }, decls: 22, vars: 9, consts: [["videoElement", ""], ["progressRing", ""], ["color", "light", 1, "custom-content"], ["class", "loading-overlay", 4, "ngIf"], ["class", "countdown-overlay", 4, "ngIf"], [1, "ion-no-border"], ["color", "light"], ["slot", "end"], [3, "click", "disabled"], ["name", "close"], [1, "camera-container"], [1, "video-wrapper"], ["muted", "", "autoplay", "", "playsinline", ""], ["width", "300", "height", "300", 1, "progress-ring"], ["cx", "150", "cy", "150", "r", "150", 1, "progress-ring__circle"], [3, "ngClass"], [1, "text-center"], [1, "fixed-footer"], ["expand", "block", 3, "click", 4, "ngIf"], ["expand", "block", 3, "disabled", "click", 4, "ngIf"], [1, "loading-overlay"], ["name", "crescent"], [1, "countdown-overlay"], [1, "countdown"], ["expand", "block", 3, "click"], ["expand", "block", 3, "click", "disabled"]], template: function CamaraVideoSelfieComponent_Template(rf, ctx) { if (rf & 1) {
        const _r1 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "ion-content", 2);
        i0.ɵɵtemplate(1, CamaraVideoSelfieComponent_div_1_Template, 2, 0, "div", 3)(2, CamaraVideoSelfieComponent_div_2_Template, 3, 1, "div", 4);
        i0.ɵɵelementStart(3, "ion-header", 5)(4, "ion-toolbar", 6)(5, "ion-buttons", 7)(6, "ion-button", 8);
        i0.ɵɵlistener("click", function CamaraVideoSelfieComponent_Template_ion_button_click_6_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeOverlay()); });
        i0.ɵɵelement(7, "ion-icon", 9);
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(8, "div", 10)(9, "div", 11);
        i0.ɵɵelement(10, "video", 12, 0);
        i0.ɵɵnamespaceSVG();
        i0.ɵɵelementStart(12, "svg", 13, 1);
        i0.ɵɵelement(14, "circle", 14);
        i0.ɵɵelementEnd()();
        i0.ɵɵnamespaceHTML();
        i0.ɵɵelementStart(15, "ion-label", 15);
        i0.ɵɵtext(16);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "p", 16);
        i0.ɵɵtext(18, "Permanece quieto, con tu rostro en el centro del circulo");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "div", 17);
        i0.ɵɵtemplate(20, CamaraVideoSelfieComponent_ion_button_20_Template, 2, 0, "ion-button", 18)(21, CamaraVideoSelfieComponent_ion_button_21_Template, 2, 1, "ion-button", 19);
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵadvance();
        i0.ɵɵproperty("ngIf", ctx.isLoading);
        i0.ɵɵadvance();
        i0.ɵɵproperty("ngIf", ctx.countdown > 0);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("disabled", !ctx.canStopRecording);
        i0.ɵɵadvance(9);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(7, _c2, ctx.isRecording));
        i0.ɵɵadvance();
        i0.ɵɵtextInterpolate1("00:", ctx.timeRemaining < 10 ? "0" + ctx.timeRemaining : ctx.timeRemaining, "");
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngIf", !ctx.isRecording);
        i0.ɵɵadvance();
        i0.ɵɵproperty("ngIf", ctx.isRecording);
    } }, dependencies: [i5.NgClass, i5.NgIf, i1.IonButton, i1.IonButtons, i1.IonContent, i1.IonHeader, i1.IonIcon, i1.IonLabel, i1.IonSpinner, i1.IonToolbar], styles: [".camera-container {\n  justify-content: center;\n  align-items: center;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 70%;\n  background-color: white;\n}\n\n.video-wrapper {\n  position: relative;\n  width: 300px;\n  height: 300px;\n  border-radius: 50%;\n  overflow: hidden;\n}\n\nvideo {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  border-radius: 50%;\n}\n\n.progress-ring {\n  position: absolute;\n  top: 0;\n  left: 0;\n  transform: rotate(-90deg); /* Rotamos el c\u00EDrculo para que la animaci\u00F3n inicie desde arriba */\n}\n\n.progress-ring__circle {\n  fill: transparent;\n  stroke: purple;\n  stroke-width: 12;\n  stroke-dasharray: 945; /* La circunferencia del c\u00EDrculo  880*/\n  stroke-dashoffset: 880; /* Oculto por completo al inicio */\n  transition: stroke-dashoffset 12s linear; /* Esto controlar\u00E1 el llenado progresivo */\n}\n\n.progress-active .progress-ring__circle {\n  animation: progress-animation 5s linear forwards;\n}\n\n@keyframes progress-animation {\n  from {\n    stroke-dashoffset: 880;\n  }\n  to {\n    stroke-dashoffset: 0;\n  }\n}\n\n// div \n//  {\n//   color: #ffffff;\n//   font-weight: 50px;\n//   border-radius: 20px;\n//   margin-top: 20px;\n//   //width: 90%;\n//   //max-width: 300px;\n//   align-self: center;\n//   text-transform: none;\n\n//   --background: var(--purple-primary);\n//   --background-hover: var(--purple-secondary);\n//   --background-activated: var(--purple-secondary);\n//   --background-focused: var(--purple-secondary);\n\n//   --color: var(--purple-primary);\n\n//   --border-radius: 20px;\n//   --border-color: var(--purple-primary);\n//   --border-style: solid;\n//   --border-width: 1px;\n\n//   --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n\n//   --ripple-color: var(--purple-secondary);\n\n\n//   --padding-top: 10px;\n//   --padding-bottom: 10px;\n// }\n\n.text-container {\n  height: 40px;\n  color: black;\n}\n\nion-header {\n  --background: #ffffff; /* Fondo blanco para el header */\n}\n\n\n\n.centered-title {\n  text-align: center;\n  width: 100%; /* Asegura que el t\u00EDtulo est\u00E9 centrado */\n  font-weight: bold;\n}\n\n.fixed-footer {\n\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  padding: 10px;\n  background-color: #fff; // Color de fondo, opcional\n // box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);\n\n  ion-button {\n    width: 90%;\n    max-width: 300px;\n    margin: 0 auto;\n    background-color: #ffcc00;\n    color: #ffffff;\n    font-weight: bold;\n    border-radius: 20px;\n\n    --background: var(--purple-primary);\n    --background-hover: var(--purple-secondary);\n    --background-activated: var(--purple-secondary);\n    --background-focused: var(--purple-secondary);\n  \n    --color: var(--purple-primary);\n  \n    --border-radius: 20px;\n    --border-color: var(--purple-primary);\n    --border-style: solid;\n    --border-width: 1px;\n  \n    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n  \n    --ripple-color: var(--purple-secondary);\n  \n\n    &:hover {\n      background-color: #ffb300;\n    }\n\n    &:active {\n      background-color: #e6a800;\n    }\n  }\n}\n\n\nion-header {\n  --background: #ffffff; /* Fondo blanco */\n  color: #000000; /* Texto negro */\n}\n\nion-toolbar {\n  --ion-background-color: #ffffff !important;\n  --background: #ffffff !important;\n  color: #000000;\n}\n\n\nion-header {\n  --background: #ffffff; /* Fondo blanco */\n}\n\nion-toolbar {\n  --ion-background-color: #ffffff !important;\n  --background: #ffffff !important;\n  color: #000000;\n  display: flex;\n  justify-content: space-between; /* Espacio entre t\u00EDtulo y bot\u00F3n */\n  align-items: center;\n}\n\n.centered-title {\n  flex: 1;\n  text-align: center; /* Centrar el t\u00EDtulo */\n  font-weight: bold;\n  color: #000000;\n  margin: 0; /* Quita cualquier margen del t\u00EDtulo */\n}\n\nion-buttons {\n  justify-content: flex-end; /* Alinea el bot\u00F3n a la derecha */\n}\n.countdown-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.6); /* Fondo semi-transparente */\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0;\n  padding: 0;\n  z-index: 1000; /* Asegurarse de que est\u00E9 encima de otros elementos */\n  animation: fadeIn 0.5s ease-out, fadeOut 0.5s ease-out 2.5s; /* Animaciones de entrada y salida */\n  box-sizing: border-box;\n  border-radius: 0px;\n\n}\n\nion-content.custom-content {\n  --padding-top: 0;\n  --padding-bottom: 0;\n  margin: 0;\n  padding: 0;\n}\n\n.countdown {\n  font-size: 100px;\n  font-weight: bold;\n  color: white;\n  animation: scaleUp 0.5s ease-out, scaleDown 0.5s ease-out 2.5s; /* Escalar en entrada y salida */\n}\n\n/* Animaci\u00F3n para desvanecer la superposici\u00F3n */\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n/* Animaci\u00F3n para escalar el n\u00FAmero */\n@keyframes scaleUp {\n  from {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n\n@keyframes scaleDown {\n  from {\n    transform: scale(1);\n    opacity: 1;\n  }\n  to {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n}\n\n.red {\n  padding: 10px;\n  color: red;\n}\n\n.text-center{\n  text-align: center;\n  padding-left: 20%;\n  padding-right: 20%;\n  color: #333;\n}\n\n.loading-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.8); /* Fondo oscuro semi-transparente */\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000; /* Aseg\u00FArate de que est\u00E9 por encima del contenido */\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  border-radius: 0px;\n}\n\nion-spinner {\n  color: white;\n  width: 50px;\n  height: 50px;\n}"], encapsulation: 2 });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CamaraVideoSelfieComponent, [{
        type: Component,
        args: [{ selector: 'app-camara-video-selfie', encapsulation: ViewEncapsulation.None, template: "<ion-content color=\"light\" class=\"custom-content\">\n  <div *ngIf=\"isLoading\" class=\"loading-overlay\">\n    <ion-spinner name=\"crescent\"></ion-spinner>\n  </div>\n  \n  <div *ngIf=\"countdown > 0\" class=\"countdown-overlay\">\n    <div class=\"countdown\">{{ countdown }}</div>\n  </div>\n  <ion-header class=\"ion-no-border\">\n    <ion-toolbar color=\"light\">\n      <!-- <ion-title class=\"centered-title\">Video Selfie</ion-title> -->\n      <ion-buttons slot=\"end\">\n        <ion-button (click)=\"closeOverlay()\" [disabled]=\"!canStopRecording\">\n          <ion-icon name=\"close\"></ion-icon>\n        </ion-button>\n      </ion-buttons>\n    </ion-toolbar>\n  </ion-header>\n\n  <!-- Contenedor de la c\u00E1mara y progresi\u00F3n -->\n  <div class=\"camera-container\">\n    <div class=\"video-wrapper\">\n      <video #videoElement muted autoplay playsinline></video>\n      <svg class=\"progress-ring\" #progressRing width=\"300\" height=\"300\">\n        <circle class=\"progress-ring__circle\" cx=\"150\" cy=\"150\" r=\"150\" />\n      </svg>\n    </div>\n    <ion-label [ngClass]=\"{'red': isRecording}\">00:{{ timeRemaining < 10 ? '0' + timeRemaining : timeRemaining\n        }}</ion-label>\n        <p class=\"text-center\">Permanece quieto, con tu rostro en el centro del circulo</p>\n        <!-- Botones de grabaci\u00F3n -->\n        <div class=\"fixed-footer\">\n          <ion-button *ngIf=\"!isRecording\" expand=\"block\" (click)=\"recordVideo()\">Iniciar Grabaci\u00F3n</ion-button>\n          <ion-button *ngIf=\"isRecording\" expand=\"block\" (click)=\"stopRecording()\" [disabled]=\"!canStopRecording\">Detener\n            Grabaci\u00F3n</ion-button>\n        </div>\n  </div>\n</ion-content>", styles: [".camera-container {\n  justify-content: center;\n  align-items: center;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 70%;\n  background-color: white;\n}\n\n.video-wrapper {\n  position: relative;\n  width: 300px;\n  height: 300px;\n  border-radius: 50%;\n  overflow: hidden;\n}\n\nvideo {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  border-radius: 50%;\n}\n\n.progress-ring {\n  position: absolute;\n  top: 0;\n  left: 0;\n  transform: rotate(-90deg); /* Rotamos el c\u00EDrculo para que la animaci\u00F3n inicie desde arriba */\n}\n\n.progress-ring__circle {\n  fill: transparent;\n  stroke: purple;\n  stroke-width: 12;\n  stroke-dasharray: 945; /* La circunferencia del c\u00EDrculo  880*/\n  stroke-dashoffset: 880; /* Oculto por completo al inicio */\n  transition: stroke-dashoffset 12s linear; /* Esto controlar\u00E1 el llenado progresivo */\n}\n\n.progress-active .progress-ring__circle {\n  animation: progress-animation 5s linear forwards;\n}\n\n@keyframes progress-animation {\n  from {\n    stroke-dashoffset: 880;\n  }\n  to {\n    stroke-dashoffset: 0;\n  }\n}\n\n// div \n//  {\n//   color: #ffffff;\n//   font-weight: 50px;\n//   border-radius: 20px;\n//   margin-top: 20px;\n//   //width: 90%;\n//   //max-width: 300px;\n//   align-self: center;\n//   text-transform: none;\n\n//   --background: var(--purple-primary);\n//   --background-hover: var(--purple-secondary);\n//   --background-activated: var(--purple-secondary);\n//   --background-focused: var(--purple-secondary);\n\n//   --color: var(--purple-primary);\n\n//   --border-radius: 20px;\n//   --border-color: var(--purple-primary);\n//   --border-style: solid;\n//   --border-width: 1px;\n\n//   --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n\n//   --ripple-color: var(--purple-secondary);\n\n\n//   --padding-top: 10px;\n//   --padding-bottom: 10px;\n// }\n\n.text-container {\n  height: 40px;\n  color: black;\n}\n\nion-header {\n  --background: #ffffff; /* Fondo blanco para el header */\n}\n\n\n\n.centered-title {\n  text-align: center;\n  width: 100%; /* Asegura que el t\u00EDtulo est\u00E9 centrado */\n  font-weight: bold;\n}\n\n.fixed-footer {\n\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  padding: 10px;\n  background-color: #fff; // Color de fondo, opcional\n // box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);\n\n  ion-button {\n    width: 90%;\n    max-width: 300px;\n    margin: 0 auto;\n    background-color: #ffcc00;\n    color: #ffffff;\n    font-weight: bold;\n    border-radius: 20px;\n\n    --background: var(--purple-primary);\n    --background-hover: var(--purple-secondary);\n    --background-activated: var(--purple-secondary);\n    --background-focused: var(--purple-secondary);\n  \n    --color: var(--purple-primary);\n  \n    --border-radius: 20px;\n    --border-color: var(--purple-primary);\n    --border-style: solid;\n    --border-width: 1px;\n  \n    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n  \n    --ripple-color: var(--purple-secondary);\n  \n\n    &:hover {\n      background-color: #ffb300;\n    }\n\n    &:active {\n      background-color: #e6a800;\n    }\n  }\n}\n\n\nion-header {\n  --background: #ffffff; /* Fondo blanco */\n  color: #000000; /* Texto negro */\n}\n\nion-toolbar {\n  --ion-background-color: #ffffff !important;\n  --background: #ffffff !important;\n  color: #000000;\n}\n\n\nion-header {\n  --background: #ffffff; /* Fondo blanco */\n}\n\nion-toolbar {\n  --ion-background-color: #ffffff !important;\n  --background: #ffffff !important;\n  color: #000000;\n  display: flex;\n  justify-content: space-between; /* Espacio entre t\u00EDtulo y bot\u00F3n */\n  align-items: center;\n}\n\n.centered-title {\n  flex: 1;\n  text-align: center; /* Centrar el t\u00EDtulo */\n  font-weight: bold;\n  color: #000000;\n  margin: 0; /* Quita cualquier margen del t\u00EDtulo */\n}\n\nion-buttons {\n  justify-content: flex-end; /* Alinea el bot\u00F3n a la derecha */\n}\n.countdown-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.6); /* Fondo semi-transparente */\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0;\n  padding: 0;\n  z-index: 1000; /* Asegurarse de que est\u00E9 encima de otros elementos */\n  animation: fadeIn 0.5s ease-out, fadeOut 0.5s ease-out 2.5s; /* Animaciones de entrada y salida */\n  box-sizing: border-box;\n  border-radius: 0px;\n\n}\n\nion-content.custom-content {\n  --padding-top: 0;\n  --padding-bottom: 0;\n  margin: 0;\n  padding: 0;\n}\n\n.countdown {\n  font-size: 100px;\n  font-weight: bold;\n  color: white;\n  animation: scaleUp 0.5s ease-out, scaleDown 0.5s ease-out 2.5s; /* Escalar en entrada y salida */\n}\n\n/* Animaci\u00F3n para desvanecer la superposici\u00F3n */\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n/* Animaci\u00F3n para escalar el n\u00FAmero */\n@keyframes scaleUp {\n  from {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n\n@keyframes scaleDown {\n  from {\n    transform: scale(1);\n    opacity: 1;\n  }\n  to {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n}\n\n.red {\n  padding: 10px;\n  color: red;\n}\n\n.text-center{\n  text-align: center;\n  padding-left: 20%;\n  padding-right: 20%;\n  color: #333;\n}\n\n.loading-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.8); /* Fondo oscuro semi-transparente */\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000; /* Aseg\u00FArate de que est\u00E9 por encima del contenido */\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  border-radius: 0px;\n}\n\nion-spinner {\n  color: white;\n  width: 50px;\n  height: 50px;\n}"] }]
    }], () => [{ type: i1.Platform }, { type: i1.ModalController }, { type: i2.DomSanitizer }, { type: i0.Renderer2 }, { type: i1.AlertController }, { type: i3.ModalDpiServices }, { type: i0.ChangeDetectorRef }, { type: i4.ModalVideoSelfieServices }], { videoElement: [{
            type: ViewChild,
            args: ['videoElement']
        }], progressRing: [{
            type: ViewChild,
            args: ['progressRing']
        }], text1: [{
            type: Input
        }], text2: [{
            type: Input
        }], backFunction: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CamaraVideoSelfieComponent, { className: "CamaraVideoSelfieComponent" }); })();
//# sourceMappingURL=camara-video-selfie.component.js.map