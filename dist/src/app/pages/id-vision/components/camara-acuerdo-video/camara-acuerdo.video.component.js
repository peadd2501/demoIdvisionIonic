import { __awaiter } from "tslib";
import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ModalDpiServices } from '../../services/modal-services/modal-dpi-services';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
import * as i2 from "../../services/modal-services/modal-dpi-services";
import * as i3 from "@angular/common";
const _c0 = ["videoElement"];
function CamaraAcuerdoVideoComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16)(1, "div", 17);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.countdown);
} }
function CamaraAcuerdoVideoComponent_p_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Toca 'Inicia la grabaci\u00F3n' cuando est\u00E9s listo");
    i0.ɵɵelementEnd();
} }
function CamaraAcuerdoVideoComponent_p_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1, " Grabando... ");
    i0.ɵɵelementEnd();
} }
function CamaraAcuerdoVideoComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19);
    i0.ɵɵelement(1, "ion-icon", 20);
    i0.ɵɵelementEnd();
} }
function CamaraAcuerdoVideoComponent_p_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("00:", ctx_r1.timeRemaining < 10 ? "0" + ctx_r1.timeRemaining : ctx_r1.timeRemaining, "");
} }
export class CamaraAcuerdoVideoComponent {
    constructor(platform, changeDetector, modalDpiServices, modalController) {
        this.platform = platform;
        this.changeDetector = changeDetector;
        this.modalDpiServices = modalDpiServices;
        this.modalController = modalController;
        this.countdown = 0;
        this.isRecording = false;
        this.timeRemaining = 15; // 🔥 Ahora empieza en 15s
        this.canStopRecording = false; // 🔥 Solo se habilita cuando faltan 5 segundos
        this.stream = null;
        this.mediaRecorder = null;
        this.isLoading = true; // Variable para mostrar el loader
        this.isAndroid = this.platform.is('android');
        this.isIOS = this.platform.is('ios');
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initCamera();
        });
    }
    ngAfterViewInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.modalDpiServices.closeModalAcuerdoVideo$.subscribe(() => __awaiter(this, void 0, void 0, function* () {
                yield this.closeOverlayVideo();
            }));
        });
    }
    ngOnDestroy() {
        return __awaiter(this, void 0, void 0, function* () {
            this.stopCamera();
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
                    audio: true
                };
                this.stream = yield navigator.mediaDevices.getUserMedia(constraints);
                this.videoElement.nativeElement.srcObject = this.stream;
                this.videoElement.nativeElement.muted = true;
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
                //   await this.startVideoRecord();
            }
            catch (error) {
                console.error('Error al inicializar la cámara:', error);
            }
        });
    }
    recordVideo() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    startVideoRecord() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.stream || this.isRecording)
                return;
            this.isRecording = true;
            this.timeRemaining = 15; // 🔥 Reiniciar cuenta regresiva a 15 segundos
            this.canStopRecording = false; // 🔥 Deshabilitar botón de detener al inicio
            this.changeDetector.detectChanges();
            const options = {
                mimeType: this.isIOS ? 'video/mp4' : 'video/webm',
                videoBitsPerSecond: 400000
            };
            this.mediaRecorder = new MediaRecorder(this.stream, options);
            let chunks = [];
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0)
                    chunks.push(event.data);
            };
            this.mediaRecorder.onstop = () => __awaiter(this, void 0, void 0, function* () {
                if (chunks.length === 0) {
                    console.error('No se capturaron datos en la grabación.');
                    return;
                }
                const videoBlob = new Blob(chunks, { type: this.isIOS ? 'video/mp4' : 'video/webm' });
                const fileExtension = this.isIOS ? 'mp4' : 'webm';
                const videoFile = this.blobToFile(videoBlob, `acuerdo-video.${fileExtension}`);
                if (this.backFunction) {
                    yield this.backFunction(videoFile);
                }
            });
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
                }
                else {
                    clearInterval(this.recordingTimer);
                    this.stopRecording();
                }
            }, 1000);
        });
    }
    stopRecording() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.mediaRecorder && this.isRecording) {
                this.mediaRecorder.stop();
                yield this.backFunction(this.capVideo);
                this.isRecording = false;
                this.canStopRecording = false;
                clearInterval(this.recordingTimer);
                this.changeDetector.detectChanges();
            }
        });
    }
    blobToFile(blob, fileName) {
        return new File([blob], fileName, { type: blob.type });
    }
    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach((track) => track.stop());
            this.stream = null;
        }
        // if (this.scanTimeout) clearTimeout(this.scanTimeout);
    }
    closeOverlayVideo() {
        return __awaiter(this, void 0, void 0, function* () {
            this.stopCamera();
            this.modalController.dismiss();
        });
    }
    closeRequestedFunction() {
        this.closeOverlayVideo();
        this.modalDpiServices.requestCloseModalAcuerdoVideo();
        // this.modalVideoSelfieServices.requestCloseOverlayModal();
    }
}
CamaraAcuerdoVideoComponent.ɵfac = function CamaraAcuerdoVideoComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CamaraAcuerdoVideoComponent)(i0.ɵɵdirectiveInject(i1.Platform), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.ModalDpiServices), i0.ɵɵdirectiveInject(i1.ModalController)); };
CamaraAcuerdoVideoComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CamaraAcuerdoVideoComponent, selectors: [["app-acuerdo-video"]], viewQuery: function CamaraAcuerdoVideoComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.videoElement = _t.first);
    } }, inputs: { backFunction: "backFunction" }, decls: 19, vars: 7, consts: [["videoElement", ""], [1, "video-container"], ["class", "countdown-overlay", 4, "ngIf"], ["autoplay", "", "muted", "", "playsinline", ""], [1, "overlay"], [1, "overlay-text"], [4, "ngIf"], ["class", "recording-text", 4, "ngIf"], ["class", "icon-text", 4, "ngIf"], [1, "close-button"], ["name", "close-outline", 3, "click"], [1, "button-container"], [1, "instruction-text-1"], ["class", "recording-timer", 4, "ngIf"], [1, "instruction-text"], ["expand", "block", 3, "click", "disabled"], [1, "countdown-overlay"], [1, "countdown"], [1, "recording-text"], [1, "icon-text"], ["size", "small", "name", "radio-button-on-outline"], [1, "recording-timer"]], template: function CamaraAcuerdoVideoComponent_Template(rf, ctx) { if (rf & 1) {
        const _r1 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "ion-content", 1);
        i0.ɵɵtemplate(1, CamaraAcuerdoVideoComponent_div_1_Template, 3, 1, "div", 2);
        i0.ɵɵelement(2, "video", 3, 0);
        i0.ɵɵelementStart(4, "div", 4)(5, "div", 5);
        i0.ɵɵtemplate(6, CamaraAcuerdoVideoComponent_p_6_Template, 2, 0, "p", 6)(7, CamaraAcuerdoVideoComponent_p_7_Template, 2, 0, "p", 7)(8, CamaraAcuerdoVideoComponent_div_8_Template, 2, 0, "div", 8);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "div", 9)(10, "ion-icon", 10);
        i0.ɵɵlistener("click", function CamaraAcuerdoVideoComponent_Template_ion_icon_click_10_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeOverlayVideo()); });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(11, "div", 11)(12, "p", 12);
        i0.ɵɵtext(13, "Repite el siguiente texto");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(14, CamaraAcuerdoVideoComponent_p_14_Template, 2, 1, "p", 13);
        i0.ɵɵelementStart(15, "p", 14);
        i0.ɵɵtext(16, "Acepto los t\u00E9rminos y condiciones del cr\u00E9dito que estoy solicitando en Fundaci\u00F3n G\u00E9nesis Empresarial");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "ion-button", 15);
        i0.ɵɵlistener("click", function CamaraAcuerdoVideoComponent_Template_ion_button_click_17_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.isRecording ? ctx.stopRecording() : ctx.recordVideo()); });
        i0.ɵɵtext(18);
        i0.ɵɵelementEnd()()()();
    } if (rf & 2) {
        i0.ɵɵadvance();
        i0.ɵɵproperty("ngIf", ctx.countdown > 0);
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngIf", !ctx.isRecording);
        i0.ɵɵadvance();
        i0.ɵɵproperty("ngIf", ctx.isRecording);
        i0.ɵɵadvance();
        i0.ɵɵproperty("ngIf", ctx.isRecording);
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngIf", ctx.isRecording);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("disabled", ctx.isRecording && ctx.timeRemaining > 5);
        i0.ɵɵadvance();
        i0.ɵɵtextInterpolate1(" ", ctx.isRecording ? "Detener Grabaci\u00F3n" : "Iniciar Grabaci\u00F3n", " ");
    } }, dependencies: [i3.NgIf, i1.IonButton, i1.IonContent, i1.IonIcon], styles: [".video-container[_ngcontent-%COMP%] {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    background: black;\n  \n    video {\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n    }\n  \n    .overlay {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n      align-items: center;\n      background: rgba(0, 0, 0, 0.5);\n  \n      .overlay-text {\n        display: flex;\n        align-items: center; \n        justify-content: center; \n        margin-top: 20px;\n        color: white;\n        font-size: 14px;\n        // text-align: center;\n        gap: 8px;\n  \n        ion-icon {\n            padding-top: 4px;\n          color: red;\n          font-size: 12px;\n        //   margin-left: 5px;\n        }\n      }\n      \n      .instruction-text-1 {\n        color: red;\n        font-size: 14px;\n        text-align: center;\n      }\n  \n      .instruction-text {\n        color: black;\n        text-align: center;\n        padding: 0px 15px;\n      }\n  \n      .button-container {\n        background-color: white;\n        bottom: 20px;\n        padding: 10px;\n        \n        // ion-button {\n        //   width: 100%;\n        // }\n\n        ion-button {\n            width: 90%;\n            max-width: 300px;\n            margin: 0 auto;\n            background-color: #ffcc00;\n            color: #ffffff;\n            font-weight: bold;\n            border-radius: 20px;\n        \n            --background: var(--purple-primary);\n            --background-hover: var(--purple-secondary);\n            --background-activated: var(--purple-secondary);\n            --background-focused: var(--purple-secondary);\n          \n            --color: var(--purple-primary);\n          \n            --border-radius: 20px;\n            --border-color: var(--purple-primary);\n            --border-style: solid;\n            --border-width: 1px;\n          \n            --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n          \n            --ripple-color: var(--purple-secondary);\n          \n        \n            &:hover {\n              background-color: #ffb300;\n            }\n        \n            &:active {\n              background-color: #e6a800;\n            }\n          }\n      }\n    }\n  }\n  \n  .countdown-overlay[_ngcontent-%COMP%] {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.6);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 1000;\n  \n    .countdown {\n      font-size: 100px;\n      font-weight: bold;\n      color: white;\n    }\n  }\n\n.recording-timer[_ngcontent-%COMP%] {\n    color: red;\n    text-align: center;\n    padding: 0;\n    font-size: 13px;\n}\n.close-button[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 10px;\n    right: 10px;\n    border-radius: 50%;\n    padding: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n  \n    ion-icon {\n      color: white;\n      font-size: 18px;\n    }\n  \n    &:hover {\n      background: rgba(0, 0, 0, 0.7);\n    }\n  }\n\n  video[_ngcontent-%COMP%] {\n    transform: scaleX(-1);\n  }"] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CamaraAcuerdoVideoComponent, [{
        type: Component,
        args: [{ selector: 'app-acuerdo-video', template: "<ion-content class=\"video-container\">\n    <div *ngIf=\"countdown > 0\" class=\"countdown-overlay\">\n      <div class=\"countdown\">{{ countdown }}</div>\n    </div>\n  \n    <video #videoElement autoplay muted playsinline></video>\n  \n    <div class=\"overlay\">\n      <div class=\"overlay-text\">\n        <p *ngIf=\"!isRecording\">Toca 'Inicia la grabaci\u00F3n' cuando est\u00E9s listo</p>\n        <p *ngIf=\"isRecording\" class=\"recording-text\">\n          Grabando...\n        </p>\n        <div *ngIf=\"isRecording\" class=\"icon-text\"><ion-icon size=\"small\" name=\"radio-button-on-outline\"></ion-icon></div>\n      </div>\n\n      <div class=\"close-button\">\n        <ion-icon name=\"close-outline\" (click)=\"closeOverlayVideo()\"></ion-icon>\n      </div>\n  \n  \n      <div class=\"button-container\">\n        <p class=\"instruction-text-1\">Repite el siguiente texto</p>\n        <p class=\"recording-timer\" *ngIf=\"isRecording\">00:{{ timeRemaining < 10 ? '0' + timeRemaining : timeRemaining }}</p>\n        <p class=\"instruction-text\">Acepto los t\u00E9rminos y condiciones del cr\u00E9dito que estoy solicitando en Fundaci\u00F3n G\u00E9nesis Empresarial</p>\n  \n        <ion-button expand=\"block\" \n        (click)=\"isRecording ? stopRecording() : recordVideo()\" \n        [disabled]=\"isRecording && timeRemaining > 5\">\n        {{ isRecording ? 'Detener Grabaci\u00F3n' : 'Iniciar Grabaci\u00F3n' }}\n      </ion-button>\n      \n      </div>\n    </div>\n  </ion-content>\n  ", styles: [".video-container {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    background: black;\n  \n    video {\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n    }\n  \n    .overlay {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n      align-items: center;\n      background: rgba(0, 0, 0, 0.5);\n  \n      .overlay-text {\n        display: flex;\n        align-items: center; \n        justify-content: center; \n        margin-top: 20px;\n        color: white;\n        font-size: 14px;\n        // text-align: center;\n        gap: 8px;\n  \n        ion-icon {\n            padding-top: 4px;\n          color: red;\n          font-size: 12px;\n        //   margin-left: 5px;\n        }\n      }\n      \n      .instruction-text-1 {\n        color: red;\n        font-size: 14px;\n        text-align: center;\n      }\n  \n      .instruction-text {\n        color: black;\n        text-align: center;\n        padding: 0px 15px;\n      }\n  \n      .button-container {\n        background-color: white;\n        bottom: 20px;\n        padding: 10px;\n        \n        // ion-button {\n        //   width: 100%;\n        // }\n\n        ion-button {\n            width: 90%;\n            max-width: 300px;\n            margin: 0 auto;\n            background-color: #ffcc00;\n            color: #ffffff;\n            font-weight: bold;\n            border-radius: 20px;\n        \n            --background: var(--purple-primary);\n            --background-hover: var(--purple-secondary);\n            --background-activated: var(--purple-secondary);\n            --background-focused: var(--purple-secondary);\n          \n            --color: var(--purple-primary);\n          \n            --border-radius: 20px;\n            --border-color: var(--purple-primary);\n            --border-style: solid;\n            --border-width: 1px;\n          \n            --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n          \n            --ripple-color: var(--purple-secondary);\n          \n        \n            &:hover {\n              background-color: #ffb300;\n            }\n        \n            &:active {\n              background-color: #e6a800;\n            }\n          }\n      }\n    }\n  }\n  \n  .countdown-overlay {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.6);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 1000;\n  \n    .countdown {\n      font-size: 100px;\n      font-weight: bold;\n      color: white;\n    }\n  }\n\n.recording-timer {\n    color: red;\n    text-align: center;\n    padding: 0;\n    font-size: 13px;\n}\n.close-button {\n    position: absolute;\n    top: 10px;\n    right: 10px;\n    border-radius: 50%;\n    padding: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n  \n    ion-icon {\n      color: white;\n      font-size: 18px;\n    }\n  \n    &:hover {\n      background: rgba(0, 0, 0, 0.7);\n    }\n  }\n\n  video {\n    transform: scaleX(-1);\n  }"] }]
    }], () => [{ type: i1.Platform }, { type: i0.ChangeDetectorRef }, { type: i2.ModalDpiServices }, { type: i1.ModalController }], { videoElement: [{
            type: ViewChild,
            args: ['videoElement', { static: false }]
        }], backFunction: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CamaraAcuerdoVideoComponent, { className: "CamaraAcuerdoVideoComponent" }); })();
//# sourceMappingURL=camara-acuerdo.video.component.js.map