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
function CameraWithOverlayComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵelement(1, "ion-spinner", 16);
    i0.ɵɵelementEnd();
} }
export class CameraWithOverlayComponent {
    constructor(platform, modalController, modaldpiServices) {
        this.platform = platform;
        this.modalController = modalController;
        this.modaldpiServices = modaldpiServices;
        /* ▸ Inputs / Outputs */
        this.text1 = '';
        this.text2 = '';
        this.overlaySrc = '';
        this.closeRequested = new EventEmitter();
        /* ▸ Estado */
        this.stream = null;
        this.isLoading = true;
        /* ▸ Plataforma */
        this.isAndroid = this.platform.is('android');
        this.isIOS = this.platform.is('ios');
    }
    /* ─────────────── Life‑cycle ─────────────── */
    ngAfterViewInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.requestPermissions();
            /* DEBUG – muestra todas las cámaras halladas */
            yield this.logAvailableCams();
            this.stream = yield this.selectRearCamera();
            if (this.stream)
                this.attachStream(this.stream);
            this.isLoading = false;
            /* Eventos externos */
            this.modaldpiServices.closeOverlay$.subscribe(() => this.closeOverlay());
            this.modaldpiServices.resumeCameraSubject$.subscribe(() => this.resumeCamera());
        });
    }
    ngOnDestroy() {
        this.stopCamera();
    }
    /* ─────────────── Permisos ─────────────── */
    requestPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            if (Capacitor.getPlatform() !== 'web' && (this.isAndroid || this.isIOS)) {
                const { camera } = yield Camera.requestPermissions();
                if (camera === 'denied') {
                    console.error('Permiso de cámara denegado');
                }
            }
        });
    }
    /* ─────────────── Cámara trasera robusta ─────────────── */
    /** Muestra en consola cada videoinput encontrado (para debug). */
    logAvailableCams() {
        return __awaiter(this, void 0, void 0, function* () {
            const devs = yield navigator.mediaDevices.enumerateDevices();
            devs
                .filter(d => d.kind === 'videoinput')
                .forEach((d, i) => console.log(`[${i}] "${d.label}" — id: ${d.deviceId}`));
        });
    }
    /**
     * Selecciona la cámara trasera con varios intentos:
     * 1) facingMode:'environment' exact.
     * 2) Recorre todas y acepta la primera cuyo facingMode !== 'user'.
     * 3) Si hay ≥2 cámaras, prueba la segunda (suele ser trasera).
     * 4) Fallback: primera cámara disponible.
     */
    selectRearCamera() {
        return __awaiter(this, void 0, void 0, function* () {
            /* 1 — prueba facingMode exact estándar */
            try {
                const std = yield navigator.mediaDevices.getUserMedia({
                    video: { facingMode: { exact: 'environment' } },
                    audio: false
                });
                const fm = std.getVideoTracks()[0].getSettings().facingMode;
                if (fm === 'environment')
                    return std;
                std.getTracks().forEach(t => t.stop());
            }
            catch ( /* ignoramos */_a) { /* ignoramos */ }
            /* 2 — recorre cada lente buscando algo que no sea 'user' */
            const devices = (yield navigator.mediaDevices.enumerateDevices())
                .filter(d => d.kind === 'videoinput');
            for (const cam of devices) {
                try {
                    const s = yield navigator.mediaDevices.getUserMedia({
                        video: { deviceId: { exact: cam.deviceId }, width: 640, height: 480 },
                        audio: false
                    });
                    const mode = s.getVideoTracks()[0].getSettings().facingMode || '';
                    if (mode !== 'user')
                        return s; // aceptamos environment, back, vacío, etc.
                    s.getTracks().forEach(t => t.stop());
                }
                catch ( /* ignoramos */_b) { /* ignoramos */ }
            }
            /* 3 — plan C: prueba la segunda cámara si existe */
            if (devices.length > 1) {
                try {
                    return navigator.mediaDevices.getUserMedia({
                        video: { deviceId: { exact: devices[1].deviceId } },
                        audio: false
                    });
                }
                catch ( /* ignoramos */_c) { /* ignoramos */ }
            }
            /* 4 — último recurso */
            console.warn('Usando cámara por defecto (puede ser frontal).');
            return navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        });
    }
    /* ─────────────── Preview en <video> ─────────────── */
    attachStream(stream) {
        const video = this.videoElement.nativeElement;
        video.srcObject = stream;
        video.autoplay = true;
        video.playsInline = true;
        video.muted = true;
        video.onloadedmetadata = () => video.play().catch(console.error);
    }
    /* ─────────────── Captura de foto ─────────────── */
    capturePhoto() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.stream)
                return console.error('La cámara no está inicializada.');
            const video = this.videoElement.nativeElement;
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth || 1920;
            canvas.height = video.videoHeight || 1080;
            const ctx = canvas.getContext('2d');
            if (!ctx)
                return console.error('No se pudo obtener el contexto del canvas.');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            /* compresión hasta ≤5 MB */
            let quality = 0.98;
            const maxBytes = 5 * 1024 * 1024;
            const toBlob = (q) => new Promise(res => canvas.toBlob(b => res(b), 'image/jpeg', q));
            let blob = yield toBlob(quality);
            while (blob && blob.size > maxBytes && quality > 0.4) {
                quality -= 0.05;
                blob = yield toBlob(quality);
            }
            if (blob && blob.size <= maxBytes) {
                const file = new File([blob], 'dpi.jpeg', { type: 'image/jpeg' });
                video.pause();
                try {
                    yield this.onTakePicture(file);
                }
                catch (err) {
                    console.error('Error en onTakePicture:', err);
                }
            }
            else {
                console.error('No se pudo reducir la imagen por debajo de 5 MB.');
            }
        });
    }
    /* ─────────────── Utilidades de cierre ─────────────── */
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
    } }, inputs: { text1: "text1", text2: "text2", overlaySrc: "overlaySrc", onTakePicture: "onTakePicture" }, outputs: { closeRequested: "closeRequested" }, decls: 18, vars: 3, consts: [["videoElement", ""], ["color", "dark"], [1, "camera-overlay"], [1, "header-text"], [1, "text-help"], [1, "country"], ["class", "loading-overlay", 4, "ngIf"], [1, "visible-window"], [1, "camera-container"], ["autoplay", "", "muted", "", "playsinline", ""], [1, "button-container"], ["shape", "round", "expand", "block", 1, "capture-button", 3, "click"], ["name", "camera-outline"], ["fill", "clear", 1, "close-button", 3, "click"], ["name", "close-outline"], [1, "loading-overlay"], ["name", "crescent"]], template: function CameraWithOverlayComponent_Template(rf, ctx) { if (rf & 1) {
        const _r1 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "ion-content", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "p");
        i0.ɵɵtext(5);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(6, "p", 5);
        i0.ɵɵtext(7);
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(8, CameraWithOverlayComponent_div_8_Template, 2, 0, "div", 6);
        i0.ɵɵelement(9, "div", 7);
        i0.ɵɵelementStart(10, "div", 8);
        i0.ɵɵelement(11, "video", 9, 0);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "div", 10)(14, "ion-button", 11);
        i0.ɵɵlistener("click", function CameraWithOverlayComponent_Template_ion_button_click_14_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.capturePhoto()); });
        i0.ɵɵelement(15, "ion-icon", 12);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(16, "ion-button", 13);
        i0.ɵɵlistener("click", function CameraWithOverlayComponent_Template_ion_button_click_16_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeOverlay()); });
        i0.ɵɵelement(17, "ion-icon", 14);
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.text1);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.text2);
        i0.ɵɵadvance();
        i0.ɵɵproperty("ngIf", ctx.isLoading);
    } }, dependencies: [i3.NgIf, i1.IonButton, i1.IonContent, i1.IonIcon, i1.IonSpinner], styles: ["ion-content[_ngcontent-%COMP%] {\n  --background: black;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n\n}\n\n.modal-container[_ngcontent-%COMP%] {\n  max-width: 400px; // Ajusta el valor seg\u00FAn tus necesidades\n\n}\n\n.camera-overlay[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n}\n\n.camera-container[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  position: relative;\n\n  video {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n  }\n}\n\n.overlay-frame[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  max-width: 70%;\n  max-height: 70%;\n  z-index: 9;\n}\n\n.header-text[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50px;\n  width: 100%;\n  text-align: center;\n  color: white;\n  z-index: 15;\n\n  p {\n    margin: 0;\n    font-size: 18px;\n  }\n\n  .country {\n    font-weight: bold;\n  }\n}\n\n.button-container[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 20px;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 10;\n}\n\n.capture-button[_ngcontent-%COMP%] {\n  width: 70px;\n  height: 70px;\n  border-radius: 50%;\n\n\n  --background: var(--purple-primary);\n    --background-hover: var(--purple-secondary);\n    --background-activated: var(--purple-secondary);\n    --background-focused: var(--purple-secondary);\n  \n    --color: white;\n  \n    --border-color: var(--purple-primary);\n    --border-style: solid;\n    --border-width: 1px;\n  \n    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n  \n    --ripple-color: var(--purple-secondary);\n}\n\n.close-button[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 14px;\n  right: 20px;\n  color: white;\n  z-index: 10;\n}\n\n.visible-window[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  // width: 70%; \n\n  // height: 45%; \n\n\n  width: 313px;\n  height: 500px;\n\n  max-width: 90%;\n  max-height: 90%;\n  background: transparent;\n  border: 2px solid white; \n\n  border-radius: 10px; \n\n  z-index: 10; \n\n  box-shadow: 0 0 0 100vw rgba(0, 0, 0, 0.65); \n\n}\n.text-help[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{\n  display: inline-block; \n\n  background-color: white; \n\n  padding: 5px; \n\n  border-radius: 5px; \n\n  color: black; \n\n  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); \n\n  animation: _ngcontent-%COMP%_popIn 1s ease-in-out; \n\n}\n\n\n\n@keyframes _ngcontent-%COMP%_popIn {\n  0% {\n    transform: scale(0.8); \n\n    opacity: 0; \n\n  }\n  50% {\n    transform: scale(1.1); \n\n    opacity: 1; \n\n  }\n  100% {\n    transform: scale(1); \n\n  }\n}\n\n.loading-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.8); \n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000; \n\n}\n\nion-spinner[_ngcontent-%COMP%] {\n  color: white;\n  width: 50px;\n  height: 50px;\n}\n\n\n\n.camera-select[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 1rem;\n  left: 1rem;\n  background: rgba(0, 0, 0, 0.7);\n  padding: 0.5rem;\n  border-radius: 0.5rem;\n  z-index: 999;\n  display: flex;\n  align-items: center;\n  color: white;\n\n  label {\n    margin-right: 0.5rem;\n    font-size: 14px;\n  }\n\n  select {\n    background: transparent;\n    color: white;\n    border: 1px solid white;\n    border-radius: 0.3rem;\n    font-size: 14px;\n    padding: 0.2rem;\n  }\n}"] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CameraWithOverlayComponent, [{
        type: Component,
        args: [{ selector: 'app-camera-overlay', encapsulation: ViewEncapsulation.Emulated, template: "<ion-content color=\"dark\">\n  <div class=\"camera-overlay\">\n    <div class=\"header-text\">\n      <div class=\"text-help\">\n        <p>{{text1}}</p>\n      </div>\n      <p class=\"country\">{{text2}}</p>\n    </div>\n\n\n    <div *ngIf=\"isLoading\" class=\"loading-overlay\">\n      <ion-spinner name=\"crescent\"></ion-spinner>\n    </div>\n    \n    <!-- Capa oscura con recorte en el centro -->\n    <div class=\"visible-window\"></div>\n\n    <!-- Video de la c\u00E1mara con el overlay centrado -->\n    <div class=\"camera-container\" >\n      <video #videoElement autoplay muted playsinline></video>\n      <!-- <img [src]=\"overlaySrc\" alt=\"Overlay\" class=\"overlay-frame\" /> -->\n    </div>\n\n    <!-- Bot\u00F3n de captura centrado en la parte inferior -->\n    <div class=\"button-container\">\n      <ion-button (click)=\"capturePhoto()\" class=\"capture-button\" shape=\"round\" expand=\"block\">\n        <ion-icon name=\"camera-outline\"></ion-icon>\n      </ion-button>\n    </div>\n\n    <!-- Bot\u00F3n de cerrar en la esquina superior derecha -->\n    <ion-button fill=\"clear\" (click)=\"closeOverlay()\" class=\"close-button\">\n      <ion-icon name=\"close-outline\"></ion-icon>\n    </ion-button>\n  </div>\n\n  <!-- Mostrar la imagen capturada si existe\n  <div *ngIf=\"capturedImageUrl\">\n    <h3>Imagen Capturada:</h3>\n    <img [src]=\"capturedImageUrl\" alt=\"Foto capturada\" />\n  </div> -->\n</ion-content>", styles: ["ion-content {\n  --background: black;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n\n}\n\n.modal-container {\n  max-width: 400px; // Ajusta el valor seg\u00FAn tus necesidades\n\n}\n\n.camera-overlay {\n  position: relative;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n}\n\n.camera-container {\n  width: 100%;\n  height: 100%;\n  position: relative;\n\n  video {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n  }\n}\n\n.overlay-frame {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  max-width: 70%;\n  max-height: 70%;\n  z-index: 9;\n}\n\n.header-text {\n  position: absolute;\n  top: 50px;\n  width: 100%;\n  text-align: center;\n  color: white;\n  z-index: 15;\n\n  p {\n    margin: 0;\n    font-size: 18px;\n  }\n\n  .country {\n    font-weight: bold;\n  }\n}\n\n.button-container {\n  position: absolute;\n  bottom: 20px;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 10;\n}\n\n.capture-button {\n  width: 70px;\n  height: 70px;\n  border-radius: 50%;\n\n\n  --background: var(--purple-primary);\n    --background-hover: var(--purple-secondary);\n    --background-activated: var(--purple-secondary);\n    --background-focused: var(--purple-secondary);\n  \n    --color: white;\n  \n    --border-color: var(--purple-primary);\n    --border-style: solid;\n    --border-width: 1px;\n  \n    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n  \n    --ripple-color: var(--purple-secondary);\n}\n\n.close-button {\n  position: absolute;\n  top: 14px;\n  right: 20px;\n  color: white;\n  z-index: 10;\n}\n\n.visible-window {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  // width: 70%; /* Ajusta el tama\u00F1o del cuadro */\n  // height: 45%; /* Ajusta el tama\u00F1o del cuadro */\n\n  width: 313px;\n  height: 500px;\n\n  max-width: 90%;\n  max-height: 90%;\n  background: transparent;\n  border: 2px solid white; /* Color y grosor del borde */\n  border-radius: 10px; /* Ajusta para redondear las esquinas */\n  z-index: 10; /* Aseg\u00FArate de que est\u00E9 encima del overlay oscuro */\n  box-shadow: 0 0 0 100vw rgba(0, 0, 0, 0.65); /* Oscurece fuera del cuadro */\n}\n.text-help  p{\n  display: inline-block; /* Hace que solo el texto ocupe espacio */\n  background-color: white; /* Color de fondo del texto */\n  padding: 5px; /* Espaciado interno para una mejor visualizaci\u00F3n */\n  border-radius: 5px; /* Opcional, para esquinas redondeadas */\n  color: black; /* Color del texto */\n  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombra leve */\n  animation: popIn 1s ease-in-out; /* Agrega la animaci\u00F3n al aparecer */\n}\n\n/* Definimos la animaci\u00F3n \"popIn\" */\n@keyframes popIn {\n  0% {\n    transform: scale(0.8); /* Comienza m\u00E1s peque\u00F1o */\n    opacity: 0; /* Empieza invisible */\n  }\n  50% {\n    transform: scale(1.1); /* Crece un poco m\u00E1s de lo normal */\n    opacity: 1; /* Se hace visible */\n  }\n  100% {\n    transform: scale(1); /* Vuelve a su tama\u00F1o normal */\n  }\n}\n\n.loading-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.8); /* Fondo oscuro semi-transparente */\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000; /* Aseg\u00FArate de que est\u00E9 por encima del contenido */\n}\n\nion-spinner {\n  color: white;\n  width: 50px;\n  height: 50px;\n}\n\n\n\n.camera-select {\n  position: absolute;\n  top: 1rem;\n  left: 1rem;\n  background: rgba(0, 0, 0, 0.7);\n  padding: 0.5rem;\n  border-radius: 0.5rem;\n  z-index: 999;\n  display: flex;\n  align-items: center;\n  color: white;\n\n  label {\n    margin-right: 0.5rem;\n    font-size: 14px;\n  }\n\n  select {\n    background: transparent;\n    color: white;\n    border: 1px solid white;\n    border-radius: 0.3rem;\n    font-size: 14px;\n    padding: 0.2rem;\n  }\n}\n"] }]
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