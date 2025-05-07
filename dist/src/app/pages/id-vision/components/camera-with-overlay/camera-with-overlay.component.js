import { __awaiter } from "tslib";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Camera } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { ModalDpiServices } from '../../services/modal-services/modal-dpi-services';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
import * as i2 from "../../services/modal-services/modal-dpi-services";
import * as i3 from "@angular/common";
const _c0 = ["videoElement"];
function CameraWithOverlayComponent_ion_fab_2_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ion-fab", 16)(1, "ion-fab-button", 17);
    i0.ɵɵlistener("click", function CameraWithOverlayComponent_ion_fab_2_Template_ion_fab_button_click_1_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggleRearCam()); });
    i0.ɵɵelement(2, "ion-icon", 18);
    i0.ɵɵelementEnd()();
} }
function CameraWithOverlayComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19);
    i0.ɵɵelement(1, "ion-spinner", 20);
    i0.ɵɵelementEnd();
} }
export class CameraWithOverlayComponent {
    constructor(platform, modalController, modaldpiServices) {
        this.platform = platform;
        this.modalController = modalController;
        this.modaldpiServices = modaldpiServices;
        /* ─── Inputs / Outputs ─── */
        this.text1 = '';
        this.text2 = '';
        this.overlaySrc = '';
        this.closeRequested = new EventEmitter();
        /* ─── Estado ─── */
        this.stream = null;
        this.isLoading = true;
        this.rearCams = [];
        this.selectedCamId = null;
        this.currentRearIndex = 0; // ← índice de la lente trasera activa
        this.isMobile = this.platform.is('android') || this.platform.is('ios');
    }
    /* ═════════ LIFE-CYCLE ═════════ */
    ngAfterViewInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isMobile)
                yield this.requestPermissions();
            yield this.enumerateRearCams(); // llena rearCams y abre cámara por defecto
            this.isLoading = false;
            this.modaldpiServices.closeOverlay$.subscribe(() => this.closeOverlay());
            this.modaldpiServices.resumeCameraSubject$.subscribe(() => this.resumeCamera());
        });
    }
    ngOnDestroy() {
        this.stopCamera();
    }
    /* ═════════ Permisos ═════════ */
    requestPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            if (Capacitor.getPlatform() !== 'web') {
                const { camera } = yield Camera.requestPermissions();
                if (camera === 'denied')
                    console.error('Permiso de cámara denegado');
            }
        });
    }
    /* ═════════ Enumerar cámaras traseras ═════════ */
    enumerateRearCams() {
        return __awaiter(this, void 0, void 0, function* () {
            let devices = (yield navigator.mediaDevices.enumerateDevices()).filter(d => d.kind === 'videoinput');
            /* Si los labels vienen vacíos, pedimos un stream corto para que aparezcan. */
            if (!devices.some(d => d.label)) {
                try {
                    const tmp = yield navigator.mediaDevices.getUserMedia({ video: true });
                    tmp.getTracks().forEach(t => t.stop());
                    devices = (yield navigator.mediaDevices.enumerateDevices()).filter(d => d.kind === 'videoinput');
                }
                catch ( /* ignorar */_a) { /* ignorar */ }
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
                let preferred = this.rearCams.find(c => /camera2\s?0/i.test(c.label)); // 1) “camera2 0…”
                if (!preferred)
                    preferred = this.rearCams.find(c => /back/i.test(c.label)); // 2) cualquier “back”
                const chosen = preferred !== null && preferred !== void 0 ? preferred : this.rearCams[0]; // 3) primera
                this.selectedCamId = chosen.deviceId;
                this.currentRearIndex = this.rearCams.findIndex(c => c.deviceId === chosen.deviceId);
                yield this.openCamera(this.selectedCamId);
            }
            else if (devices.length) {
                /* Fallback final: primera cámara disponible */
                yield this.openCamera(devices[0].deviceId);
            }
        });
    }
    /* ═════════ Abrir / cambiar cámara ═════════ */
    openCamera(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.stopCamera();
            if (!deviceId)
                return;
            try {
                this.stream = yield navigator.mediaDevices.getUserMedia({
                    video: {
                        deviceId: { exact: deviceId },
                        width: { ideal: 1920 }, // ◄── full-HD
                        height: { ideal: 1080 },
                        aspectRatio: 1.7777778
                    },
                    audio: false
                });
                this.attachStream(this.stream);
            }
            catch (err) {
                console.error('No se pudo abrir la cámara:', err);
            }
        });
    }
    /** Avanza al siguiente sensor trasero en modo carrusel */
    toggleRearCam() {
        if (!this.rearCams.length)
            return;
        this.currentRearIndex = (this.currentRearIndex + 1) % this.rearCams.length;
        const nextCam = this.rearCams[this.currentRearIndex];
        this.selectedCamId = nextCam.deviceId;
        this.openCamera(nextCam.deviceId);
    }
    attachStream(stream) {
        const video = this.videoElement.nativeElement;
        video.srcObject = stream;
        video.autoplay = true;
        video.playsInline = true;
        video.muted = true;
        video.onloadedmetadata = () => video.play().catch(console.error);
    }
    /* ═════════ Captura de foto ═════════ */
    capturePhoto() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!this.stream)
                return console.error('Cámara no inicializada.');
            const video = this.videoElement.nativeElement;
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth || 1920;
            canvas.height = video.videoHeight || 1080;
            const ctx = canvas.getContext('2d');
            if (!ctx)
                return;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const toBlob = (q) => new Promise(res => canvas.toBlob(b => res(b), 'image/jpeg', q));
            let quality = 0.98;
            let blob = yield toBlob(quality);
            const maxBytes = 3 * 1024 * 1024;
            while (blob && blob.size > maxBytes && quality > 0.4) {
                quality -= 0.05;
                blob = yield toBlob(quality);
            }
            if (blob && blob.size <= maxBytes) {
                const file = new File([blob], 'dpi.jpeg', { type: 'image/jpeg' });
                video.pause();
                yield ((_a = this.onTakePicture) === null || _a === void 0 ? void 0 : _a.call(this, file));
            }
            else {
                console.error('Imagen > 3 MB.');
            }
        });
    }
    /* ═════════ Utilidades ─ cierre / reanudar ═════════ */
    stopCamera() {
        var _a;
        (_a = this.stream) === null || _a === void 0 ? void 0 : _a.getTracks().forEach(t => t.stop());
        this.stream = null;
    }
    closeOverlay() {
        this.stopCamera();
        this.modalController.dismiss();
    }
    resumeCamera() {
        var _a;
        const video = (_a = this.videoElement) === null || _a === void 0 ? void 0 : _a.nativeElement;
        if (video && video.paused)
            video.play().catch(console.error);
    }
}
CameraWithOverlayComponent.ɵfac = function CameraWithOverlayComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CameraWithOverlayComponent)(i0.ɵɵdirectiveInject(i1.Platform), i0.ɵɵdirectiveInject(i1.ModalController), i0.ɵɵdirectiveInject(i2.ModalDpiServices)); };
CameraWithOverlayComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CameraWithOverlayComponent, selectors: [["app-camera-overlay"]], viewQuery: function CameraWithOverlayComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.videoElement = _t.first);
    } }, inputs: { text1: "text1", text2: "text2", overlaySrc: "overlaySrc", onTakePicture: "onTakePicture" }, outputs: { closeRequested: "closeRequested" }, decls: 19, vars: 4, consts: [["videoElement", ""], ["color", "dark"], [1, "camera-overlay"], ["vertical", "top", "horizontal", "start", "slot", "fixed", 4, "ngIf"], [1, "header-text"], [1, "text-help"], [1, "country"], ["class", "loading-overlay", 4, "ngIf"], [1, "visible-window"], [1, "camera-container"], ["autoplay", "", "muted", "", "playsinline", ""], [1, "button-container"], ["shape", "round", "expand", "block", 1, "capture-button", 3, "click"], ["name", "camera-outline"], ["fill", "clear", 1, "close-button", 3, "click"], ["name", "close-outline"], ["vertical", "top", "horizontal", "start", "slot", "fixed"], ["size", "small", 1, "buttonfabCameraChange", 3, "click"], ["name", "camera-reverse-outline"], [1, "loading-overlay"], ["name", "crescent"]], template: function CameraWithOverlayComponent_Template(rf, ctx) { if (rf & 1) {
        const _r1 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "ion-content", 1)(1, "div", 2);
        i0.ɵɵtemplate(2, CameraWithOverlayComponent_ion_fab_2_Template, 3, 0, "ion-fab", 3);
        i0.ɵɵelementStart(3, "div", 4)(4, "div", 5)(5, "p");
        i0.ɵɵtext(6);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(7, "p", 6);
        i0.ɵɵtext(8);
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(9, CameraWithOverlayComponent_div_9_Template, 2, 0, "div", 7);
        i0.ɵɵelement(10, "div", 8);
        i0.ɵɵelementStart(11, "div", 9);
        i0.ɵɵelement(12, "video", 10, 0);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(14, "div", 11)(15, "ion-button", 12);
        i0.ɵɵlistener("click", function CameraWithOverlayComponent_Template_ion_button_click_15_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.capturePhoto()); });
        i0.ɵɵelement(16, "ion-icon", 13);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(17, "ion-button", 14);
        i0.ɵɵlistener("click", function CameraWithOverlayComponent_Template_ion_button_click_17_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeOverlay()); });
        i0.ɵɵelement(18, "ion-icon", 15);
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.rearCams.length > 1);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.text1);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.text2);
        i0.ɵɵadvance();
        i0.ɵɵproperty("ngIf", ctx.isLoading);
    } }, dependencies: [i3.NgIf, i1.IonButton, i1.IonContent, i1.IonFab, i1.IonFabButton, i1.IonIcon, i1.IonSpinner], styles: ["ion-content[_ngcontent-%COMP%] {\n  --background: black;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n\n}\n\n.modal-container[_ngcontent-%COMP%] {\n  max-width: 400px; // Ajusta el valor seg\u00FAn tus necesidades\n\n}\n\n.camera-overlay[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n}\n\n.camera-container[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  position: relative;\n\n  video {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n  }\n}\n\n.overlay-frame[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  max-width: 70%;\n  max-height: 70%;\n  z-index: 9;\n}\n\n.header-text[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50px;\n  width: 100%;\n  text-align: center;\n  color: white;\n  z-index: 15;\n\n  p {\n    margin: 0;\n    font-size: 18px;\n  }\n\n  .country {\n    font-weight: bold;\n  }\n}\n\n.button-container[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 20px;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 10;\n}\n\n.capture-button[_ngcontent-%COMP%] {\n  width: 70px;\n  height: 70px;\n  border-radius: 50%;\n\n\n  --background: var(--purple-primary);\n    --background-hover: var(--purple-secondary);\n    --background-activated: var(--purple-secondary);\n    --background-focused: var(--purple-secondary);\n  \n    --color: white;\n  \n    --border-color: var(--purple-primary);\n    --border-style: solid;\n    --border-width: 1px;\n  \n    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n  \n    --ripple-color: var(--purple-secondary);\n}\n\n.close-button[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 14px;\n  right: 20px;\n  color: white;\n  z-index: 10;\n}\n\n.visible-window[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  // width: 70%; \n\n  // height: 45%; \n\n\n  width: 313px;\n  height: 500px;\n\n  max-width: 90%;\n  max-height: 90%;\n  background: transparent;\n  border: 2px solid white; \n\n  border-radius: 10px; \n\n  z-index: 10; \n\n  box-shadow: 0 0 0 100vw rgba(0, 0, 0, 0.65); \n\n}\n.text-help[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{\n  display: inline-block; \n\n  background-color: white; \n\n  padding: 5px; \n\n  border-radius: 5px; \n\n  color: black; \n\n  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); \n\n  animation: _ngcontent-%COMP%_popIn 1s ease-in-out; \n\n}\n\n\n\n@keyframes _ngcontent-%COMP%_popIn {\n  0% {\n    transform: scale(0.8); \n\n    opacity: 0; \n\n  }\n  50% {\n    transform: scale(1.1); \n\n    opacity: 1; \n\n  }\n  100% {\n    transform: scale(1); \n\n  }\n}\n\n.loading-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.8); \n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000; \n\n}\n\nion-spinner[_ngcontent-%COMP%] {\n  color: white;\n  width: 50px;\n  height: 50px;\n}\n\n\n\n.camera-select[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 1rem;\n  left: 1rem;\n  background: rgba(0, 0, 0, 0.7);\n  padding: 0.5rem;\n  border-radius: 0.5rem;\n  z-index: 999;\n  display: flex;\n  align-items: center;\n  color: white;\n\n  label {\n    margin-right: 0.5rem;\n    font-size: 14px;\n  }\n\n  select {\n    background: transparent;\n    color: white;\n    border: 1px solid white;\n    border-radius: 0.3rem;\n    font-size: 14px;\n    padding: 0.2rem;\n  }\n}\n\n.buttonfabCameraChange[_ngcontent-%COMP%] {\n  --background: rgba(0, 0, 0, 0.6);\n  --color: #fff;\n  //box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);\n  \n\n  \n\n}"] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CameraWithOverlayComponent, [{
        type: Component,
        args: [{ selector: 'app-camera-overlay', encapsulation: ViewEncapsulation.Emulated, template: "<ion-content color=\"dark\">\n  <div class=\"camera-overlay\">\n    <ion-fab vertical=\"top\" horizontal=\"start\" slot=\"fixed\" *ngIf=\"rearCams.length > 1\">\n      <ion-fab-button\n        class=\"buttonfabCameraChange\"\n        size=\"small\"\n        (click)=\"toggleRearCam()\">\n        <ion-icon name=\"camera-reverse-outline\"></ion-icon>\n      </ion-fab-button>\n    </ion-fab>\n    <!-- \u25B8 Encabezado ---------------------------------------------------- -->\n    <div class=\"header-text\">\n      <div class=\"text-help\">\n        <p>{{ text1 }}</p>\n      </div>\n      <p class=\"country\">{{ text2 }}</p>\n\n      <!-- \u25B8 Selector de c\u00E1maras traseras (solo se muestra si hay varias) -->\n      <!-- <ion-item  class=\"cam-picker\" lines=\"none\">\n        <ion-label>Elegir c\u00E1mara</ion-label>\n        <ion-select interface=\"popover\"\n                    [value]=\"selectedCamId\"\n                    (ionChange)=\"onSelectCam($event)\">\n          <ion-select-option *ngFor=\"let cam of rearCams\"\n                             [value]=\"cam.deviceId\">\n            {{ cam.label }}\n          </ion-select-option>\n        </ion-select>\n      </ion-item>-->\n    </div> \n\n    <!-- \u25B8 Loader mientras inicializa ------------------------------------ -->\n    <div *ngIf=\"isLoading\" class=\"loading-overlay\">\n      <ion-spinner name=\"crescent\"></ion-spinner>\n    </div>\n\n    <!-- \u25B8 Capa oscura con recorte (tu ventana de enfoque) --------------- -->\n    <div class=\"visible-window\"></div>\n\n    <!-- \u25B8 Contenedor del v\u00EDdeo + overlay -------------------------------- -->\n    <div class=\"camera-container\">\n      <video #videoElement autoplay muted playsinline></video>\n      <!-- <img [src]=\"overlaySrc\" alt=\"Overlay\" class=\"overlay-frame\" /> -->\n    </div>\n\n    <!-- \u25B8 Bot\u00F3n de captura ---------------------------------------------- -->\n    <div class=\"button-container\">\n      <ion-button (click)=\"capturePhoto()\"\n                  class=\"capture-button\"\n                  shape=\"round\"\n                  expand=\"block\">\n        <ion-icon name=\"camera-outline\"></ion-icon>\n      </ion-button>\n    </div>\n\n    <!-- \u25B8 Bot\u00F3n de cerrar ------------------------------------------------ -->\n    <ion-button fill=\"clear\"\n                (click)=\"closeOverlay()\"\n                class=\"close-button\">\n      <ion-icon name=\"close-outline\"></ion-icon>\n    </ion-button>\n  </div>\n</ion-content>\n", styles: ["ion-content {\n  --background: black;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n\n}\n\n.modal-container {\n  max-width: 400px; // Ajusta el valor seg\u00FAn tus necesidades\n\n}\n\n.camera-overlay {\n  position: relative;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n}\n\n.camera-container {\n  width: 100%;\n  height: 100%;\n  position: relative;\n\n  video {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n  }\n}\n\n.overlay-frame {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  max-width: 70%;\n  max-height: 70%;\n  z-index: 9;\n}\n\n.header-text {\n  position: absolute;\n  top: 50px;\n  width: 100%;\n  text-align: center;\n  color: white;\n  z-index: 15;\n\n  p {\n    margin: 0;\n    font-size: 18px;\n  }\n\n  .country {\n    font-weight: bold;\n  }\n}\n\n.button-container {\n  position: absolute;\n  bottom: 20px;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 10;\n}\n\n.capture-button {\n  width: 70px;\n  height: 70px;\n  border-radius: 50%;\n\n\n  --background: var(--purple-primary);\n    --background-hover: var(--purple-secondary);\n    --background-activated: var(--purple-secondary);\n    --background-focused: var(--purple-secondary);\n  \n    --color: white;\n  \n    --border-color: var(--purple-primary);\n    --border-style: solid;\n    --border-width: 1px;\n  \n    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n  \n    --ripple-color: var(--purple-secondary);\n}\n\n.close-button {\n  position: absolute;\n  top: 14px;\n  right: 20px;\n  color: white;\n  z-index: 10;\n}\n\n.visible-window {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  // width: 70%; /* Ajusta el tama\u00F1o del cuadro */\n  // height: 45%; /* Ajusta el tama\u00F1o del cuadro */\n\n  width: 313px;\n  height: 500px;\n\n  max-width: 90%;\n  max-height: 90%;\n  background: transparent;\n  border: 2px solid white; /* Color y grosor del borde */\n  border-radius: 10px; /* Ajusta para redondear las esquinas */\n  z-index: 10; /* Aseg\u00FArate de que est\u00E9 encima del overlay oscuro */\n  box-shadow: 0 0 0 100vw rgba(0, 0, 0, 0.65); /* Oscurece fuera del cuadro */\n}\n.text-help  p{\n  display: inline-block; /* Hace que solo el texto ocupe espacio */\n  background-color: white; /* Color de fondo del texto */\n  padding: 5px; /* Espaciado interno para una mejor visualizaci\u00F3n */\n  border-radius: 5px; /* Opcional, para esquinas redondeadas */\n  color: black; /* Color del texto */\n  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombra leve */\n  animation: popIn 1s ease-in-out; /* Agrega la animaci\u00F3n al aparecer */\n}\n\n/* Definimos la animaci\u00F3n \"popIn\" */\n@keyframes popIn {\n  0% {\n    transform: scale(0.8); /* Comienza m\u00E1s peque\u00F1o */\n    opacity: 0; /* Empieza invisible */\n  }\n  50% {\n    transform: scale(1.1); /* Crece un poco m\u00E1s de lo normal */\n    opacity: 1; /* Se hace visible */\n  }\n  100% {\n    transform: scale(1); /* Vuelve a su tama\u00F1o normal */\n  }\n}\n\n.loading-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.8); /* Fondo oscuro semi-transparente */\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000; /* Aseg\u00FArate de que est\u00E9 por encima del contenido */\n}\n\nion-spinner {\n  color: white;\n  width: 50px;\n  height: 50px;\n}\n\n\n\n.camera-select {\n  position: absolute;\n  top: 1rem;\n  left: 1rem;\n  background: rgba(0, 0, 0, 0.7);\n  padding: 0.5rem;\n  border-radius: 0.5rem;\n  z-index: 999;\n  display: flex;\n  align-items: center;\n  color: white;\n\n  label {\n    margin-right: 0.5rem;\n    font-size: 14px;\n  }\n\n  select {\n    background: transparent;\n    color: white;\n    border: 1px solid white;\n    border-radius: 0.3rem;\n    font-size: 14px;\n    padding: 0.2rem;\n  }\n}\n\n.buttonfabCameraChange {\n  --background: rgba(0, 0, 0, 0.6);\n  --color: #fff;\n  //box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);\n  /* ajusta posici\u00F3n extra si lo necesitas */\n  /* margin-top: 8px; margin-left: 8px; */\n}\n"] }]
    }], () => [{ type: i1.Platform }, { type: i1.ModalController }, { type: i2.ModalDpiServices }], { videoElement: [{
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
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CameraWithOverlayComponent, { className: "CameraWithOverlayComponent" }); })();
//# sourceMappingURL=camera-with-overlay.component.js.map