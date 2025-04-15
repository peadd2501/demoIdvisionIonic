import { __awaiter } from "tslib";
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, ViewEncapsulation, } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Camera } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalVideoSelfieServices } from '../../services/modal-services/modal-video-selfie-services';
import { ScreenBrightness } from '@capacitor-community/screen-brightness';
import { ModalDpiServices } from '../../services/modal-services/modal-dpi-services';
import { Capacitor } from '@capacitor/core';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
import * as i2 from "@angular/platform-browser";
import * as i3 from "../../services/modal-services/modal-video-selfie-services";
import * as i4 from "../../services/modal-services/modal-dpi-services";
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
    constructor(platform, modalController, sanitizer, renderer, alertController, changeDetector, modalVideoSelfieServices, modalDpiServices) {
        this.platform = platform;
        this.modalController = modalController;
        this.sanitizer = sanitizer;
        this.renderer = renderer;
        this.alertController = alertController;
        this.changeDetector = changeDetector;
        this.modalVideoSelfieServices = modalVideoSelfieServices;
        this.modalDpiServices = modalDpiServices;
        this.text1 = '';
        this.text2 = '';
        this.closeRequested = new EventEmitter();
        this.stream = null;
        this.isRecording = false;
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.countdown = 0;
        this.minRecordingTime = 3000;
        this.maxRecordingTime = 5000;
        this.timeRemaining = this.maxRecordingTime / 1000;
        this.canStopRecording = true;
        this.isLoading = true;
        this.defaultBrightness = null;
        this.isAndroid = this.platform.is('android');
        this.isIOS = this.platform.is('ios');
    }
    ngAfterViewInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isAndroid || this.isIOS) {
                try {
                    const { brightness } = yield ScreenBrightness.getBrightness();
                    this.defaultBrightness = brightness;
                    yield ScreenBrightness.setBrightness({ brightness: 1.0 });
                }
                catch (error) {
                    console.warn('Error al obtener el brillo de la pantalla:', error);
                }
                yield this.requestPermissions();
            }
            yield this.initCamera();
            yield this.waitForCameraReady();
            this.modalDpiServices.closeModalAndChangeBrightness$.subscribe(() => __awaiter(this, void 0, void 0, function* () {
                yield this.closeOverlayVideo();
            }));
        });
    }
    ngOnDestroy() {
        return __awaiter(this, void 0, void 0, function* () {
            this.stopCamera();
            try {
                if (this.defaultBrightness !== null) {
                    yield ScreenBrightness.setBrightness({
                        brightness: this.defaultBrightness,
                    });
                }
            }
            catch (error) {
                console.warn('Error al restaurar el brillo original:', error);
            }
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
                this.videoElement.nativeElement.onloadedmetadata = () => {
                    isCameraReady = true;
                };
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
            this.mediaRecorder.onstop = () => __awaiter(this, void 0, void 0, function* () {
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
                    yield this.backFunction(videoFile);
                }
                this.recordedChunks = [];
            });
        });
    }
    blobToFile(blob, fileName) {
        const b = blob;
        b.lastModified = new Date().getTime();
        b.lastModifiedDate = new Date();
        b.name = fileName;
        return b;
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
    startVideoRecord() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.mediaRecorder && !this.isRecording) {
                yield new Promise((resolve) => setTimeout(resolve, 500));
                this.mediaRecorder.start(100);
                this.isRecording = true;
                this.canStopRecording = false;
                this.renderer.addClass(this.progressRing.nativeElement, 'progress-active');
                this.timeRemaining = this.maxRecordingTime / 1000;
                this.updateTimeRemaining();
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
        const interval = 1000;
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
            this.changeDetector.detectChanges();
        }, interval);
    }
    stopRecording() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.mediaRecorder && this.isRecording && this.canStopRecording) {
                this.mediaRecorder.stop();
                this.isRecording = false;
            }
            if (this.scanTimeout) {
                clearTimeout(this.scanTimeout);
            }
            this.renderer.removeClass(this.progressRing.nativeElement, 'progress-active');
        });
    }
    closeOverlayVideo() {
        return __awaiter(this, void 0, void 0, function* () {
            this.stopCamera();
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
        this.closeOverlayVideo();
        this.modalDpiServices.requestCloseModalAndBrightness();
    }
}
CamaraVideoSelfieComponent.ɵfac = function CamaraVideoSelfieComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CamaraVideoSelfieComponent)(i0.ɵɵdirectiveInject(i1.Platform), i0.ɵɵdirectiveInject(i1.ModalController), i0.ɵɵdirectiveInject(i2.DomSanitizer), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i1.AlertController), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i3.ModalVideoSelfieServices), i0.ɵɵdirectiveInject(i4.ModalDpiServices)); };
CamaraVideoSelfieComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CamaraVideoSelfieComponent, selectors: [["app-camara-video-selfie"]], viewQuery: function CamaraVideoSelfieComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
        i0.ɵɵviewQuery(_c1, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.videoElement = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.progressRing = _t.first);
    } }, inputs: { text1: "text1", text2: "text2", backFunction: "backFunction" }, outputs: { closeRequested: "closeRequested" }, decls: 22, vars: 9, consts: [["videoElement", ""], ["progressRing", ""], ["color", "light", 1, "custom-content"], ["class", "loading-overlay", 4, "ngIf"], ["class", "countdown-overlay", 4, "ngIf"], [1, "ion-no-border"], ["color", "light"], ["slot", "end"], [3, "click", "disabled"], ["name", "close"], [1, "camera-container"], [1, "video-wrapper"], ["muted", "", "autoplay", "", "playsinline", "", 2, "transform", "scaleX(-1)"], ["width", "300", "height", "300", 1, "progress-ring"], ["cx", "150", "cy", "150", "r", "150", 1, "progress-ring__circle"], [3, "ngClass"], [1, "text-center"], [1, "fixed-footer"], ["expand", "block", 3, "click", 4, "ngIf"], ["expand", "block", 3, "disabled", "click", 4, "ngIf"], [1, "loading-overlay"], ["name", "crescent"], [1, "countdown-overlay"], [1, "countdown"], ["expand", "block", 3, "click"], ["expand", "block", 3, "click", "disabled"]], template: function CamaraVideoSelfieComponent_Template(rf, ctx) { if (rf & 1) {
        const _r1 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "ion-content", 2);
        i0.ɵɵtemplate(1, CamaraVideoSelfieComponent_div_1_Template, 2, 0, "div", 3)(2, CamaraVideoSelfieComponent_div_2_Template, 3, 1, "div", 4);
        i0.ɵɵelementStart(3, "ion-header", 5)(4, "ion-toolbar", 6)(5, "ion-buttons", 7)(6, "ion-button", 8);
        i0.ɵɵlistener("click", function CamaraVideoSelfieComponent_Template_ion_button_click_6_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeOverlayVideo()); });
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
        i0.ɵɵtext(18, "Permanece quieto, con tu rostro en el centro del c\u00EDrculo.");
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
    } }, dependencies: [i5.NgClass, i5.NgIf, i1.IonButton, i1.IonButtons, i1.IonContent, i1.IonHeader, i1.IonIcon, i1.IonLabel, i1.IonSpinner, i1.IonToolbar], styles: [".camera-container[_ngcontent-%COMP%] {\n  justify-content: center;\n  align-items: center;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 70%;\n  background-color: white;\n}\n\n.video-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  width: 300px;\n  height: 300px;\n  border-radius: 50%;\n  overflow: hidden;\n}\n\nvideo[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  border-radius: 50%;\n}\n\n.progress-ring[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  transform: rotate(-90deg); \n\n}\n\n.progress-ring__circle[_ngcontent-%COMP%] {\n  fill: transparent;\n  stroke: purple;\n  stroke-width: 12;\n  stroke-dasharray: 945; \n\n  stroke-dashoffset: 880; \n\n  transition: stroke-dashoffset 12s linear; \n\n}\n\n.progress-active[_ngcontent-%COMP%]   .progress-ring__circle[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_progress-animation 5s linear forwards;\n}\n\n@keyframes _ngcontent-%COMP%_progress-animation {\n  from {\n    stroke-dashoffset: 880;\n  }\n  to {\n    stroke-dashoffset: 0;\n  }\n}\n\n.text-container[_ngcontent-%COMP%] {\n  height: 40px;\n  color: black;\n}\n\nion-header[_ngcontent-%COMP%] {\n  --background: #ffffff; \n\n}\n\n\n\n.centered-title[_ngcontent-%COMP%] {\n  text-align: center;\n  width: 100%; \n\n  font-weight: bold;\n}\n\n.fixed-footer[_ngcontent-%COMP%] {\n\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  padding: 10px;\n  background-color: #fff; // Color de fondo, opcional\n // box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);\n\n  ion-button {\n    width: 90%;\n    max-width: 300px;\n    margin: 0 auto;\n    background-color: #ffcc00;\n    color: #ffffff;\n    font-weight: bold;\n    border-radius: 20px;\n\n    --background: var(--purple-primary);\n    --background-hover: var(--purple-secondary);\n    --background-activated: var(--purple-secondary);\n    --background-focused: var(--purple-secondary);\n  \n    --color: var(--purple-primary);\n  \n    --border-radius: 20px;\n    --border-color: var(--purple-primary);\n    --border-style: solid;\n    --border-width: 1px;\n  \n    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n  \n    --ripple-color: var(--purple-secondary);\n  \n\n    &:hover {\n      background-color: #ffb300;\n    }\n\n    &:active {\n      background-color: #e6a800;\n    }\n  }\n}\n\n\nion-header[_ngcontent-%COMP%] {\n  --background: #ffffff; \n\n  color: #000000; \n\n}\n\nion-toolbar[_ngcontent-%COMP%] {\n  --ion-background-color: #ffffff !important;\n  --background: #ffffff !important;\n  color: #000000;\n}\n\n\nion-header[_ngcontent-%COMP%] {\n  --background: #ffffff; \n\n}\n\nion-toolbar[_ngcontent-%COMP%] {\n  --ion-background-color: #ffffff !important;\n  --background: #ffffff !important;\n  color: #000000;\n  display: flex;\n  justify-content: space-between; \n\n  align-items: center;\n}\n\n.centered-title[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: center; \n\n  font-weight: bold;\n  color: #000000;\n  margin: 0; \n\n}\n\nion-buttons[_ngcontent-%COMP%] {\n  justify-content: flex-end; \n\n}\n.countdown-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.6); \n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0;\n  padding: 0;\n  z-index: 1000; \n\n  animation: _ngcontent-%COMP%_fadeIn 0.5s ease-out, _ngcontent-%COMP%_fadeOut 0.5s ease-out 2.5s; \n\n  box-sizing: border-box;\n  border-radius: 0px;\n\n}\n\nion-content.custom-content[_ngcontent-%COMP%] {\n  --padding-top: 0;\n  --padding-bottom: 0;\n  margin: 0;\n  padding: 0;\n}\n\n.countdown[_ngcontent-%COMP%] {\n  font-size: 100px;\n  font-weight: bold;\n  color: white;\n  animation: _ngcontent-%COMP%_scaleUp 0.5s ease-out, _ngcontent-%COMP%_scaleDown 0.5s ease-out 2.5s; \n\n}\n\n\n\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_fadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n\n\n@keyframes _ngcontent-%COMP%_scaleUp {\n  from {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_scaleDown {\n  from {\n    transform: scale(1);\n    opacity: 1;\n  }\n  to {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n}\n\n.red[_ngcontent-%COMP%] {\n  padding: 10px;\n  color: red;\n}\n\n.text-center[_ngcontent-%COMP%]{\n  text-align: center;\n  padding-left: 20%;\n  padding-right: 20%;\n  color: #333;\n}\n\n.loading-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.8); \n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000; \n\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  border-radius: 0px;\n}\n\nion-spinner[_ngcontent-%COMP%] {\n  color: white;\n  width: 50px;\n  height: 50px;\n}"] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CamaraVideoSelfieComponent, [{
        type: Component,
        args: [{ selector: 'app-camara-video-selfie', encapsulation: ViewEncapsulation.Emulated, template: "<ion-content color=\"light\" class=\"custom-content\">\n  <div *ngIf=\"isLoading\" class=\"loading-overlay\">\n    <ion-spinner name=\"crescent\"></ion-spinner>\n  </div>\n  \n  <div *ngIf=\"countdown > 0\" class=\"countdown-overlay\">\n    <div class=\"countdown\">{{ countdown }}</div>\n  </div>\n  <ion-header class=\"ion-no-border\">\n    <ion-toolbar color=\"light\">\n      <!-- <ion-title class=\"centered-title\">Video Selfie</ion-title> -->\n      <ion-buttons slot=\"end\">\n        <ion-button (click)=\"closeOverlayVideo()\" [disabled]=\"!canStopRecording\">\n          <ion-icon name=\"close\"></ion-icon>\n        </ion-button>\n      </ion-buttons>\n    </ion-toolbar>\n  </ion-header>\n\n  <!-- Contenedor de la c\u00E1mara y progresi\u00F3n -->\n  <div class=\"camera-container\">\n    <div class=\"video-wrapper\">\n      <video #videoElement muted autoplay playsinline style=\"transform: scaleX(-1)\"></video>\n      <svg class=\"progress-ring\" #progressRing width=\"300\" height=\"300\">\n        <circle class=\"progress-ring__circle\" cx=\"150\" cy=\"150\" r=\"150\" />\n      </svg>\n    </div>\n    <ion-label [ngClass]=\"{'red': isRecording}\">00:{{ timeRemaining < 10 ? '0' + timeRemaining : timeRemaining\n        }}</ion-label>\n        <p class=\"text-center\">Permanece quieto, con tu rostro en el centro del c\u00EDrculo.</p>\n        <!-- Botones de grabaci\u00F3n -->\n        <div class=\"fixed-footer\">\n          <ion-button *ngIf=\"!isRecording\" expand=\"block\" (click)=\"recordVideo()\">Iniciar Grabaci\u00F3n</ion-button>\n          <ion-button *ngIf=\"isRecording\" expand=\"block\" (click)=\"stopRecording()\" [disabled]=\"!canStopRecording\">Detener\n            Grabaci\u00F3n</ion-button>\n        </div>\n  </div>\n</ion-content>", styles: [".camera-container {\n  justify-content: center;\n  align-items: center;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 70%;\n  background-color: white;\n}\n\n.video-wrapper {\n  position: relative;\n  width: 300px;\n  height: 300px;\n  border-radius: 50%;\n  overflow: hidden;\n}\n\nvideo {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  border-radius: 50%;\n}\n\n.progress-ring {\n  position: absolute;\n  top: 0;\n  left: 0;\n  transform: rotate(-90deg); /* Rotamos el c\u00EDrculo para que la animaci\u00F3n inicie desde arriba */\n}\n\n.progress-ring__circle {\n  fill: transparent;\n  stroke: purple;\n  stroke-width: 12;\n  stroke-dasharray: 945; /* La circunferencia del c\u00EDrculo  880*/\n  stroke-dashoffset: 880; /* Oculto por completo al inicio */\n  transition: stroke-dashoffset 12s linear; /* Esto controlar\u00E1 el llenado progresivo */\n}\n\n.progress-active .progress-ring__circle {\n  animation: progress-animation 5s linear forwards;\n}\n\n@keyframes progress-animation {\n  from {\n    stroke-dashoffset: 880;\n  }\n  to {\n    stroke-dashoffset: 0;\n  }\n}\n\n.text-container {\n  height: 40px;\n  color: black;\n}\n\nion-header {\n  --background: #ffffff; /* Fondo blanco para el header */\n}\n\n\n\n.centered-title {\n  text-align: center;\n  width: 100%; /* Asegura que el t\u00EDtulo est\u00E9 centrado */\n  font-weight: bold;\n}\n\n.fixed-footer {\n\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  padding: 10px;\n  background-color: #fff; // Color de fondo, opcional\n // box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);\n\n  ion-button {\n    width: 90%;\n    max-width: 300px;\n    margin: 0 auto;\n    background-color: #ffcc00;\n    color: #ffffff;\n    font-weight: bold;\n    border-radius: 20px;\n\n    --background: var(--purple-primary);\n    --background-hover: var(--purple-secondary);\n    --background-activated: var(--purple-secondary);\n    --background-focused: var(--purple-secondary);\n  \n    --color: var(--purple-primary);\n  \n    --border-radius: 20px;\n    --border-color: var(--purple-primary);\n    --border-style: solid;\n    --border-width: 1px;\n  \n    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n  \n    --ripple-color: var(--purple-secondary);\n  \n\n    &:hover {\n      background-color: #ffb300;\n    }\n\n    &:active {\n      background-color: #e6a800;\n    }\n  }\n}\n\n\nion-header {\n  --background: #ffffff; /* Fondo blanco */\n  color: #000000; /* Texto negro */\n}\n\nion-toolbar {\n  --ion-background-color: #ffffff !important;\n  --background: #ffffff !important;\n  color: #000000;\n}\n\n\nion-header {\n  --background: #ffffff; /* Fondo blanco */\n}\n\nion-toolbar {\n  --ion-background-color: #ffffff !important;\n  --background: #ffffff !important;\n  color: #000000;\n  display: flex;\n  justify-content: space-between; /* Espacio entre t\u00EDtulo y bot\u00F3n */\n  align-items: center;\n}\n\n.centered-title {\n  flex: 1;\n  text-align: center; /* Centrar el t\u00EDtulo */\n  font-weight: bold;\n  color: #000000;\n  margin: 0; /* Quita cualquier margen del t\u00EDtulo */\n}\n\nion-buttons {\n  justify-content: flex-end; /* Alinea el bot\u00F3n a la derecha */\n}\n.countdown-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.6); /* Fondo semi-transparente */\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0;\n  padding: 0;\n  z-index: 1000; /* Asegurarse de que est\u00E9 encima de otros elementos */\n  animation: fadeIn 0.5s ease-out, fadeOut 0.5s ease-out 2.5s; /* Animaciones de entrada y salida */\n  box-sizing: border-box;\n  border-radius: 0px;\n\n}\n\nion-content.custom-content {\n  --padding-top: 0;\n  --padding-bottom: 0;\n  margin: 0;\n  padding: 0;\n}\n\n.countdown {\n  font-size: 100px;\n  font-weight: bold;\n  color: white;\n  animation: scaleUp 0.5s ease-out, scaleDown 0.5s ease-out 2.5s; /* Escalar en entrada y salida */\n}\n\n/* Animaci\u00F3n para desvanecer la superposici\u00F3n */\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n/* Animaci\u00F3n para escalar el n\u00FAmero */\n@keyframes scaleUp {\n  from {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n\n@keyframes scaleDown {\n  from {\n    transform: scale(1);\n    opacity: 1;\n  }\n  to {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n}\n\n.red {\n  padding: 10px;\n  color: red;\n}\n\n.text-center{\n  text-align: center;\n  padding-left: 20%;\n  padding-right: 20%;\n  color: #333;\n}\n\n.loading-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.8); /* Fondo oscuro semi-transparente */\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000; /* Aseg\u00FArate de que est\u00E9 por encima del contenido */\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  border-radius: 0px;\n}\n\nion-spinner {\n  color: white;\n  width: 50px;\n  height: 50px;\n}\n\n\n\n"] }]
    }], () => [{ type: i1.Platform }, { type: i1.ModalController }, { type: i2.DomSanitizer }, { type: i0.Renderer2 }, { type: i1.AlertController }, { type: i0.ChangeDetectorRef }, { type: i3.ModalVideoSelfieServices }, { type: i4.ModalDpiServices }], { videoElement: [{
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
        }], closeRequested: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CamaraVideoSelfieComponent, { className: "CamaraVideoSelfieComponent" }); })();
//# sourceMappingURL=camara-video-selfie.component.js.map