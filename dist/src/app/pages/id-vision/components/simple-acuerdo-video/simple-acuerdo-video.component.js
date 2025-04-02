import { __awaiter } from "tslib";
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Camera } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { ScreenBrightness } from '@capacitor-community/screen-brightness';
import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/common";
const _c0 = ["videoElement"];
const _c1 = ["progressRing"];
const _c2 = a0 => ({ "red": a0 });
function SimpleAcuerdoVideoComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵelement(1, "ion-spinner", 26);
    i0.ɵɵelementEnd();
} }
function SimpleAcuerdoVideoComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27)(1, "div", 28);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.countdown);
} }
function SimpleAcuerdoVideoComponent_div_24_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 32);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const word_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", word_r3, " ");
} }
function SimpleAcuerdoVideoComponent_div_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29)(1, "p", 30);
    i0.ɵɵtemplate(2, SimpleAcuerdoVideoComponent_div_24_span_2_Template, 2, 1, "span", 31);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.words);
} }
function SimpleAcuerdoVideoComponent_ion_button_26_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ion-button", 33);
    i0.ɵɵlistener("click", function SimpleAcuerdoVideoComponent_ion_button_26_Template_ion_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.recordVideo()); });
    i0.ɵɵelement(1, "ion-icon", 34);
    i0.ɵɵelementEnd();
} }
function SimpleAcuerdoVideoComponent_ion_button_27_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ion-button", 35);
    i0.ɵɵlistener("click", function SimpleAcuerdoVideoComponent_ion_button_27_Template_ion_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.stopRecording()); });
    i0.ɵɵelement(1, "ion-icon", 36);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", !ctx_r1.canStopRecording);
} }
function SimpleAcuerdoVideoComponent_ng_template_29_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 32);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const word_r7 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", word_r7, " ");
} }
function SimpleAcuerdoVideoComponent_ng_template_29_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 37)(1, "div", 38);
    i0.ɵɵelement(2, "img", 39);
    i0.ɵɵelementStart(3, "h2");
    i0.ɵɵtext(4, "Instrucciones");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 30);
    i0.ɵɵtemplate(6, SimpleAcuerdoVideoComponent_ng_template_29_span_6_Template, 2, 1, "span", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 40)(8, "ion-button", 8);
    i0.ɵɵlistener("click", function SimpleAcuerdoVideoComponent_ng_template_29_Template_ion_button_click_8_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeModal()); });
    i0.ɵɵtext(9, "Comenzar");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r1.instructionWords);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.isSpeaking);
} }
function SimpleAcuerdoVideoComponent_ng_template_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 37)(1, "div", 41)(2, "div", 42);
    i0.ɵɵelement(3, "ion-icon", 43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 44)(5, "p");
    i0.ɵɵtext(6, "Contesta con tu voz");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 45)(8, "div", 46)(9, "p");
    i0.ɵɵtext(10, "S\u00ED");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 47)(12, "p");
    i0.ɵɵtext(13, "o");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 46)(15, "p");
    i0.ɵɵtext(16, "No");
    i0.ɵɵelementEnd()()()()()();
} }
export class SimpleAcuerdoVideoComponent {
    constructor(platform, modalController, sanitizer, renderer, alertController, changeDetector) {
        this.platform = platform;
        this.modalController = modalController;
        this.sanitizer = sanitizer;
        this.renderer = renderer;
        this.alertController = alertController;
        this.changeDetector = changeDetector;
        this.closeRequested = new EventEmitter();
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
        this.isModalOpen = false;
        this.isModalVoiceOpen = false;
        //TTS
        this.text = '¿Acepta los términos y condiciones del crédito que está solicitando en Fundación Génesis Empresarial?';
        this.instructions = 'Por favor contesta "SI" o "NO" a la pregunta para completar el proceso.';
        this.words = [];
        this.instructionWords = [];
        this.currentIndex = 0;
        this.timePerWord = 380; //350
        this.isSpeaking = false;
        this.showTextAcuerdo = false;
        this.isAndroid = this.platform.is('android');
        this.isIOS = this.platform.is('ios');
    }
    ngAfterViewInit() {
        return __awaiter(this, void 0, void 0, function* () {
            // this.isModalOpen = true;
            this.openModal();
            // this.openModalVoice();
            this.words = this.text.split(' ');
            this.instructionWords = this.instructions.split(' ');
            setTimeout(() => {
                this.speakText(this.instructionWords, this.instructions);
            }, 500);
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
            // await this.startRecording();
            yield this.waitForCameraReady();
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
    // Función para abrir la modal
    openModal() {
        this.isModalOpen = true; // Abrir la modal
    }
    openModalVoice() {
        this.isModalVoiceOpen = true;
    }
    closeModalVoice() {
        this.isModalVoiceOpen = false;
    }
    // Función para cerrar la modal
    closeModal() {
        this.isModalOpen = false; // Cerrar la modal
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
                const videoFile = this.blobToFile(videoBlob, `video-selfie.${fileExtension}`);
                if (this.backFunction) {
                    yield this.backFunction(videoFile);
                }
            });
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
    recordVideo() {
        return __awaiter(this, void 0, void 0, function* () {
            // Mostrar la cuenta regresiva antes de iniciar la grabación
            this.countdown = 3;
            const countdownInterval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                this.countdown -= 1;
                if (this.countdown <= 0) {
                    this.showTextAcuerdo = true;
                    clearInterval(countdownInterval);
                    yield this.speakText(this.words, this.text);
                    this.openModalVoice();
                    this.startVideoRecord(); // Iniciar la grabación después de la cuenta regresiva
                }
                this.changeDetector.detectChanges(); // Actualizar la vista
            }), 1000);
        });
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
                this.closeModalVoice();
                console.log(this.capVideo);
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
    closeOverlayVideo() {
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
    //TTS
    speakText(words, text) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isSpeaking) {
                return; // Si ya se está hablando, no hacer nada
            }
            this.isSpeaking = true; // Establecer que el proceso está en marcha
            this.currentIndex = 0;
            this.highlightWord(this.currentIndex); // Resaltar la primera palabra
            yield this.speakSentenceWithHighlights(words, text); // Hablar la oración y resaltar simultáneamente
        });
    }
    speakSentenceWithHighlights(words, text) {
        return __awaiter(this, void 0, void 0, function* () {
            // Leer todo el texto fluido
            // Resaltar las palabras mientras se lee el texto
            words.forEach((word, index) => {
                setTimeout(() => {
                    this.currentIndex = index;
                    this.highlightWord(this.currentIndex); // Resaltar la palabra
                }, this.timePerWord * index); // Sincroniza con el tiempo de la palabra
            });
            yield TextToSpeech.speak({
                text: text,
                lang: 'es-MX',
                rate: 0.85,
                volume: 1.0,
                pitch: 1.2,
            });
            // Una vez que se termine, habilitar nuevamente el botón
            this.isSpeaking = false;
        });
    }
    // Función para resaltar la palabra que está siendo leída
    highlightWord(index) {
        const wordElements = document.querySelectorAll('.subtitle-word');
        wordElements.forEach((el, idx) => {
            if (idx === index) {
                el.classList.add('highlight'); // Resalta la palabra actual
                el.classList.remove('read'); // Elimina el color de texto leído
            }
            else {
                el.classList.remove('highlight');
                el.classList.add('read'); // Marca como leído
            }
        });
    }
}
SimpleAcuerdoVideoComponent.ɵfac = function SimpleAcuerdoVideoComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SimpleAcuerdoVideoComponent)(i0.ɵɵdirectiveInject(i1.Platform), i0.ɵɵdirectiveInject(i1.ModalController), i0.ɵɵdirectiveInject(i2.DomSanitizer), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i1.AlertController), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
SimpleAcuerdoVideoComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SimpleAcuerdoVideoComponent, selectors: [["app-simple-acuerdo-video"]], viewQuery: function SimpleAcuerdoVideoComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
        i0.ɵɵviewQuery(_c1, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.videoElement = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.progressRing = _t.first);
    } }, inputs: { backFunction: "backFunction" }, outputs: { closeRequested: "closeRequested" }, decls: 32, vars: 12, consts: [["videoElement", ""], ["progressRing", ""], ["color", "light", 1, "custom-content"], ["class", "loading-overlay", 4, "ngIf"], ["class", "countdown-overlay", 4, "ngIf"], [1, "ion-no-border"], ["color", "light"], ["slot", "end"], [3, "click", "disabled"], ["name", "close"], [1, "main-header"], [1, "main-title"], [1, "acuerdo-text"], [1, "camera-container"], [1, "video-wrapper"], ["muted", "", "autoplay", "", "playsinline", "", 2, "transform", "scaleX(-1)"], ["width", "300", "height", "300", 1, "progress-ring"], ["cx", "150", "cy", "150", "r", "150", 1, "progress-ring__circle"], [3, "ngClass"], ["class", "text-container", 4, "ngIf"], [1, "fixed-footer"], ["size", "large", "expand", "block", "shape", "round", 3, "click", 4, "ngIf"], ["size", "large", "expand", "block", 3, "disabled", "click", 4, "ngIf"], ["id", "example-modal", 3, "didDismiss", "isOpen"], ["id", "voice-modal", 3, "didDismiss", "isOpen"], [1, "loading-overlay"], ["name", "crescent"], [1, "countdown-overlay"], [1, "countdown"], [1, "text-container"], [1, "subtitle"], ["class", "subtitle-word", 4, "ngFor", "ngForOf"], [1, "subtitle-word"], ["size", "large", "expand", "block", "shape", "round", 3, "click"], ["slot", "icon-only", "name", "camera-outline"], ["size", "large", "expand", "block", 3, "click", "disabled"], ["slot", "icon-only", "name", "stop-outline"], [1, "full-content"], [1, "modal-content"], ["src", "https://placeholder.pics/svg/150x150", "alt", ""], [1, "button-container"], [1, "modal-content-2"], [1, "modal-header"], ["name", "mic", "size", "large", 2, "width", "50px !important", "height", "50px !important"], [1, "modal-body"], [1, "icons-container"], [1, "custom-text"], [1, "o-text"]], template: function SimpleAcuerdoVideoComponent_Template(rf, ctx) { if (rf & 1) {
        const _r1 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "ion-content", 2);
        i0.ɵɵtemplate(1, SimpleAcuerdoVideoComponent_div_1_Template, 2, 0, "div", 3)(2, SimpleAcuerdoVideoComponent_div_2_Template, 3, 1, "div", 4);
        i0.ɵɵelementStart(3, "ion-header", 5)(4, "ion-toolbar", 6)(5, "ion-buttons", 7)(6, "ion-button", 8);
        i0.ɵɵlistener("click", function SimpleAcuerdoVideoComponent_Template_ion_button_click_6_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeOverlayVideo()); });
        i0.ɵɵelement(7, "ion-icon", 9);
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(8, "div", 10)(9, "div", 11)(10, "h1");
        i0.ɵɵtext(11, "Acuerdo de Video");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(12, "div", 12)(13, "p");
        i0.ɵɵtext(14, "Contesta \u00FAnicamente \"S\u00ED\" si est\u00E1s de acuerdo con el cr\u00E9dito y contesta \"No\" para cancelar el proceso.");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(15, "div", 13)(16, "div", 14);
        i0.ɵɵelement(17, "video", 15, 0);
        i0.ɵɵnamespaceSVG();
        i0.ɵɵelementStart(19, "svg", 16, 1);
        i0.ɵɵelement(21, "circle", 17);
        i0.ɵɵelementEnd()();
        i0.ɵɵnamespaceHTML();
        i0.ɵɵelementStart(22, "ion-label", 18);
        i0.ɵɵtext(23);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(24, SimpleAcuerdoVideoComponent_div_24_Template, 3, 1, "div", 19);
        i0.ɵɵelementStart(25, "div", 20);
        i0.ɵɵtemplate(26, SimpleAcuerdoVideoComponent_ion_button_26_Template, 2, 0, "ion-button", 21)(27, SimpleAcuerdoVideoComponent_ion_button_27_Template, 2, 1, "ion-button", 22);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(28, "ion-modal", 23);
        i0.ɵɵlistener("didDismiss", function SimpleAcuerdoVideoComponent_Template_ion_modal_didDismiss_28_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeModal()); });
        i0.ɵɵtemplate(29, SimpleAcuerdoVideoComponent_ng_template_29_Template, 10, 2, "ng-template");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(30, "ion-modal", 24);
        i0.ɵɵlistener("didDismiss", function SimpleAcuerdoVideoComponent_Template_ion_modal_didDismiss_30_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeModalVoice()); });
        i0.ɵɵtemplate(31, SimpleAcuerdoVideoComponent_ng_template_31_Template, 17, 0, "ng-template");
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵadvance();
        i0.ɵɵproperty("ngIf", ctx.isLoading);
        i0.ɵɵadvance();
        i0.ɵɵproperty("ngIf", ctx.countdown > 0);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("disabled", !ctx.canStopRecording);
        i0.ɵɵadvance(16);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(10, _c2, ctx.isRecording));
        i0.ɵɵadvance();
        i0.ɵɵtextInterpolate1("00:", ctx.timeRemaining < 10 ? "0" + ctx.timeRemaining : ctx.timeRemaining, "");
        i0.ɵɵadvance();
        i0.ɵɵproperty("ngIf", ctx.showTextAcuerdo);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", !ctx.isRecording);
        i0.ɵɵadvance();
        i0.ɵɵproperty("ngIf", ctx.isRecording);
        i0.ɵɵadvance();
        i0.ɵɵproperty("isOpen", ctx.isModalOpen);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("isOpen", ctx.isModalVoiceOpen);
    } }, dependencies: [i3.NgClass, i3.NgForOf, i3.NgIf, i1.IonButton, i1.IonButtons, i1.IonContent, i1.IonHeader, i1.IonIcon, i1.IonLabel, i1.IonSpinner, i1.IonToolbar, i1.IonModal], styles: [".camera-container[_ngcontent-%COMP%] {\n  justify-content: center;\n  align-items: center;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 50%; // Antes era 70%\n  background-color: white;\n}\n\n.video-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  width: 300px;\n  height: 300px;\n  border-radius: 50%;\n  overflow: hidden;\n}\n\nvideo[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  border-radius: 50%;\n}\n\n.progress-ring[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  transform: rotate(-90deg); \n\n}\n\n.progress-ring__circle[_ngcontent-%COMP%] {\n  fill: transparent;\n  stroke: purple;\n  stroke-width: 12;\n  stroke-dasharray: 945; \n\n  stroke-dashoffset: 880; \n\n  transition: stroke-dashoffset 12s linear; \n\n}\n\n.progress-active[_ngcontent-%COMP%]   .progress-ring__circle[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_progress-animation 5s linear forwards;\n}\n\n@keyframes _ngcontent-%COMP%_progress-animation {\n  from {\n    stroke-dashoffset: 880;\n  }\n  to {\n    stroke-dashoffset: 0;\n  }\n}\n\n//[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   //[_ngcontent-%COMP%]  {\n//   color: #ffffff;\n//   font-weight: 50px;\n//   border-radius: 20px;\n//   margin-top: 20px;\n//   //width: 90%;\n//   //max-width: 300px;\n//   align-self: center;\n//   text-transform: none;\n\n//   --background: var(--purple-primary);\n//   --background-hover: var(--purple-secondary);\n//   --background-activated: var(--purple-secondary);\n//   --background-focused: var(--purple-secondary);\n\n//   --color: var(--purple-primary);\n\n//   --border-radius: 20px;\n//   --border-color: var(--purple-primary);\n//   --border-style: solid;\n//   --border-width: 1px;\n\n//   --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n\n//   --ripple-color: var(--purple-secondary);\n\n\n//   --padding-top: 10px;\n//   --padding-bottom: 10px;\n// }\n\n.text-container[_ngcontent-%COMP%] {\n  height: 40px;\n  color: black;\n}\n\nion-header[_ngcontent-%COMP%] {\n  --background: #ffffff; \n\n}\n\n\n\n.centered-title[_ngcontent-%COMP%] {\n  text-align: center;\n  width: 100%; \n\n  font-weight: bold;\n}\n\n.fixed-footer[_ngcontent-%COMP%] {\n\n  position: fixed;\n  bottom: 0;\n  // left: 0;\n  left: 50%;\n  // width: 100%;\n  width: auto;\n  transform: translateX(-50%); \n\n  justify-content: center;\n  padding: 10px;\n  background-color: #fff; // Color de fondo, opcional\n // box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);\n\n  ion-button {\n  //   width: 90%;\n  //   max-width: 300px; // anteriormente 300\n  width: auto;\n    margin: 0 auto;\n    background-color: #ffcc00;\n    color: #ffffff;\n    font-weight: bold;\n    border-radius: 20px;\n\n    --background: var(--purple-primary);\n    --background-hover: var(--purple-secondary);\n    --background-activated: var(--purple-secondary);\n    --background-focused: var(--purple-secondary);\n  \n    --color: var(--purple-primary);\n  \n    --border-radius: 20px;\n    --border-color: var(--purple-primary);\n    --border-style: solid;\n    --border-width: 1px;\n  \n    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n  \n    --ripple-color: var(--purple-secondary);\n  \n\n    &:hover {\n      background-color: #ffb300;\n    }\n\n    &:active {\n      background-color: #e6a800;\n    }\n  }\n}\n\n\nion-header[_ngcontent-%COMP%] {\n  --background: #ffffff; \n\n  color: #000000; \n\n}\n\nion-toolbar[_ngcontent-%COMP%] {\n  --ion-background-color: #ffffff !important;\n  --background: #ffffff !important;\n  color: #000000;\n}\n\n\nion-header[_ngcontent-%COMP%] {\n  --background: #ffffff; \n\n}\n\nion-toolbar[_ngcontent-%COMP%] {\n  --ion-background-color: #ffffff !important;\n  --background: #ffffff !important;\n  color: #000000;\n  display: flex;\n  justify-content: space-between; \n\n  align-items: center;\n}\n\n.centered-title[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: center; \n\n  font-weight: bold;\n  color: #000000;\n  margin: 0; \n\n}\n\nion-buttons[_ngcontent-%COMP%] {\n  justify-content: flex-end; \n\n}\n.countdown-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.6); \n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0;\n  padding: 0;\n  z-index: 1000; \n\n  animation: _ngcontent-%COMP%_fadeIn 0.5s ease-out, _ngcontent-%COMP%_fadeOut 0.5s ease-out 2.5s; \n\n  box-sizing: border-box;\n  border-radius: 0px;\n\n}\n\nion-content.custom-content[_ngcontent-%COMP%] {\n  --padding-top: 0;\n  --padding-bottom: 0;\n  margin: 0;\n  padding: 0;\n}\n\n.countdown[_ngcontent-%COMP%] {\n  font-size: 100px;\n  font-weight: bold;\n  color: white;\n  animation: _ngcontent-%COMP%_scaleUp 0.5s ease-out, _ngcontent-%COMP%_scaleDown 0.5s ease-out 2.5s; \n\n}\n\n\n\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_fadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n\n\n@keyframes _ngcontent-%COMP%_scaleUp {\n  from {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_scaleDown {\n  from {\n    transform: scale(1);\n    opacity: 1;\n  }\n  to {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n}\n\n.red[_ngcontent-%COMP%] {\n  padding: 10px;\n  color: red;\n}\n\n.text-center[_ngcontent-%COMP%]{\n  text-align: center;\n  padding-left: 20%;\n  padding-right: 20%;\n  color: #333;\n}\n\n.loading-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.8); \n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000; \n\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  border-radius: 0px;\n}\n\nion-spinner[_ngcontent-%COMP%] {\n  color: white;\n  width: 50px;\n  height: 50px;\n}\n\n.main-header[_ngcontent-%COMP%] {\n  padding-left: 24px;\n  padding-right: 24px;\n}\n\n.main-title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: bold;\n  color: var(--purple-secondary);\n}\n\n.acuerdo-text[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: black;\n}\n\n//TTS\n\n.subtitle[_ngcontent-%COMP%] {\n  padding: 0px 24px;\n  text-align: left;\n  font-size: 17px;\n}\n.subtitle-word[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin: 0 3px;\n  transition: background-color 0.3s ease, color 0.3s ease;\n  border-radius: 10px;\n\n}\n\n.subtitle-word.highlight[_ngcontent-%COMP%] {\n  background-color: purple;\n  border-radius: 6px;\n  color: white;\n  padding: 4px;\n  font-weight: 600;\n}\n\n\n.subtitle-word.read[_ngcontent-%COMP%] {\n  color: gray; \n\n}\n\n.button-container[_ngcontent-%COMP%] {\n  justify-content: center;\n  display: flex;\n}\n\n\n//[_ngcontent-%COMP%]   MODAL\n\nion-modal[_ngcontent-%COMP%] {\n--display: flex;\n--height: 100%;\n--width: 100%;\n// --border-radius: 16px;\n// --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n// --background: rgba(0, 0, 0, 0.30) !important;\n}\n\n.full-content[_ngcontent-%COMP%] {\nwidth: 100%;\nheight: 100%;\ndisplay: flex;\njustify-content: center;\nalign-items: center;\nbackground-color: rgba(0, 0, 0, 0.30) !important;\n\n}\n\n.modal-content[_ngcontent-%COMP%] {\ntext-align: center;\npadding: 10px;\nleft: 50%;\nborder-radius: 16px;\nheight: 370px;\nwidth: 80%;\nbackground-color: white;\n justify-content: center;\nalign-items: center; \n\nh2 {\n  color: var(--purple-primary);\n}\n\n.subtitle {\n  margin-bottom: 20px;\n}\n\nion-button {\n  //   width: 90%;\n  //   max-width: 300px; // anteriormente 300\n  width: auto;\n    margin: 0 auto;\n    background-color: #ffcc00;\n    color: #ffffff;\n    font-weight: bold;\n    border-radius: 20px;\n\n    --background: var(--orange-primary);\n    --background-hover: var(--orange-secondary);\n    --background-activated: var(--orange-secondary);\n    --background-focused: var(--orange-secondary);\n  \n    --color: var(--orange-primary);\n  \n    --border-radius: 20px;\n    --border-color: var(--orange-primary);\n    --border-style: solid;\n    --border-width: 1px;\n  \n    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n  \n    --ripple-color: var(--orange-secondary);\n  \n\n    &:hover {\n      background-color: #ffb300;\n    }\n\n    &:active {\n      background-color: #e6a800;\n    }\n  }\n\n  // .button-container {\n  //   display: block;\n  //   // position: fixed;\n  //   // bottom: 32%;\n  //   // left: 0;\n  //   left: 50%;\n  //   // width: 100%;\n  //   width: auto;\n  //   transform: translateX(-50%); \n\n  //   justify-content: center;\n  //   padding: 5px;\n  // }\n}\nion-modal[_ngcontent-%COMP%]::part(backdrop) {\nbackground: rgb(136, 138, 142);\nopacity: 1;\n}\n\nion-modal[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%] {\n--background: rgb(14 116 144);\n--color: white;\n}\n\nion-modal.stack-modal[_ngcontent-%COMP%] {\n--box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);\n--backdrop-opacity: var(--ion-backdrop-opacity, 0.32);\n}\n\n\n.modal-content-2[_ngcontent-%COMP%] {\nbackground-color: white;\npadding: 20px;\ntext-align: center;\nborder-radius: 12px;\nheight: auto;\nwidth: 80%;\njustify-content: center;\nalign-items: center;\n}\n\n.modal-header[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\ncolor: #ff9a00; \n\nmargin-bottom: 10px;\nfont-size: 3rem !important\n;\n}\n\n.modal-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n// font-size: 18px;\nmargin-bottom: 20px;\n}\n\n.icons-container[_ngcontent-%COMP%] {\ndisplay: flex;\njustify-content: center;\nalign-items: center;\nmargin-top: 20px;\ngap: 15px; \n\n}\n\n.modal-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\nfont-size: 20px;\n}\n.custom-text[_ngcontent-%COMP%] {\nbackground-color: var(--orange-primary);\ncolor: white;\nborder-radius: 10px;\npadding: 0 15px;\nfont-size: 22px;\n}\n\n.o-text[_ngcontent-%COMP%] {\npadding: 0 15px;\nfont-size: 22px;\n}"] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SimpleAcuerdoVideoComponent, [{
        type: Component,
        args: [{ selector: 'app-simple-acuerdo-video', encapsulation: ViewEncapsulation.Emulated, template: "<ion-content color=\"light\" class=\"custom-content\">\n  <div *ngIf=\"isLoading\" class=\"loading-overlay\">\n    <ion-spinner name=\"crescent\"></ion-spinner>\n  </div>\n  \n  <div *ngIf=\"countdown > 0\" class=\"countdown-overlay\">\n    <div class=\"countdown\">{{ countdown }}</div>\n  </div>\n  <ion-header class=\"ion-no-border\">\n    <ion-toolbar color=\"light\">\n      <!-- <ion-title class=\"centered-title\">Video Selfie</ion-title> -->\n      <ion-buttons slot=\"end\">\n        <ion-button (click)=\"closeOverlayVideo()\" [disabled]=\"!canStopRecording\">\n          <ion-icon name=\"close\"></ion-icon>\n        </ion-button>\n      </ion-buttons>\n    </ion-toolbar>\n  </ion-header>\n\n  <div class=\"main-header\">\n    <div class=\"main-title\">\n      <h1>Acuerdo de Video</h1>\n    </div>\n    <div class=\"acuerdo-text\">\n      <p>Contesta \u00FAnicamente \"S\u00ED\" si est\u00E1s de acuerdo con el cr\u00E9dito y contesta \"No\" para cancelar el proceso.</p>\n    </div>\n  </div>\n  <!-- Contenedor de la c\u00E1mara y progresi\u00F3n -->\n  <div class=\"camera-container\">\n    <div class=\"video-wrapper\">\n      <video #videoElement muted autoplay playsinline style=\"transform: scaleX(-1)\"></video>\n      <svg class=\"progress-ring\" #progressRing width=\"300\" height=\"300\">\n        <circle class=\"progress-ring__circle\" cx=\"150\" cy=\"150\" r=\"150\" />\n      </svg>\n    </div>\n    <ion-label [ngClass]=\"{'red': isRecording}\">00:{{ timeRemaining < 10 ? '0' + timeRemaining : timeRemaining\n        }}</ion-label>\n\n    <div class=\"text-container\" *ngIf=\"showTextAcuerdo\">\n      <!-- Mostrar las palabras como subt\u00EDtulos -->\n      <p class=\"subtitle\">\n        <span *ngFor=\"let word of words; let i = index\" class=\"subtitle-word\">\n          {{ word }} \n        </span>\n      </p>\n    </div>\n        <!-- <p class=\"text-center\">Permanece quieto, con tu rostro en el centro del circulo</p> -->\n\n        \n      <!-- Botones de grabaci\u00F3n -->\n      <div class=\"fixed-footer\">\n        <ion-button *ngIf=\"!isRecording\" size=\"large\" expand=\"block\" (click)=\"recordVideo()\" shape=\"round\"><ion-icon slot=\"icon-only\" name=\"camera-outline\"></ion-icon></ion-button>\n        <ion-button *ngIf=\"isRecording\" size=\"large\" expand=\"block\" (click)=\"stopRecording()\" [disabled]=\"!canStopRecording\"><ion-icon slot=\"icon-only\" name=\"stop-outline\"></ion-icon></ion-button>\n      </div>\n  </div>\n\n  <ion-modal id=\"example-modal\" [isOpen]=\"isModalOpen\" (didDismiss)=\"closeModal()\">\n    <ng-template>\n      <div class=\"full-content\">     \n        <div class=\"modal-content\">\n          <img src=\"https://placeholder.pics/svg/150x150\" alt=\"\">\n          <h2>Instrucciones</h2>          \n          <!-- Subt\u00EDtulos din\u00E1micos y TTS -->\n          <div class=\"subtitle\">\n            <span *ngFor=\"let word of instructionWords; let i = index\" class=\"subtitle-word\">\n              {{ word }}\n            </span>\n          </div>\n          <div class=\"button-container\">\n            <ion-button (click)=\"closeModal()\" [disabled]=\"isSpeaking\">Comenzar</ion-button>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n  </ion-modal>\n\n  <ion-modal id=\"voice-modal\" [isOpen]=\"isModalVoiceOpen\" (didDismiss)=\"closeModalVoice()\">\n    <ng-template>\n      <div class=\"full-content\">\n        <div class=\"modal-content-2\">\n          <div class=\"modal-header\">\n            <ion-icon name=\"mic\" size=\"large\" style=\"width: 50px !important; height: 50px !important;\"></ion-icon>\n          </div>\n          <div class=\"modal-body\">\n            <p>Contesta con tu voz</p>\n            <div class=\"icons-container\">\n              <div class=\"custom-text\">\n                <p>S\u00ED</p>\n              </div>\n              <div class=\"o-text\">\n                <p>o</p>\n              </div>\n              <div class=\"custom-text\">\n                <p>No</p>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </ng-template>\n  </ion-modal>\n</ion-content>", styles: [".camera-container {\n  justify-content: center;\n  align-items: center;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 50%; // Antes era 70%\n  background-color: white;\n}\n\n.video-wrapper {\n  position: relative;\n  width: 300px;\n  height: 300px;\n  border-radius: 50%;\n  overflow: hidden;\n}\n\nvideo {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  border-radius: 50%;\n}\n\n.progress-ring {\n  position: absolute;\n  top: 0;\n  left: 0;\n  transform: rotate(-90deg); /* Rotamos el c\u00EDrculo para que la animaci\u00F3n inicie desde arriba */\n}\n\n.progress-ring__circle {\n  fill: transparent;\n  stroke: purple;\n  stroke-width: 12;\n  stroke-dasharray: 945; /* La circunferencia del c\u00EDrculo  880*/\n  stroke-dashoffset: 880; /* Oculto por completo al inicio */\n  transition: stroke-dashoffset 12s linear; /* Esto controlar\u00E1 el llenado progresivo */\n}\n\n.progress-active .progress-ring__circle {\n  animation: progress-animation 5s linear forwards;\n}\n\n@keyframes progress-animation {\n  from {\n    stroke-dashoffset: 880;\n  }\n  to {\n    stroke-dashoffset: 0;\n  }\n}\n\n// div \n//  {\n//   color: #ffffff;\n//   font-weight: 50px;\n//   border-radius: 20px;\n//   margin-top: 20px;\n//   //width: 90%;\n//   //max-width: 300px;\n//   align-self: center;\n//   text-transform: none;\n\n//   --background: var(--purple-primary);\n//   --background-hover: var(--purple-secondary);\n//   --background-activated: var(--purple-secondary);\n//   --background-focused: var(--purple-secondary);\n\n//   --color: var(--purple-primary);\n\n//   --border-radius: 20px;\n//   --border-color: var(--purple-primary);\n//   --border-style: solid;\n//   --border-width: 1px;\n\n//   --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n\n//   --ripple-color: var(--purple-secondary);\n\n\n//   --padding-top: 10px;\n//   --padding-bottom: 10px;\n// }\n\n.text-container {\n  height: 40px;\n  color: black;\n}\n\nion-header {\n  --background: #ffffff; /* Fondo blanco para el header */\n}\n\n\n\n.centered-title {\n  text-align: center;\n  width: 100%; /* Asegura que el t\u00EDtulo est\u00E9 centrado */\n  font-weight: bold;\n}\n\n.fixed-footer {\n\n  position: fixed;\n  bottom: 0;\n  // left: 0;\n  left: 50%;\n  // width: 100%;\n  width: auto;\n  transform: translateX(-50%); /* Centra el contenedor */\n  justify-content: center;\n  padding: 10px;\n  background-color: #fff; // Color de fondo, opcional\n // box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);\n\n  ion-button {\n  //   width: 90%;\n  //   max-width: 300px; // anteriormente 300\n  width: auto;\n    margin: 0 auto;\n    background-color: #ffcc00;\n    color: #ffffff;\n    font-weight: bold;\n    border-radius: 20px;\n\n    --background: var(--purple-primary);\n    --background-hover: var(--purple-secondary);\n    --background-activated: var(--purple-secondary);\n    --background-focused: var(--purple-secondary);\n  \n    --color: var(--purple-primary);\n  \n    --border-radius: 20px;\n    --border-color: var(--purple-primary);\n    --border-style: solid;\n    --border-width: 1px;\n  \n    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n  \n    --ripple-color: var(--purple-secondary);\n  \n\n    &:hover {\n      background-color: #ffb300;\n    }\n\n    &:active {\n      background-color: #e6a800;\n    }\n  }\n}\n\n\nion-header {\n  --background: #ffffff; /* Fondo blanco */\n  color: #000000; /* Texto negro */\n}\n\nion-toolbar {\n  --ion-background-color: #ffffff !important;\n  --background: #ffffff !important;\n  color: #000000;\n}\n\n\nion-header {\n  --background: #ffffff; /* Fondo blanco */\n}\n\nion-toolbar {\n  --ion-background-color: #ffffff !important;\n  --background: #ffffff !important;\n  color: #000000;\n  display: flex;\n  justify-content: space-between; /* Espacio entre t\u00EDtulo y bot\u00F3n */\n  align-items: center;\n}\n\n.centered-title {\n  flex: 1;\n  text-align: center; /* Centrar el t\u00EDtulo */\n  font-weight: bold;\n  color: #000000;\n  margin: 0; /* Quita cualquier margen del t\u00EDtulo */\n}\n\nion-buttons {\n  justify-content: flex-end; /* Alinea el bot\u00F3n a la derecha */\n}\n.countdown-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.6); /* Fondo semi-transparente */\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0;\n  padding: 0;\n  z-index: 1000; /* Asegurarse de que est\u00E9 encima de otros elementos */\n  animation: fadeIn 0.5s ease-out, fadeOut 0.5s ease-out 2.5s; /* Animaciones de entrada y salida */\n  box-sizing: border-box;\n  border-radius: 0px;\n\n}\n\nion-content.custom-content {\n  --padding-top: 0;\n  --padding-bottom: 0;\n  margin: 0;\n  padding: 0;\n}\n\n.countdown {\n  font-size: 100px;\n  font-weight: bold;\n  color: white;\n  animation: scaleUp 0.5s ease-out, scaleDown 0.5s ease-out 2.5s; /* Escalar en entrada y salida */\n}\n\n/* Animaci\u00F3n para desvanecer la superposici\u00F3n */\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n/* Animaci\u00F3n para escalar el n\u00FAmero */\n@keyframes scaleUp {\n  from {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n\n@keyframes scaleDown {\n  from {\n    transform: scale(1);\n    opacity: 1;\n  }\n  to {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n}\n\n.red {\n  padding: 10px;\n  color: red;\n}\n\n.text-center{\n  text-align: center;\n  padding-left: 20%;\n  padding-right: 20%;\n  color: #333;\n}\n\n.loading-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.8); /* Fondo oscuro semi-transparente */\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000; /* Aseg\u00FArate de que est\u00E9 por encima del contenido */\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  border-radius: 0px;\n}\n\nion-spinner {\n  color: white;\n  width: 50px;\n  height: 50px;\n}\n\n.main-header {\n  padding-left: 24px;\n  padding-right: 24px;\n}\n\n.main-title {\n  font-size: 24px;\n  font-weight: bold;\n  color: var(--purple-secondary);\n}\n\n.acuerdo-text {\n  font-size: 14px;\n  color: black;\n}\n\n//TTS\n\n.subtitle {\n  padding: 0px 24px;\n  text-align: left;\n  font-size: 17px;\n}\n.subtitle-word {\n  display: inline-block;\n  margin: 0 3px;\n  transition: background-color 0.3s ease, color 0.3s ease;\n  border-radius: 10px;\n\n}\n\n.subtitle-word.highlight {\n  background-color: purple;\n  border-radius: 6px;\n  color: white;\n  padding: 4px;\n  font-weight: 600;\n}\n\n\n.subtitle-word.read {\n  color: gray; /* Color para el texto ya le\u00EDdo */\n}\n\n.button-container {\n  justify-content: center;\n  display: flex;\n}\n\n\n// MODAL\n\nion-modal {\n--display: flex;\n--height: 100%;\n--width: 100%;\n// --border-radius: 16px;\n// --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n// --background: rgba(0, 0, 0, 0.30) !important;\n}\n\n.full-content {\nwidth: 100%;\nheight: 100%;\ndisplay: flex;\njustify-content: center;\nalign-items: center;\nbackground-color: rgba(0, 0, 0, 0.30) !important;\n\n}\n\n.modal-content {\ntext-align: center;\npadding: 10px;\nleft: 50%;\nborder-radius: 16px;\nheight: 370px;\nwidth: 80%;\nbackground-color: white;\n justify-content: center;\nalign-items: center; \n\nh2 {\n  color: var(--purple-primary);\n}\n\n.subtitle {\n  margin-bottom: 20px;\n}\n\nion-button {\n  //   width: 90%;\n  //   max-width: 300px; // anteriormente 300\n  width: auto;\n    margin: 0 auto;\n    background-color: #ffcc00;\n    color: #ffffff;\n    font-weight: bold;\n    border-radius: 20px;\n\n    --background: var(--orange-primary);\n    --background-hover: var(--orange-secondary);\n    --background-activated: var(--orange-secondary);\n    --background-focused: var(--orange-secondary);\n  \n    --color: var(--orange-primary);\n  \n    --border-radius: 20px;\n    --border-color: var(--orange-primary);\n    --border-style: solid;\n    --border-width: 1px;\n  \n    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n  \n    --ripple-color: var(--orange-secondary);\n  \n\n    &:hover {\n      background-color: #ffb300;\n    }\n\n    &:active {\n      background-color: #e6a800;\n    }\n  }\n\n  // .button-container {\n  //   display: block;\n  //   // position: fixed;\n  //   // bottom: 32%;\n  //   // left: 0;\n  //   left: 50%;\n  //   // width: 100%;\n  //   width: auto;\n  //   transform: translateX(-50%); /* Centra el contenedor */\n  //   justify-content: center;\n  //   padding: 5px;\n  // }\n}\nion-modal::part(backdrop) {\nbackground: rgb(136, 138, 142);\nopacity: 1;\n}\n\nion-modal ion-toolbar {\n--background: rgb(14 116 144);\n--color: white;\n}\n\nion-modal.stack-modal {\n--box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);\n--backdrop-opacity: var(--ion-backdrop-opacity, 0.32);\n}\n\n\n.modal-content-2 {\nbackground-color: white;\npadding: 20px;\ntext-align: center;\nborder-radius: 12px;\nheight: auto;\nwidth: 80%;\njustify-content: center;\nalign-items: center;\n}\n\n.modal-header ion-icon {\ncolor: #ff9a00; /* Color del micr\u00F3fono */\nmargin-bottom: 10px;\nfont-size: 3rem !important\n;\n}\n\n.modal-body p {\n// font-size: 18px;\nmargin-bottom: 20px;\n}\n\n.icons-container {\ndisplay: flex;\njustify-content: center;\nalign-items: center;\nmargin-top: 20px;\ngap: 15px; \n\n}\n\n.modal-body p {\nfont-size: 20px;\n}\n.custom-text {\nbackground-color: var(--orange-primary);\ncolor: white;\nborder-radius: 10px;\npadding: 0 15px;\nfont-size: 22px;\n}\n\n.o-text {\npadding: 0 15px;\nfont-size: 22px;\n}\n"] }]
    }], () => [{ type: i1.Platform }, { type: i1.ModalController }, { type: i2.DomSanitizer }, { type: i0.Renderer2 }, { type: i1.AlertController }, { type: i0.ChangeDetectorRef }], { videoElement: [{
            type: ViewChild,
            args: ['videoElement']
        }], progressRing: [{
            type: ViewChild,
            args: ['progressRing']
        }], backFunction: [{
            type: Input
        }], closeRequested: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SimpleAcuerdoVideoComponent, { className: "SimpleAcuerdoVideoComponent" }); })();
//# sourceMappingURL=simple-acuerdo-video.component.js.map