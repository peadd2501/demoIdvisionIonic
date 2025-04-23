import { __awaiter } from "tslib";
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, Input, signal, ViewChild, ViewEncapsulation, } from '@angular/core';
import { AlertController, IonicModule, IonInput, LoadingController, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { Clipboard } from '@capacitor/clipboard';
import { CameraWithOverlayComponent } from './components/camera-with-overlay/camera-with-overlay.component';
import { CamaraVideoSelfieComponent } from './components/camara-video-selfie/camara-video-selfie.component';
import { DpiService } from './services/dpi/dpi-service.service';
import { ModalDpiServices } from './services/modal-services/modal-dpi-services';
import { ModalVideoSelfieServices } from './services/modal-services/modal-video-selfie-services';
import { SdkCommunicationService } from './services/modal-services/sdk-communication-services';
import { ValidateMetaGService } from './services/validate-meta-g/validate-meta-g';
import { Network } from '@capacitor/network';
import { NgZone } from '@angular/core';
import { register, } from './../../../swiper-wrapper';
import { PhotoSelfieCameraComponent } from './components/photo-selfie-camera/photo-selfie-camera.component';
import { PhotoSelfieServices } from './services/modal-services/photo-selfie-services';
import { CamaraAcuerdoVideoComponent } from './components/camara-acuerdo-video/camara-acuerdo.video.component';
import { SimpleAcuerdoVideoComponent } from './components/simple-acuerdo-video/simple-acuerdo-video.component';
import { MessageModalComponent } from './components/message-modal/message-modal.component';
import { App } from '@capacitor/app';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
import * as i2 from "./services/dpi/dpi-service.service";
import * as i3 from "./services/modal-services/modal-dpi-services";
import * as i4 from "./services/modal-services/modal-video-selfie-services";
import * as i5 from "./services/modal-services/sdk-communication-services";
import * as i6 from "./services/validate-meta-g/validate-meta-g";
import * as i7 from "./services/modal-services/photo-selfie-services";
import * as i8 from "@angular/common";
const _c0 = ["dpi"];
const _c1 = a0 => ({ "blur-effect": a0 });
function IdVisionComponent_swiper_slide_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "swiper-slide")(1, "div", 4)(2, "div", 16)(3, "h2", 17);
    i0.ɵɵtext(4, "Verifiquemos tu identidad");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 17);
    i0.ɵɵtext(6, "Para completar tu verificaci\u00F3n, por favor ingresa tu n\u00FAmero de identificaci\u00F3n (DPI).");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "ion-item", 18);
    i0.ɵɵelement(8, "ion-input", 19, 0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "ion-grid", 20)(11, "ion-row")(12, "div", 21);
    i0.ɵɵelement(13, "img", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 23)(15, "p");
    i0.ɵɵtext(16, "Sube fotos de documentos que prueben tu identidad");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "ion-row")(18, "div", 21);
    i0.ɵɵelement(19, "img", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div", 23)(21, "p");
    i0.ɵɵtext(22, "Graba un video selfie mientras lees el texto en voz alta");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(23, "div", 7)(24, "ion-button", 8);
    i0.ɵɵlistener("click", function IdVisionComponent_swiper_slide_2_Template_ion_button_click_24_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleClick()); });
    i0.ɵɵtext(25, "Empecemos");
    i0.ɵɵelementEnd()()()();
} }
function IdVisionComponent_swiper_slide_3_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 29)(1, "div", 16)(2, "h2");
    i0.ɵɵtext(3, "Acuerdo de v\u00EDdeo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 17);
    i0.ɵɵtext(5, "Graba un breve video para completar tu proceso de identificaci\u00F3n.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "ion-grid", 20)(7, "ion-row")(8, "div", 21);
    i0.ɵɵelement(9, "img", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 23)(11, "p");
    i0.ɵɵtext(12, "Si est\u00E1s en interiores, aseg\u00FArate de que la luz est\u00E9 frente a ti, no detr\u00E1s.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "ion-row")(14, "div", 21);
    i0.ɵɵelement(15, "img", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 23)(17, "p");
    i0.ɵɵtext(18, "Aseg\u00FArate de que tu rostro sea visible y de no usar anteojos ni sombreros.");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(19, "div", 7)(20, "ion-button", 8);
    i0.ɵɵlistener("click", function IdVisionComponent_swiper_slide_3_div_2_Template_ion_button_click_20_listener() { i0.ɵɵrestoreView(_r3); const step_r4 = i0.ɵɵnextContext().$implicit; return i0.ɵɵresetView(step_r4.action()); });
    i0.ɵɵtext(21, "Abrir la c\u00E1mara");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(1, _c1, ctx_r1.simpleProcess));
} }
function IdVisionComponent_swiper_slide_3_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "div", 16)(2, "h2");
    i0.ɵɵtext(3, "Coloca la parte frontal de tu DPI");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 31);
    i0.ɵɵtext(5, "Evita sombras, reflejos y coloca tu documento dentro del recuadro.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 32)(7, "video", 33);
    i0.ɵɵelement(8, "source", 34);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 7)(10, "ion-button", 8);
    i0.ɵɵlistener("click", function IdVisionComponent_swiper_slide_3_div_3_Template_ion_button_click_10_listener() { i0.ɵɵrestoreView(_r5); const step_r4 = i0.ɵɵnextContext().$implicit; return i0.ɵɵresetView(step_r4.action()); });
    i0.ɵɵtext(11, "Tomar una foto");
    i0.ɵɵelementEnd()()();
} }
function IdVisionComponent_swiper_slide_3_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "div", 16)(2, "h2");
    i0.ɵɵtext(3, "Coloca el reverso de tu DPI");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 31);
    i0.ɵɵtext(5, "Evita sombras, reflejos y coloca tu documento dentro del recuadro.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 32)(7, "video", 35);
    i0.ɵɵelement(8, "source", 36);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 7)(10, "ion-button", 8);
    i0.ɵɵlistener("click", function IdVisionComponent_swiper_slide_3_div_4_Template_ion_button_click_10_listener() { i0.ɵɵrestoreView(_r6); const step_r4 = i0.ɵɵnextContext().$implicit; return i0.ɵɵresetView(step_r4.action()); });
    i0.ɵɵtext(11, "Tomar una foto");
    i0.ɵɵelementEnd()()();
} }
function IdVisionComponent_swiper_slide_3_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "div", 16)(2, "h2");
    i0.ɵɵtext(3, "Video Selfie");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 17);
    i0.ɵɵtext(5, "Graba un breve video para completar tu proceso de identificaci\u00F3n.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "ion-grid", 20)(7, "ion-row")(8, "ion-row")(9, "div", 21);
    i0.ɵɵelement(10, "img", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 23)(12, "p");
    i0.ɵɵtext(13, "Si est\u00E1s en interiores, aseg\u00FArate de que la luz est\u00E9 frente a ti, no detr\u00E1s.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "ion-row")(15, "div", 21);
    i0.ɵɵelement(16, "img", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 23)(18, "p");
    i0.ɵɵtext(19, "Aseg\u00FArate de que tu rostro sea visible y de no usar anteojos ni sombreros.");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(20, "div", 7)(21, "ion-button", 8);
    i0.ɵɵlistener("click", function IdVisionComponent_swiper_slide_3_div_5_Template_ion_button_click_21_listener() { i0.ɵɵrestoreView(_r7); const step_r4 = i0.ɵɵnextContext().$implicit; return i0.ɵɵresetView(step_r4.action()); });
    i0.ɵɵtext(22, "Abrir la c\u00E1mara");
    i0.ɵɵelementEnd()()();
} }
function IdVisionComponent_swiper_slide_3_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "div", 16)(2, "h2");
    i0.ɵɵtext(3, "Foto Selfie");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 17);
    i0.ɵɵtext(5, "Toma una foto para completar tu proceso de identificaci\u00F3n.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "ion-grid", 20)(7, "ion-row")(8, "ion-row")(9, "div", 21);
    i0.ɵɵelement(10, "img", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 23)(12, "p");
    i0.ɵɵtext(13, "Si est\u00E1s en interiores, aseg\u00FArate de que la luz est\u00E9 frente a ti, no detr\u00E1s.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "ion-row")(15, "div", 21);
    i0.ɵɵelement(16, "img", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 23)(18, "p");
    i0.ɵɵtext(19, "Aseg\u00FArate de que tu rostro sea visible y de no usar anteojos ni sombreros.");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(20, "div", 7)(21, "ion-button", 8);
    i0.ɵɵlistener("click", function IdVisionComponent_swiper_slide_3_div_6_Template_ion_button_click_21_listener() { i0.ɵɵrestoreView(_r8); const step_r4 = i0.ɵɵnextContext().$implicit; return i0.ɵɵresetView(step_r4.action()); });
    i0.ɵɵtext(22, "Abrir la c\u00E1mara");
    i0.ɵɵelementEnd()()();
} }
function IdVisionComponent_swiper_slide_3_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "h2");
    i0.ɵɵtext(2, "Paso desconocido");
    i0.ɵɵelementEnd()();
} }
function IdVisionComponent_swiper_slide_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "swiper-slide")(1, "div", 25);
    i0.ɵɵtemplate(2, IdVisionComponent_swiper_slide_3_div_2_Template, 22, 3, "div", 26)(3, IdVisionComponent_swiper_slide_3_div_3_Template, 12, 0, "div", 27)(4, IdVisionComponent_swiper_slide_3_div_4_Template, 12, 0, "div", 27)(5, IdVisionComponent_swiper_slide_3_div_5_Template, 23, 0, "div", 27)(6, IdVisionComponent_swiper_slide_3_div_6_Template, 23, 0, "div", 27)(7, IdVisionComponent_swiper_slide_3_div_7_Template, 3, 0, "div", 28);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const step_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitch", step_r4.type);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", 1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", 2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", 3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", 4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", 5);
} }
function IdVisionComponent_ion_col_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ion-col", 37)(1, "ion-item", 6)(2, "p", 38);
    i0.ɵɵtext(3, "Informaci\u00F3n procesada de manera correcta");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "ion-item", 39);
    i0.ɵɵelement(5, "img", 40);
    i0.ɵɵelementEnd()();
} }
function IdVisionComponent_ion_col_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ion-col", 37)(1, "ion-item", 6)(2, "p", 38);
    i0.ɵɵtext(3, "Ocurri\u00F3 un error al procesar la informaci\u00F3n");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "ion-item", 39);
    i0.ɵɵelement(5, "img", 40);
    i0.ɵɵelementEnd()();
} }
function IdVisionComponent_ion_fab_14_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ion-fab", 41)(1, "ion-fab-button", 42);
    i0.ɵɵlistener("click", function IdVisionComponent_ion_fab_14_Template_ion_fab_button_click_1_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.copyProccess()); });
    i0.ɵɵelement(2, "ion-icon", 43);
    i0.ɵɵelementEnd()();
} }
register();
export class IdVisionComponent {
    constructor(zone, modalController, dpiService, alertController, loadingController, platform, modalDpiServices, modalVideoSelfieServices, sdkCommunicationService, navController, validateMetaGService, cdRef, photoSelfieServices, toastController) {
        this.zone = zone;
        this.modalController = modalController;
        this.dpiService = dpiService;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.platform = platform;
        this.modalDpiServices = modalDpiServices;
        this.modalVideoSelfieServices = modalVideoSelfieServices;
        this.sdkCommunicationService = sdkCommunicationService;
        this.navController = navController;
        this.validateMetaGService = validateMetaGService;
        this.cdRef = cdRef;
        this.photoSelfieServices = photoSelfieServices;
        this.toastController = toastController;
        this.tutoImage1 = 'assets/imagesIdvision/documentsImage.png';
        this.tutoImage2 = 'assets/imagesIdvision/documentsImage.png';
        this.tutoImage3 = 'assets/imagesIdvision/56.png';
        this.tutoImage4 = 'assets/imagesIdvision/57.png';
        this.swiperElement = signal(null);
        this.modalRef = null;
        this.isSwipe = false;
        this.dpiCode = '';
        this.connection = '';
        this.apikey = '';
        this.validationConfig = [];
        this.showDebug = false;
        this.versionSDK = '';
        this.hasInternet = true;
        this.simpleProcess = false;
        // Booleans para habilitar cada step
        this.showAcuerdoVideo = false;
        this.showDpiFront = false;
        this.showDpiBack = false;
        this.showVideoSelfie = false;
        this.showPhotoSelfie = false;
        this.isValid = false;
        this.isAndroid = this.platform.is('android');
        this.isIOS = this.platform.is('ios');
        this.validateMetaG = {
            acuerdoVideo: false,
            dpiFront: false,
            dpiBack: false,
            videoSelfie: false,
            photoSelfie: false
        };
    }
    loadMockValidationConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            let loader = null;
            try {
                loader = yield this.loadingController.create({
                    message: 'Procesando...',
                    spinner: 'crescent',
                });
                yield loader.present();
                this.dpiService.getConnectionById(this.connection).subscribe({
                    next: (connection) => {
                        var _a;
                        // console.log(connection.details);
                        if (((_a = connection === null || connection === void 0 ? void 0 : connection.details) === null || _a === void 0 ? void 0 : _a.config) && Array.isArray(connection.details.config)) {
                            let configData = connection.details.config
                                .map((config) => ({
                                id: config.id,
                                type: config.type,
                                order: Number(config.order),
                                action: this.getStepAction(config.type)
                            }));
                            // 🔥 Si `simpleProcess` es true, solo incluimos el paso de Acuerdo de Video (type: 1)
                            if (this.simpleProcess) {
                                // console.log("🔄 Modo simpleProcess activado, solo Acuerdo de Video.");
                                configData = configData.filter((config) => config.type === 1);
                                if (loader) {
                                    loader.dismiss();
                                }
                                this.InitProccess();
                            }
                            if (loader) {
                                loader.dismiss();
                            }
                            // 🔥 Ordenamos la configuración filtrada
                            this.validationConfig = configData.sort((a, b) => a.order - b.order);
                            // console.log("Configuración ordenada y lista:", this.validationConfig);
                            this.setValidationConfig();
                        }
                        else {
                            console.warn("La configuración obtenida no es válida:", connection);
                        }
                    },
                    error: (err) => __awaiter(this, void 0, void 0, function* () {
                        if (loader) {
                            loader.dismiss();
                        }
                        if (this.hasInternet) {
                            const modal = yield this.modalController.create({
                                component: MessageModalComponent,
                                componentProps: {
                                    title: 'Error',
                                    errors: ["Credenciales Ingresadas Invalidas"],
                                    variant: 'dpi'
                                },
                                backdropDismiss: false
                            });
                            yield modal.present();
                            modal.onDidDismiss().then(() => {
                                this.sdkCommunicationService.emitExit(false);
                                this.navController.back();
                            });
                        }
                        else {
                            const modal = yield this.modalController.create({
                                component: MessageModalComponent,
                                componentProps: {
                                    title: 'Error de conexión',
                                    errors: ["No pudimos cargar la página. Verifica tu internet y prueba de nuevo."],
                                    variant: 'dpi'
                                },
                                backdropDismiss: false
                            });
                            yield modal.present();
                            modal.onDidDismiss().then(() => {
                                this.sdkCommunicationService.emitExit(false);
                                this.navController.back();
                            });
                        }
                    })
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getStepAction(type) {
        switch (type) {
            case 1: return () => this.openSimpleAcuerdo(); //this.openAcuerdoVideo
            case 2: return () => this.openCameraOverlayFrontal();
            case 3: return () => this.openCameraOverlayTrasero();
            case 4: return () => this.openVideoSelfie();
            case 5: return () => this.openPhotoSelfie();
            case 6: return () => this.openAcuerdoVideo(); //Provisional para pruebas
            default: return () => console.warn('Tipo de paso desconocido:', type);
        }
    }
    setValidationConfig() {
        // 🔥 Depuración en consola
        // console.log("Ejecutando setValidationConfig con:", this.validationConfig);
        this.validationConfig.forEach(config => {
            switch (config.type) {
                case 1:
                    this.showAcuerdoVideo = true;
                    break;
                case 2:
                    this.showDpiFront = true;
                    break;
                case 3:
                    this.showDpiBack = true;
                    break;
                case 4:
                    this.showVideoSelfie = true;
                    break;
                case 5:
                    this.showPhotoSelfie = true;
            }
        });
        // console.log("Valores actualizados:", {
        //   showAcuerdoVideo: this.showAcuerdoVideo,
        //   showDpiFront: this.showDpiFront,
        //   showDpiBack: this.showDpiBack,
        //   showVideoSelfie: this.showVideoSelfie,
        //   showPhotoSelfie: this.showPhotoSelfie
        // });
        // 🔥 Forzar la detección de cambios para actualizar la UI
        this.cdRef.detectChanges();
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isAndroid || this.isIOS) {
                try {
                    const status = yield Network.getStatus();
                    this.hasInternet = status.connected;
                    this.networkListener = yield Network.addListener('networkStatusChange', (status) => {
                        this.zone.run(() => {
                            this.hasInternet = status.connected;
                            console.log('Internet cambio:', this.hasInternet);
                        });
                    });
                }
                catch (error) {
                    alert(error.message);
                }
            }
            yield this.loadMockValidationConfig();
            if (this.isAndroid || this.isIOS) {
                const info = yield App.getInfo();
                this.versionSDK = info.version;
            }
            else {
                this.versionSDK = 'web';
            }
            this.modalDpiServices.closeOverlay$.subscribe(() => {
                this.closeOverlay();
            });
            this.modalDpiServices.closeModalAndChangeBrightness$.subscribe(() => {
                this.closeModalOverlay();
            });
            this.modalDpiServices.closePhotoSelfieSubject$.subscribe(() => {
                this.closePhotoSelfie();
            });
            this.modalDpiServices.closePhotoSelfieSubject$.subscribe(() => {
                this.closeModalAcuerdoVideo();
            });
            // Selecciona el elemento de video
            const video = document.getElementById('dpiFront');
            const video2 = document.getElementById('dpiBack');
            if (video) {
                // Asegúrate de que el video está en loop manualmente
                video.addEventListener('ended', () => {
                    video.currentTime = 0; // Reinicia el video al principio
                    video.play(); // Lo reproduce nuevamente
                });
                // Forzar autoplay y mute por si no lo toma automáticamente
                video.muted = true; // Obligatorio para autoplay en iOS
                video
                    .play()
                    .catch((err) => console.error('Error al reproducir el video:', err));
            }
            else {
                console.error("No se encontró el elemento de video con ID 'dpiFront'.");
            }
            if (video2) {
                video2.addEventListener('ended', () => {
                    video2.currentTime = 0; // Reinicia el video al principio
                    video2.play(); // Lo reproduce nuevamente
                });
                video2.muted = true;
                video2
                    .play()
                    .catch((err) => console.error('Error al reproducir el video2:', err));
            }
            else {
                console.error("No se encontró el elemento de video con ID 'dpiBack'.");
            }
        });
    }
    ngAfterViewInit() {
        var _a;
        setTimeout(() => {
            var _a;
            const swiperElement = document.querySelector('.custom-swiper');
            if (swiperElement) {
                const swiperOptions = {
                    slidesPerView: 1,
                    pagination: false,
                    navigation: {
                        enabled: false,
                    },
                    allowTouchMove: this.isSwipe,
                };
                try {
                    Object.assign(swiperElement, swiperOptions);
                    this.swiperRef = swiperElement;
                    this.swiperElement.set(swiperElement);
                    (_a = this.swiperElement()) === null || _a === void 0 ? void 0 : _a.initialize();
                }
                catch (error) {
                    console.warn('Error al inicializar swiper: ', error);
                }
            }
            else {
                console.error('El elemento <swiper-container> no está disponible.');
            }
        }, 100);
        if (this.dpi) {
            this.dpi.value = (_a = this.dpiCode) !== null && _a !== void 0 ? _a : '';
        }
        else {
            console.error('IonInput no está disponible en ngAfterViewInit');
        }
    }
    ngOnDestroy() {
        return __awaiter(this, void 0, void 0, function* () {
            // this.swiperRef = null;
            if (this.swiperRef) {
                // this.swiperRef.destroy(true, true);
            }
            if ((this.isAndroid || this.isIOS) && this.networkListener) {
                yield this.networkListener.remove();
            }
        });
    }
    handleClick() {
        this.InitProccess();
    }
    handleSlide(slide) {
        return __awaiter(this, void 0, void 0, function* () {
            setTimeout(() => {
                var _a, _b;
                if ((_a = this.swiperElement()) === null || _a === void 0 ? void 0 : _a.swiper) {
                    (_b = this.swiperElement()) === null || _b === void 0 ? void 0 : _b.swiper.slideTo(slide);
                }
            }, 300);
        });
    }
    handleGetInit() {
        var _a, _b;
        (_b = (_a = this.swiperElement()) === null || _a === void 0 ? void 0 : _a.swiper) === null || _b === void 0 ? void 0 : _b.slideTo(0);
    }
    handleExit() {
        this.updateValidation();
        const result = this.isAllValid(); // Usamos la validación corregida
        // console.log("🚀 Resultado final de validación en handleExit:", result);
        this.sdkCommunicationService.emitExit(result);
        this.navController.back();
    }
    isAllValid() {
        // Si NO hay pasos activados, devolvemos `false`
        if (!this.showAcuerdoVideo && !this.showDpiFront && !this.showDpiBack && !this.showVideoSelfie && !this.showPhotoSelfie) {
            console.log('⚠️ No hay pasos activos, devolviendo `false`.');
            return false;
        }
        let isValid = true;
        // Evaluamos cada paso ACTIVADO y verificamos si fue completado
        if (this.showAcuerdoVideo && !this.validateMetaG.acuerdoVideo) {
            isValid = false;
            console.log('Acuerdo de video NO completado.');
        }
        if (this.showDpiFront && !this.validateMetaG.dpiFront) {
            isValid = false;
            console.log('DPI Frontal NO completado.');
        }
        if (this.showDpiBack && !this.validateMetaG.dpiBack) {
            isValid = false;
            console.log('DPI Trasero NO completado.');
        }
        if (this.showVideoSelfie && !this.validateMetaG.videoSelfie) {
            isValid = false;
            console.log('Video Selfie NO completado.');
        }
        if (this.showPhotoSelfie && !this.validateMetaG.photoSelfie) {
            isValid = false;
            console.log('Photo selfie NO completado');
        }
        console.log('Resultado final de validación:', isValid);
        return isValid;
    }
    updateValidation() {
        // console.log('🔄 Actualizando validación...');
        // console.log('Estado ANTES de validar:');
        // console.log('showAcuerdoVideo:', this.showAcuerdoVideo, '| Validado:', this.validateMetaG.acuerdoVideo);
        // console.log('showDpiFront:', this.showDpiFront, '| Validado:', this.validateMetaG.dpiFront);
        // console.log('showDpiBack:', this.showDpiBack, '| Validado:', this.validateMetaG.dpiBack);
        // console.log('showVideoSelfie:', this.showVideoSelfie, '| Validado:', this.validateMetaG.videoSelfie);
        // console.log('showPhotoSelfie:', this.showPhotoSelfie, '| Validado:', this.validateMetaG.photoSelfie);
        // Validamos los pasos visibles
        const acuerdoVideo = this.showAcuerdoVideo ? this.validateMetaG.acuerdoVideo : true;
        const dpiFrontValid = this.showDpiFront ? this.validateMetaG.dpiFront : true;
        const dpiBackValid = this.showDpiBack ? this.validateMetaG.dpiBack : true;
        const videoSelfieValid = this.showVideoSelfie ? this.validateMetaG.videoSelfie : true;
        const photoSelfieValid = this.showPhotoSelfie ? this.validateMetaG.photoSelfie : true;
        this.isValid = acuerdoVideo && dpiFrontValid && dpiBackValid && videoSelfieValid && photoSelfieValid;
        // console.log('🚀 Estado FINAL de validación:', this.isValid);
        // 🔥 Forzamos la actualización de la UI
        this.cdRef.detectChanges();
    }
    handleSkipTutorial() {
        var _a, _b;
        (_b = (_a = this.swiperElement()) === null || _a === void 0 ? void 0 : _a.swiper) === null || _b === void 0 ? void 0 : _b.slideTo(5);
    }
    handleNext() {
        setTimeout(() => {
            var _a, _b, _c;
            if ((_a = this.swiperElement()) === null || _a === void 0 ? void 0 : _a.swiper) {
                (_c = (_b = this.swiperElement()) === null || _b === void 0 ? void 0 : _b.swiper) === null || _c === void 0 ? void 0 : _c.slideNext();
                // this.swiperElement()?.swiper.slideTo(slide);
            }
        }, 300);
    }
    moveToNextStep(currentType) {
        // console.log(`Buscando el siguiente paso después de Type ${currentType}`);
        const currentIndex = this.validationConfig.findIndex(step => step.type === currentType);
        if (currentIndex === -1) {
            console.warn('No se encontró el paso actual en validationConfig.');
            return;
        }
        const nextStep = this.validationConfig[currentIndex + 1];
        if (nextStep) {
            // console.log(`Moviendo al siguiente paso: Type ${nextStep.type}, Order ${nextStep.order}`);
            this.handleSlide(nextStep.order);
        }
        else {
            // console.log('No hay más pasos, proceso finalizado.');
            this.handleSlide(this.validationConfig.length + 1);
        }
    }
    InitProccess() {
        return __awaiter(this, void 0, void 0, function* () {
            let loader = null;
            try {
                loader = yield this.loadingController.create({
                    message: 'Procesando...',
                    spinner: 'crescent',
                });
                yield loader.present();
                this.dpiService
                    .InitProccess(this.dpiCode + '', this.connection, this.apikey, this.versionSDK) // '673259d3f027711b51e71202')
                    .subscribe({
                    next: (response) => {
                        var _a;
                        if (loader) {
                            loader.dismiss();
                        }
                        if (!response['error']) {
                            localStorage.setItem('codigo', response['details']);
                            const isCompleted = response['completed'];
                            this.showDebug = true;
                            if (isCompleted) {
                                // console.log("Paso aca en el if")
                                this.validateMetaG.acuerdoVideo = true;
                                this.validateMetaG.dpiFront = true;
                                this.validateMetaG.dpiBack = true;
                                this.validateMetaG.videoSelfie = true;
                                this.validateMetaG.photoSelfie = true;
                                this.updateValidation();
                                this.handleSlide(this.validationConfig.length + 1);
                            }
                            else {
                                if (!this.simpleProcess) {
                                    this.handleSlide(1);
                                }
                                else {
                                    this.openSimpleAcuerdo();
                                }
                            }
                        }
                        else {
                            if (this.dpi.value == null) {
                                this.showAlert('Error', 'El campo DPI no puede estar vacío', [], () => {
                                    this.handleExit();
                                });
                            }
                            const dpiValue = (_a = this.dpi.value) !== null && _a !== void 0 ? _a : '';
                            if (!dpiValue || dpiValue.trim().length === 0) {
                                this.showAlert('Error', 'El campo DPI no puede estar vacío', []);
                            }
                            else if (dpiValue && dpiValue.length > 12) {
                                this.showAlert('Error', response['message'], []);
                            }
                            else {
                                const errorMessage = response['message'];
                                this.showAlert('Error', errorMessage, []);
                            }
                        }
                    },
                    error: (error) => {
                        console.log('-----------------');
                        console.log(error);
                        console.log('-----------------');
                        console.error('Error al llamar al servicio:', error);
                    },
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    DpiFrontProccess(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!filePath || filePath.size === 0) {
                console.error('El archivo proporcionado no es válido:', filePath);
                return;
            }
            let loader = null;
            try {
                // Muestra el loader
                loader = yield this.loadingController.create({
                    message: 'Procesando...',
                    spinner: 'crescent',
                });
                yield loader.present();
                const codigo = (_a = localStorage.getItem('codigo')) !== null && _a !== void 0 ? _a : '';
                yield this.dpiService.uploadFrontDPI(filePath /*file*/, codigo, this.connection, this.apikey).subscribe({
                    next: (response) => __awaiter(this, void 0, void 0, function* () {
                        if (loader) {
                            loader.dismiss();
                        }
                        if (!response['error']) {
                            const modal = yield this.modalController.create({
                                component: MessageModalComponent,
                                componentProps: {
                                    title: 'Éxito',
                                    message: 'DPI registrado correctamente',
                                    variant: 'dpi'
                                },
                                backdropDismiss: false
                            });
                            yield modal.present();
                            modal.onDidDismiss().then(() => {
                                this.closeModalFromParent();
                                this.modalController.dismiss();
                                this.validateMetaG.dpiFront = true;
                                this.updateValidation();
                                this.moveToNextStep(2);
                            });
                        }
                        else {
                            const modal = yield this.modalController.create({
                                component: MessageModalComponent,
                                componentProps: {
                                    title: response['mensage'],
                                    errors: response['details'],
                                    variant: 'dpi'
                                },
                                backdropDismiss: false
                            });
                            yield modal.present();
                            modal.onDidDismiss().then(() => {
                                this.resumeCameraFromParent();
                            });
                            this.validateMetaG.dpiFront = false;
                            this.updateValidation();
                        }
                    }),
                    error: (error) => __awaiter(this, void 0, void 0, function* () {
                        if (this.hasInternet) {
                            const modal = yield this.modalController.create({
                                component: MessageModalComponent,
                                componentProps: {
                                    title: 'Error',
                                    errors: error || [],
                                    variant: 'dpi'
                                },
                                backdropDismiss: false
                            });
                            yield modal.present();
                            modal.onDidDismiss().then(() => {
                                this.resumeCameraFromParent();
                            });
                        }
                        else {
                            const modal = yield this.modalController.create({
                                component: MessageModalComponent,
                                componentProps: {
                                    title: 'Error de conexión',
                                    errors: ["No pudimos cargar la página. Verifica tu internet y prueba de nuevo."],
                                    variant: 'dpi'
                                },
                                backdropDismiss: false
                            });
                            yield modal.present();
                            modal.onDidDismiss().then(() => {
                                this.resumeCameraFromParent();
                            });
                        }
                        this.validateMetaG.dpiFront = false;
                        this.updateValidation();
                        if (loader) {
                            loader.dismiss();
                        }
                        console.error('Error al llamar al servicio:', error);
                    }),
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    closeModalFromParent() {
        // Emite el evento para cerrar la modal
        this.modalDpiServices.requestCloseOverlay();
    }
    closeModalVideoSelfie() {
        // this.modalVideoSelfieServices.requestCloseOverlayModal();
        this.modalDpiServices.requestCloseModalAndBrightness();
    }
    closeModalAcuerdoVideo() {
        // this.modalVideoSelfieServices.requestCloseOverlayModal();
        this.modalDpiServices.requestCloseModalAcuerdoVideo();
    }
    resumePhotoFromParent() {
        this.modalDpiServices.requestResumePhotoSubject();
    }
    resumeCameraFromParent() {
        this.modalDpiServices.requestResumeCamera();
    }
    closePhotoSelfieFromParent() {
        // this.modalVideoSelfieServices.requestCloseOverlayModal();
        this.modalDpiServices.requestClosePhotoSelfieSubject();
    }
    convertImagePathToFile(imagePath, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(imagePath);
            const blob = yield response.blob();
            return new File([blob], fileName, { type: blob.type });
        });
    }
    DpiBackProccess(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let loader = null;
            try {
                // Muestra el loader
                loader = yield this.loadingController.create({
                    message: 'Procesando...',
                    spinner: 'crescent',
                });
                yield loader.present();
                const codigo = (_a = localStorage.getItem('codigo')) !== null && _a !== void 0 ? _a : '';
                this.dpiService.uploadBackDPI(filePath /*file*/, codigo, this.connection, this.apikey).subscribe({
                    next: (response) => __awaiter(this, void 0, void 0, function* () {
                        if (loader) {
                            loader.dismiss();
                        }
                        if (!response['error']) {
                            // this.showAlert('Éxito', 'DPI registrado correctamente', [], () => {
                            //   this.closeModalFromParent();
                            //   this.modalController.dismiss();
                            //   this.validateMetaG.dpiBack = true;
                            //   this.updateValidation();
                            //   this.moveToNextStep(3);
                            // });
                            const modal = yield this.modalController.create({
                                component: MessageModalComponent,
                                componentProps: {
                                    title: 'Éxito',
                                    message: 'DPI registrado correctamente',
                                    variant: 'dpi'
                                },
                                backdropDismiss: false
                            });
                            yield modal.present();
                            modal.onDidDismiss().then(() => {
                                this.closeModalFromParent();
                                this.modalController.dismiss();
                                this.validateMetaG.dpiBack = true;
                                this.updateValidation();
                                this.moveToNextStep(3);
                            });
                        }
                        else {
                            // this.showAlert(response['mensage'], '', response['details'], () => {
                            //   this.resumeCameraFromParent();
                            // });
                            // this.validateMetaG.dpiBack = false;
                            // this.updateValidation();
                            const modal = yield this.modalController.create({
                                component: MessageModalComponent,
                                componentProps: {
                                    title: response['mensage'],
                                    errors: response['details'],
                                    variant: 'dpi'
                                },
                                backdropDismiss: false
                            });
                            yield modal.present();
                            modal.onDidDismiss().then(() => {
                                this.resumeCameraFromParent();
                                // this.modalController.dismiss();
                                this.validateMetaG.dpiBack = false;
                                this.updateValidation();
                            });
                        }
                    }),
                    error: (error) => __awaiter(this, void 0, void 0, function* () {
                        if (loader) {
                            loader.dismiss();
                        }
                        if (this.hasInternet) {
                            const modal = yield this.modalController.create({
                                component: MessageModalComponent,
                                componentProps: {
                                    title: error['mensage'],
                                    message: error['details'],
                                    variant: 'dpi'
                                },
                                backdropDismiss: false
                            });
                            yield modal.present();
                            modal.onDidDismiss().then(() => {
                                this.resumeCameraFromParent();
                                this.validateMetaG.dpiBack = false;
                                this.updateValidation();
                                console.error('Error al llamar al servicio:', error);
                            });
                            if (loader) {
                                loader.dismiss();
                            }
                        }
                        else {
                            const modal = yield this.modalController.create({
                                component: MessageModalComponent,
                                componentProps: {
                                    title: 'Error de conexión',
                                    errors: ["No pudimos cargar la página. Verifica tu internet y prueba de nuevo."],
                                    variant: 'dpi'
                                },
                                backdropDismiss: false
                            });
                            yield modal.present();
                            modal.onDidDismiss().then(() => {
                                this.sdkCommunicationService.emitExit(false);
                                this.navController.back();
                            });
                        }
                    }),
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    VideoSelfieProcccess(file) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let loader = null;
            try {
                loader = yield this.loadingController.create({
                    message: 'Procesando...',
                    spinner: 'crescent',
                });
                yield loader.present();
                const codigo = (_a = localStorage.getItem('codigo')) !== null && _a !== void 0 ? _a : '';
                this.dpiService.videoSelfie(file, codigo, this.connection, this.apikey).subscribe({
                    next: (response) => __awaiter(this, void 0, void 0, function* () {
                        if (loader) {
                            loader.dismiss();
                        }
                        if (!response['error']) {
                            // this.showAlert('Éxito', response['message'], [], () => {
                            //   this.closeModalVideoSelfie();
                            //   this.modalController.dismiss();
                            //   this.validateMetaG.videoSelfie = true;
                            //   this.updateValidation();
                            //   this.moveToNextStep(4);
                            // });
                            const modal = yield this.modalController.create({
                                component: MessageModalComponent,
                                componentProps: {
                                    title: 'Éxito',
                                    message: response['message'],
                                    variant: 'video'
                                },
                                backdropDismiss: false
                            });
                            yield modal.present();
                            modal.onDidDismiss().then(() => {
                                this.closeModalVideoSelfie();
                                this.modalController.dismiss();
                                this.validateMetaG.videoSelfie = true;
                                this.updateValidation();
                                this.moveToNextStep(4);
                            });
                        }
                        else {
                            const modal = yield this.modalController.create({
                                component: MessageModalComponent,
                                componentProps: {
                                    title: 'Error',
                                    errors: response['message'],
                                    variant: 'video'
                                },
                                backdropDismiss: false
                            });
                            yield modal.present();
                            modal.onDidDismiss().then(() => {
                                this.closeModalVideoSelfie();
                                // this.modalController.dismiss();
                                this.validateMetaG.videoSelfie = false;
                                this.updateValidation();
                            });
                            // this.showAlert('Error', response['message'], [], () => {
                            //   this.closeModalVideoSelfie();
                            // });
                            // this.validateMetaG.videoSelfie = false;
                            // this.updateValidation();
                        }
                    }),
                    error: (error) => __awaiter(this, void 0, void 0, function* () {
                        if (loader) {
                            loader.dismiss();
                        }
                        if (this.hasInternet) {
                            const modal = yield this.modalController.create({
                                component: MessageModalComponent,
                                componentProps: {
                                    title: 'Error',
                                    errors: error['message'],
                                    variant: 'video'
                                },
                                backdropDismiss: false
                            });
                            yield modal.present();
                            modal.onDidDismiss().then(() => {
                                this.resumeCameraFromParent();
                                // this.modalController.dismiss();
                            });
                        }
                        else {
                            const modal = yield this.modalController.create({
                                component: MessageModalComponent,
                                componentProps: {
                                    title: 'Error de conexión',
                                    errors: ["No pudimos cargar la página. Verifica tu internet y prueba de nuevo."],
                                    variant: 'dpi'
                                },
                                backdropDismiss: false
                            });
                            yield modal.present();
                            modal.onDidDismiss().then(() => {
                                this.sdkCommunicationService.emitExit(false);
                                this.navController.back();
                            });
                        }
                        console.error('Error al llamar al servicio:', error);
                    }),
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    validateDPIFront(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.DpiFrontProccess(filePath);
            return true;
        });
    }
    showAlert(header, message, details, onConfirm, subMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            const detailsMessage = Array.isArray(details)
                ? details.map((detail) => `${detail}           `).join('')
                : '';
            const fullMessage = message + (detailsMessage ? `${detailsMessage}` : '');
            const alert = yield this.alertController.create({
                backdropDismiss: false,
                header,
                message: fullMessage,
                buttons: [
                    {
                        text: 'Continuar',
                        handler: () => {
                            if (onConfirm) {
                                onConfirm();
                            }
                        },
                        cssClass: 'boton-personalizado'
                    },
                ],
            });
            yield alert.present();
        });
    }
    openCameraOverlayFrontal() {
        return __awaiter(this, void 0, void 0, function* () {
            this.modalRef = yield this.modalController.create({
                component: CameraWithOverlayComponent,
                componentProps: {
                    text1: 'Coloca la parte frontal de tu DPI',
                    text2: '',
                    overlaySrc: 'assets/imagesIdvision/overlay_container.png',
                    onTakePicture: this.DpiFrontProccess.bind(this),
                    closeRequested: () => this.closeOverlay(),
                },
                backdropDismiss: false,
            });
            yield this.modalRef.present();
        });
    }
    closeOverlay() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('Modal cerrada desde el componente padre');
        });
    }
    closeModalOverlay() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('test videoselfie');
        });
    }
    closePhotoSelfie() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('test videoselfie');
        });
    }
    //Trasero dpi services
    validateDPIBack(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            this.modalController.dismiss();
            yield this.DpiBackProccess(filePath);
            return true;
        });
    }
    openCameraOverlayTrasero() {
        return __awaiter(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: CameraWithOverlayComponent,
                componentProps: {
                    text1: 'Coloca el reverso de tu DPI',
                    text2: '',
                    overlaySrc: 'assets/imagesIdvision/overlay_container.png',
                    onTakePicture: this.DpiBackProccess.bind(this),
                },
                backdropDismiss: false,
            });
            yield modal.present();
            const { data } = yield modal.onWillDismiss();
            if (data && data.executeFuncion) {
                // Ejecutar la función que se recibió de la modal
                data.executeFuncion();
            }
        });
    }
    getBackModal(file) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!file || file.size === 0) {
                return;
            }
            yield this.VideoSelfieProcccess(file);
        });
    }
    photoVideoSelfieFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!filePath || filePath.size === 0) {
                return;
            }
            let loader = null;
            try {
                loader = yield this.loadingController.create({
                    message: 'Procesando...',
                    spinner: 'crescent',
                });
                yield loader.present();
                const codigo = (_a = localStorage.getItem('codigo')) !== null && _a !== void 0 ? _a : '';
                this.dpiService.photoSelfie(filePath, codigo, this.connection, this.apikey).subscribe({
                    next: (response) => __awaiter(this, void 0, void 0, function* () {
                        if (loader) {
                            loader.dismiss();
                        }
                        if (!response['error']) {
                            const modal = yield this.modalController.create({
                                component: MessageModalComponent,
                                componentProps: {
                                    title: 'Éxito',
                                    message: 'Foto Selfie registrada correctamente',
                                    variant: 'video'
                                },
                                backdropDismiss: false
                            });
                            yield modal.present();
                            modal.onDidDismiss().then(() => {
                                this.closePhotoSelfieFromParent();
                                this.modalController.dismiss();
                                this.validateMetaG.photoSelfie = true;
                                this.updateValidation();
                                this.moveToNextStep(5);
                            });
                            // this.showAlert('Éxito', 'Foto Selfie registrada correctamente', [], () => {
                            //   // this.closeModalFromParent();
                            //   this.closePhotoSelfieFromParent();
                            //   this.modalController.dismiss();
                            //   this.validateMetaG.photoSelfie = true;
                            //   this.updateValidation();
                            //   this.moveToNextStep(5);
                            // });
                        }
                        else {
                            const modal = yield this.modalController.create({
                                component: MessageModalComponent,
                                componentProps: {
                                    title: 'Error',
                                    errors: response['message'],
                                    variant: 'video'
                                },
                                backdropDismiss: false
                            });
                            yield modal.present();
                            modal.onDidDismiss().then(() => {
                                this.resumePhotoFromParent();
                                // this.modalController.dismiss();
                                this.validateMetaG.photoSelfie = false;
                                this.updateValidation();
                            });
                            // this.showAlert('Error', response['message'], [], () => {
                            //   this.resumePhotoFromParent();
                            // });
                            // this.validateMetaG.photoSelfie = false;
                            // this.updateValidation();
                        }
                    }),
                    error: (error) => __awaiter(this, void 0, void 0, function* () {
                        const modal = yield this.modalController.create({
                            component: MessageModalComponent,
                            componentProps: {
                                title: 'Error',
                                errors: error,
                                variant: 'video'
                            },
                            backdropDismiss: false
                        });
                        yield modal.present();
                        modal.onDidDismiss().then(() => {
                            this.resumePhotoFromParent();
                            // this.modalController.dismiss();
                        });
                        // this.showAlert('Error', '', error, () => {
                        //   this.resumePhotoFromParent();
                        // });
                        if (loader) {
                            loader.dismiss();
                        }
                        console.error('Error al llamar al servicio:', error);
                    }),
                });
            }
            catch (error) {
                const modal = yield this.modalController.create({
                    component: MessageModalComponent,
                    componentProps: {
                        title: 'Error',
                        errors: error,
                        variant: 'video'
                    },
                    backdropDismiss: false
                });
                yield modal.present();
                modal.onDidDismiss().then(() => {
                    this.resumePhotoFromParent();
                    this.modalController.dismiss();
                });
                // this.showAlert('Error', '', error, () => {
                //   this.resumePhotoFromParent();
                // });
                if (loader) {
                    loader.dismiss();
                }
                console.error("Error en el servicio: ", error);
            }
            // await this.VideoSelfieProcccess(file);
        });
    }
    getAcuerdoVideo(file) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!file || file.size === 0) {
                return;
            }
            let loader = null;
            try {
                loader = yield this.loadingController.create({
                    message: 'Procesando...',
                    spinner: 'crescent',
                });
                yield loader.present();
                const codigo = (_a = localStorage.getItem('codigo')) !== null && _a !== void 0 ? _a : '';
                this.dpiService.acuerdoVideo(file, codigo).subscribe({
                    next: (response) => __awaiter(this, void 0, void 0, function* () {
                        if (loader) {
                            loader.dismiss();
                        }
                        if (!response['error']) {
                            // this.showAlert('Éxito', response['message'], [], () => {
                            //   this.closeModalAcuerdoVideo();
                            //   this.modalController.dismiss();
                            //   this.validateMetaG.acuerdoVideo = true;
                            //   this.updateValidation();
                            //   // this.handleSlide(4);
                            //   // this.handleNext();
                            //   this.moveToNextStep(1);
                            // });
                            const modal = yield this.modalController.create({
                                component: MessageModalComponent,
                                componentProps: {
                                    title: 'Éxito',
                                    message: response['message'],
                                    variant: 'video'
                                },
                                backdropDismiss: false
                            });
                            yield modal.present();
                            modal.onDidDismiss().then(() => {
                                this.closeModalAcuerdoVideo();
                                this.modalController.dismiss();
                                this.validateMetaG.acuerdoVideo = true;
                                this.updateValidation();
                                this.moveToNextStep(1);
                            });
                        }
                        else {
                            // this.showAlert('Error', response['message'], [], () => {
                            //   // this.closeModalAcuerdoVideo();
                            // });
                            // this.validateMetaG.acuerdoVideo = false;
                            // this.updateValidation();
                            const modal = yield this.modalController.create({
                                component: MessageModalComponent,
                                componentProps: {
                                    title: 'Error',
                                    errors: response['message'],
                                    variant: 'video'
                                },
                                backdropDismiss: false
                            });
                            yield modal.present();
                            modal.onDidDismiss().then(() => {
                                // this.modalController.dismiss();
                                this.validateMetaG.acuerdoVideo = false;
                                this.updateValidation();
                            });
                        }
                    }),
                    error: (error) => __awaiter(this, void 0, void 0, function* () {
                        if (loader) {
                            loader.dismiss();
                        }
                        const modal = yield this.modalController.create({
                            component: MessageModalComponent,
                            componentProps: {
                                title: 'Error',
                                errors: error['message'],
                                variant: 'video'
                            },
                            backdropDismiss: false
                        });
                        yield modal.present();
                        modal.onDidDismiss().then(() => {
                            // this.modalController.dismiss();
                            //   this.validateMetaG.acuerdoVideo = false;
                            // this.updateValidation();
                        });
                        // this.showAlert('Error', '', error, () => {
                        //   // this.resumeCameraFromParent();
                        // });
                        console.error('Error al llamar al servicio:', error);
                    }),
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    openAcuerdoVideo() {
        return __awaiter(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: CamaraAcuerdoVideoComponent,
                componentProps: {
                    //   cssClass: 'my-custom-class',
                    //   text1: 'Video Selfie',
                    //   text2: 'Guatemala',
                    //   overlaySrc: 'assets/overlay-image.png',
                    backFunction: (file) => __awaiter(this, void 0, void 0, function* () {
                        yield this.getAcuerdoVideo(file);
                    }),
                    // closeRequested: () => this.closeModalOverlay(),
                },
                backdropDismiss: false,
            });
            yield modal.present();
        });
    }
    openVideoSelfie() {
        return __awaiter(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: CamaraVideoSelfieComponent,
                componentProps: {
                    cssClass: 'my-custom-class',
                    text1: 'Video Selfie',
                    text2: 'Guatemala',
                    overlaySrc: 'assets/overlay-image.png',
                    backFunction: (file) => __awaiter(this, void 0, void 0, function* () {
                        yield this.getBackModal(file);
                    }),
                    closeRequested: () => this.closeModalOverlay(),
                },
                backdropDismiss: false,
            });
            yield modal.present();
        });
    }
    openPhotoSelfie() {
        return __awaiter(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: PhotoSelfieCameraComponent,
                componentProps: {
                    cssClass: 'my-custom-class',
                    text1: 'Foto Selfie',
                    text2: 'Guatemala',
                    overlaySrc: 'assets/overlay-image.png',
                    onTakePicture: (file) => __awaiter(this, void 0, void 0, function* () {
                        yield this.photoVideoSelfieFile(file);
                    }),
                    closeRequested: () => this.closeModalOverlay(),
                },
                backdropDismiss: false,
            });
            yield modal.present();
        });
    }
    openSimpleAcuerdo() {
        return __awaiter(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: SimpleAcuerdoVideoComponent,
                componentProps: {
                    cssClass: 'my-custom-class',
                    backFunction: (file) => __awaiter(this, void 0, void 0, function* () {
                        yield this.getAcuerdoVideo(file);
                    }),
                    closeRequested: () => this.closeModalOverlay(),
                },
                backdropDismiss: false,
            });
            yield modal.present();
        });
    }
    copyProccess() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const codigo = (_a = localStorage.getItem('codigo')) !== null && _a !== void 0 ? _a : '';
            this.copiarTexto(codigo);
        });
    }
    copiarTexto(texto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Clipboard.write({
                string: texto
            });
            const toast = yield this.toastController.create({
                message: 'Proceso copiado!',
                duration: 2000,
                color: 'success'
            });
            yield toast.present();
        });
    }
}
IdVisionComponent.ɵfac = function IdVisionComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || IdVisionComponent)(i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i1.ModalController), i0.ɵɵdirectiveInject(i2.DpiService), i0.ɵɵdirectiveInject(i1.AlertController), i0.ɵɵdirectiveInject(i1.LoadingController), i0.ɵɵdirectiveInject(i1.Platform), i0.ɵɵdirectiveInject(i3.ModalDpiServices), i0.ɵɵdirectiveInject(i4.ModalVideoSelfieServices), i0.ɵɵdirectiveInject(i5.SdkCommunicationService), i0.ɵɵdirectiveInject(i1.NavController), i0.ɵɵdirectiveInject(i6.ValidateMetaGService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i7.PhotoSelfieServices), i0.ɵɵdirectiveInject(i1.ToastController)); };
IdVisionComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: IdVisionComponent, selectors: [["app-id-vision"]], viewQuery: function IdVisionComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.dpi = _t.first);
    } }, inputs: { isSwipe: "isSwipe", dpiCode: "dpiCode", connection: "connection", apikey: "apikey", validationConfig: "validationConfig" }, standalone: true, features: [i0.ɵɵProvidersFeature([DpiService]), i0.ɵɵStandaloneFeature], decls: 25, vars: 11, consts: [["dpi", ""], ["init", "false", 1, "custom-swiper"], [4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "content"], ["class", "col-confirmation", 4, "ngIf"], ["color", "white"], [1, "fixed-footer"], ["expand", "block", 1, "custom-button", 3, "click"], [1, "version"], ["vertical", "top", "horizontal", "end", "slot", "fixed", 4, "ngIf"], [1, "wrapper-no-internet"], [1, "content-no-internet"], [1, "title-no-internet"], ["src", "assets/imagesIdvision/no-internet.svg", "alt", "Error conexi\u00F3n img", 1, "icon-no-internet"], [1, "description-no-internet"], [1, "head"], [1, "p-justify"], [1, "rounded-input"], ["type", "number", "disabled", "true", "placeholder", "Digita tu n\u00FAmero de DPI"], [1, "verify-container"], [1, "image-container"], ["src", "assets/imagesIdvision/documentsImage.png", "alt", ""], [1, "container-text"], ["src", "assets/imagesIdvision/rostroImage.png", "alt", ""], [1, "content", 3, "ngSwitch"], [3, "ngClass", 4, "ngSwitchCase"], [4, "ngSwitchCase"], [4, "ngSwitchDefault"], [3, "ngClass"], ["src", "assets/imagesIdvision/Foco.png", "alt", ""], [1, "p-center", "p-info"], [1, "dpi-container"], ["id", "dpiFront", "autoplay", "", "loop", "", "muted", "", "playsinline", "", "width", "1280", "height", "300"], ["src", "assets/imagesIdvision/Dpi-front.mp4", "type", "video/mp4"], ["id", "dpiBack", "autoplay", "", "loop", "", "muted", "", "playsinline", "", "width", "1280", "height", "300"], ["src", "assets/imagesIdvision/Dpi-back.mp4", "type", "video/mp4"], [1, "col-confirmation"], [1, "font-confirmation"], ["color", "white", 1, "image-item"], ["src", "assets/imagesIdvision/blue-check.png", "alt", ""], ["vertical", "top", "horizontal", "end", "slot", "fixed"], [1, "button-debug", 3, "click"], ["name", "bug-outline"]], template: function IdVisionComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "ion-content")(1, "swiper-container", 1);
        i0.ɵɵtemplate(2, IdVisionComponent_swiper_slide_2_Template, 26, 0, "swiper-slide", 2)(3, IdVisionComponent_swiper_slide_3_Template, 8, 6, "swiper-slide", 3);
        i0.ɵɵelementStart(4, "swiper-slide")(5, "div", 4);
        i0.ɵɵtemplate(6, IdVisionComponent_ion_col_6_Template, 6, 0, "ion-col", 5)(7, IdVisionComponent_ion_col_7_Template, 6, 0, "ion-col", 5);
        i0.ɵɵelementStart(8, "ion-item", 6)(9, "div", 7)(10, "ion-button", 8);
        i0.ɵɵlistener("click", function IdVisionComponent_Template_ion_button_click_10_listener() { return ctx.handleExit(); });
        i0.ɵɵtext(11, "Salir");
        i0.ɵɵelementEnd()()()()()();
        i0.ɵɵelementStart(12, "div", 9);
        i0.ɵɵtext(13);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(14, IdVisionComponent_ion_fab_14_Template, 3, 0, "ion-fab", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "ion-content")(16, "div", 11)(17, "div", 12)(18, "h2", 13);
        i0.ɵɵtext(19, "Error de conexi\u00F3n");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(20, "img", 14);
        i0.ɵɵelementStart(21, "p", 15);
        i0.ɵɵtext(22, " No pudimos cargar la p\u00E1gina. ");
        i0.ɵɵelement(23, "br");
        i0.ɵɵtext(24, " Verifica tu internet y prueba de nuevo. ");
        i0.ɵɵelementEnd()()()();
    } if (rf & 2) {
        i0.ɵɵstyleProp("display", ctx.hasInternet ? "block" : "none");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", !ctx.simpleProcess);
        i0.ɵɵadvance();
        i0.ɵɵproperty("ngForOf", ctx.validationConfig);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isValid);
        i0.ɵɵadvance();
        i0.ɵɵproperty("ngIf", !ctx.isValid);
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate2("", ctx.versionSDK, " ", ctx.hasInternet ? "conected" : "disconected", "");
        i0.ɵɵadvance();
        i0.ɵɵproperty("ngIf", ctx.showDebug);
        i0.ɵɵadvance();
        i0.ɵɵstyleProp("display", !ctx.hasInternet ? "block" : "none");
    } }, dependencies: [IonicModule, i1.IonButton, i1.IonCol, i1.IonContent, i1.IonFab, i1.IonFabButton, i1.IonGrid, i1.IonIcon, i1.IonInput, i1.IonItem, i1.IonRow, i1.NumericValueAccessor, CommonModule, i8.NgClass, i8.NgForOf, i8.NgIf, i8.NgSwitch, i8.NgSwitchCase, i8.NgSwitchDefault], styles: [".content[_ngcontent-%COMP%] {\n  padding: 10px;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n  background-color: #fff;\n  font-size: 18px;\n  background-image: url('assets/imagesIdvision/background.png');\n\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n\n}\n\n\nh2[_ngcontent-%COMP%] {\n  font-size: 1.5em;\n  font-weight: bold;\n  color: var(--orange-primary, orange);\n  text-align: center;\n  margin-top: 20px;\n}\n\np[_ngcontent-%COMP%] {\n  font-size: 1em;\n  color: #666;\n  text-align: center;\n  margin: 0;\n}\n\nion-grid[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n\nion-row[_ngcontent-%COMP%] {\n  margin: 15px 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\nion-col[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n\nion-icon[_ngcontent-%COMP%] {\n  font-size: 3em; // Tama\u00F1o del \u00EDcono para que sea m\u00E1s destacado\n  color: #ff8c00; // Color similar al amarillo-naranja\n  margin-bottom: 10px;\n}\n\n.container-text[_ngcontent-%COMP%] {\n  text-align: justify !important;\n  width: 180px;\n}\n\np[_ngcontent-%COMP%] {\n  text-align: start;\n}\n\n.p-center[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.p-justify[_ngcontent-%COMP%] {\n  text-align: start;\n}\n\n.head[_ngcontent-%COMP%] {\n  padding: 30px;\n  margin-top: 75px;\n  margin-bottom: 20px;\n}\n\n\n.verify-container[_ngcontent-%COMP%] {\n  // padding: 60px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 40%; // Ocupa todo el espacio disponible en el ion-content\n  text-align: center;\n  //background-color: black;\n}\n\n.fixed-footer[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  padding: 0px 10px 25px 10px;\n  // background-color: black; // Color de fondo, opcional\n  // box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); // Sombra suave para que resalte\n\n  ion-button {\n    width: 90%;\n    max-width: 300px;\n    margin: 0 auto;\n    background-color: #ffcc00;\n    color: #ffffff;\n    font-weight: bold;\n    border-radius: 20px;\n\n    &:hover {\n      background-color: #ffb300;\n    }\n\n    &:active {\n      background-color: #e6a800;\n    }\n  }\n}\n\n.dpi-container[_ngcontent-%COMP%] {\n  display: flex;\n  //width: 100%;\n  justify-content: center;\n  align-items: center;\n  height: 50vh;\n}\n\n.dpi-image[_ngcontent-%COMP%] {\n  width: 200px;\n}\n\n.image-container[_ngcontent-%COMP%] {\n  width: 100px;\n  max-width: 90px;\n}\n\n.col-confirmation[_ngcontent-%COMP%] {\n  margin-top: 100px;\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  \n\n}\n\n.image-item[_ngcontent-%COMP%] {\n  margin-top: 50px;\n  padding-top: 70px;\n}\n\n.font-confirmation[_ngcontent-%COMP%] {\n  font-size: 26px;\n  text-align: center;\n  // color: #005da9;\n  color: var(--purple-primary);\n  font-weight: bold;\n}\n\n\n.rounded-input[_ngcontent-%COMP%] {\n  margin-top: 15px;\n  background-color: #f4f6fc;\n  \n\n  border-radius: 10px;\n  \n\n  padding: 5px 5px;\n  \n\n  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);\n  \n\n  --ion-border-color: transparent;\n  \n\n}\n\nion-input[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--orange-primary);\n  --padding-start: 8px;\n}\n\n.custom-footer[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  padding: 10px;\n  display: flex;\n  justify-content: space-between;\n  \n\n  background-color: #ffffff;\n  \n\n  //box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); \n\n}\n\n.custom-footer[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  flex: 0 0 48%;\n  \n\n}\n\n.custom-footer[_ngcontent-%COMP%]   .left-button[_ngcontent-%COMP%] {\n  max-width: 140px;\n  color: black;\n\n  --background: white;\n\n  --color: var(--purple-primary);\n\n  --border-radius: 20px;\n  --border-color: white;\n  margin-right: auto;\n  \n\n  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.0);\n\n}\n\n.custom-footer[_ngcontent-%COMP%]   .right-button[_ngcontent-%COMP%] {\n  margin-left: auto;\n  \n\n}\n\n.tutorial-head[_ngcontent-%COMP%] {\n  padding-top: 50px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: black;\n}\n\n.center-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 60vh;\n  \n\n  width: 100%;\n}\n\n.tutorial-title[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.rounded-input[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n  font-size: 14px;\n  \n\n  color: #333;\n  \n\n}\n\n.rounded-input[_ngcontent-%COMP%]::part(native) {\n  background: transparent;\n  \n\n}\n\n.p-info[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: #714e93\n}\n\n.custom-button[_ngcontent-%COMP%] {\n  --background: var(--purple-primary, #82298F) !important;\n  --background-hover: var(--purple-secondary, #2b0d30) !important;\n  --background-activated: var(--purple-secondary, #2b0d30) !important;\n  --color: #ffffff !important;\n  --border-radius: 20px !important;\n  --padding-top: 10px !important;\n  --padding-bottom: 10px !important;\n  --box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.25) !important;\n  text-transform: none;\n\n  pointer-events: auto;\n\n}\n\n//blur[_ngcontent-%COMP%]   effect\n\n.blur-effect[_ngcontent-%COMP%] {\n  filter: blur(5px);\n  pointer-events: none;\n}\n\n.blur-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(255, 255, 255, 0.7);\n  z-index: 999;\n  filter: blur(5px);\n}\n\n.boton-personalizado[_ngcontent-%COMP%] {\n  background-color: #4caf50;\n  \n\n  color: white;\n  font-size: 16px;\n}\n\n.version[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 10px;\n  right: 10px;\n  font-size: 12px;\n  color: #888;\n  z-index: 1000;\n}\n\n.button-debug[_ngcontent-%COMP%] {\n  --background: #ff4081;\n  --color: #fff;\n}\n\n\n.wrapper-no-internet[_ngcontent-%COMP%] {\n  background-color: #fff;\n  height: 100vh;\n  display: flex;\n  justify-content: center; \n\n  align-items: center;     \n\n  padding: 40px;\n  background-image: url('assets/imagesIdvision/background.png') !important;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  \n}\n\n.content-no-internet[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 16px;\n}\n\n.title-no-internet[_ngcontent-%COMP%]{\n  color: #000;\n  font-size: 32px;\n  font-weight: bold;\n}\n\n.icon-no-internet[_ngcontent-%COMP%] {\n  width: 125px;\n  display: block;\n  margin-top: 25px;\n}\n\n.description-no-internet[_ngcontent-%COMP%] {\n  margin-top: 25px;\n  font-size: 22px;\n  color: #000;\n  line-height: 1.5;\n  text-align: center;\n}"] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IdVisionComponent, [{
        type: Component,
        args: [{ selector: 'app-id-vision', standalone: true, schemas: [CUSTOM_ELEMENTS_SCHEMA], imports: [IonicModule, CommonModule], providers: [DpiService], encapsulation: ViewEncapsulation.Emulated, template: "<ion-content [style.display]=\"hasInternet ? 'block' : 'none'\">\n  <swiper-container init=\"false\" class=\"custom-swiper\">\n\n    <!-- \uD83D\uDD39 PASO 1: Verificaci\u00F3n de Identidad (Est\u00E1tico) -->\n    <swiper-slide *ngIf=\"!simpleProcess\">\n      <div class=\"content\">\n        <div class=\"head\">\n          <h2 class=\"p-justify\">Verifiquemos tu identidad</h2>\n          <p class=\"p-justify\">Para completar tu verificaci\u00F3n, por favor ingresa tu n\u00FAmero de identificaci\u00F3n (DPI).</p>\n          <ion-item class=\"rounded-input\">\n            <ion-input #dpi type=\"number\" disabled=\"true\" placeholder=\"Digita tu n\u00FAmero de DPI\"></ion-input>\n          </ion-item>\n        </div>\n        <ion-grid class=\"verify-container\">\n          <ion-row>\n            <div class=\"image-container\">\n              <img src=\"assets/imagesIdvision/documentsImage.png\" alt=\"\" />\n            </div>\n            <div class=\"container-text\">\n              <p>Sube fotos de documentos que prueben tu identidad</p>\n            </div>\n          </ion-row>\n          <ion-row>\n            <div class=\"image-container\">\n              <img src=\"assets/imagesIdvision/rostroImage.png\" alt=\"\" />\n            </div>\n            <div class=\"container-text\">\n              <p>Graba un video selfie mientras lees el texto en voz alta</p>\n            </div>\n          </ion-row>\n        </ion-grid>\n        <div class=\"fixed-footer\">\n          <ion-button class=\"custom-button\" expand=\"block\" (click)=\"handleClick()\">Empecemos</ion-button>\n        </div>\n      </div>\n    </swiper-slide>\n\n    <!-- \uD83D\uDD39 PASOS INTERMEDIOS: Se generan din\u00E1micamente seg\u00FAn el `order` -->\n    <swiper-slide *ngFor=\"let step of validationConfig\">\n      <div class=\"content\" [ngSwitch]=\"step.type\">\n        <!--Acuerdo de video-->\n        <div *ngSwitchCase=\"1\" [ngClass]=\"{'blur-effect': simpleProcess}\">\n          <div class=\"head\">\n            <h2>Acuerdo de v\u00EDdeo</h2>\n            <p class=\"p-justify\">Graba un breve video para completar tu proceso de identificaci\u00F3n.</p>\n          </div>\n          <ion-grid class=\"verify-container\">\n            <ion-row>\n              <div class=\"image-container\">\n                <img src=\"assets/imagesIdvision/Foco.png\" alt=\"\" />\n              </div>\n              <div class=\"container-text\">\n                <p>Si est\u00E1s en interiores, aseg\u00FArate de que la luz est\u00E9 frente a ti, no detr\u00E1s.</p>\n              </div>\n            </ion-row>\n            <ion-row>\n              <div class=\"image-container\">\n                <img src=\"assets/imagesIdvision/rostroImage.png\" alt=\"\" />\n              </div>\n              <div class=\"container-text\">\n                <p>Aseg\u00FArate de que tu rostro sea visible y de no usar anteojos ni sombreros.</p>\n              </div>\n            </ion-row>\n          </ion-grid>\n          <div class=\"fixed-footer\">\n            <ion-button class=\"custom-button\" expand=\"block\" (click)=\"step.action()\">Abrir la c\u00E1mara</ion-button>\n          </div>\n        </div>\n        <!-- \uD83D\uDD39 DPI Frontal -->\n        <div *ngSwitchCase=\"2\">\n          <div class=\"head\">\n            <h2>Coloca la parte frontal de tu DPI</h2>\n            <p class=\"p-center p-info\">Evita sombras, reflejos y coloca tu documento dentro del recuadro.</p>\n          </div>\n          <div class=\"dpi-container\">\n            <video id=\"dpiFront\" autoplay loop muted playsinline width=\"1280\" height=\"300\">\n              <source src=\"assets/imagesIdvision/Dpi-front.mp4\" type=\"video/mp4\">\n            </video>\n          </div>\n          <div class=\"fixed-footer\">\n            <ion-button class=\"custom-button\" expand=\"block\" (click)=\"step.action()\">Tomar una foto</ion-button>\n          </div>\n        </div>\n\n        <!-- \uD83D\uDD39 DPI Trasero -->\n        <div *ngSwitchCase=\"3\">\n          <div class=\"head\">\n            <h2>Coloca el reverso de tu DPI</h2>\n            <p class=\"p-center p-info\">Evita sombras, reflejos y coloca tu documento dentro del recuadro.</p>\n          </div>\n          <div class=\"dpi-container\">\n            <video id=\"dpiBack\" autoplay loop muted playsinline width=\"1280\" height=\"300\">\n              <source src=\"assets/imagesIdvision/Dpi-back.mp4\" type=\"video/mp4\">\n            </video>\n          </div>\n          <div class=\"fixed-footer\">\n            <ion-button class=\"custom-button\" expand=\"block\" (click)=\"step.action()\">Tomar una foto</ion-button>\n          </div>\n        </div>\n\n        <!-- \uD83D\uDD39 Video Selfie -->\n        <div *ngSwitchCase=\"4\">\n          <div class=\"head\">\n            <h2>Video Selfie</h2>\n            <p class=\"p-justify\">Graba un breve video para completar tu proceso de identificaci\u00F3n.</p>\n          </div>\n          <ion-grid class=\"verify-container\">\n            <ion-row>\n              <ion-row>\n                <div class=\"image-container\">\n                  <img src=\"assets/imagesIdvision/Foco.png\" alt=\"\" />\n                </div>\n                <div class=\"container-text\">\n                  <p>Si est\u00E1s en interiores, aseg\u00FArate de que la luz est\u00E9 frente a ti, no detr\u00E1s.</p>\n                </div>\n              </ion-row>\n              <ion-row>\n                <div class=\"image-container\">\n                  <img src=\"assets/imagesIdvision/rostroImage.png\" alt=\"\" />\n                </div>\n                <div class=\"container-text\">\n                  <p>Aseg\u00FArate de que tu rostro sea visible y de no usar anteojos ni sombreros.</p>\n                </div>\n              </ion-row>\n            </ion-row>\n          </ion-grid>\n          <div class=\"fixed-footer\">\n            <ion-button class=\"custom-button\" expand=\"block\" (click)=\"step.action()\">Abrir la c\u00E1mara</ion-button>\n          </div>\n        </div>\n        <!-- Photo Selfie -->\n        <!-- TODO Se debera cambiar a 5, se dejo 1 por acuerdo de video -->\n        <div *ngSwitchCase=\"5\">\n          <div class=\"head\">\n            <h2>Foto Selfie</h2>\n            <p class=\"p-justify\">Toma una foto para completar tu proceso de identificaci\u00F3n.</p>\n          </div>\n          <ion-grid class=\"verify-container\">\n            <ion-row>\n              <ion-row>\n                <div class=\"image-container\">\n                  <img src=\"assets/imagesIdvision/Foco.png\" alt=\"\" />\n                </div>\n                <div class=\"container-text\">\n                  <p>Si est\u00E1s en interiores, aseg\u00FArate de que la luz est\u00E9 frente a ti, no detr\u00E1s.</p>\n                </div>\n              </ion-row>\n              <ion-row>\n                <div class=\"image-container\">\n                  <img src=\"assets/imagesIdvision/rostroImage.png\" alt=\"\" />\n                </div>\n                <div class=\"container-text\">\n                  <p>Aseg\u00FArate de que tu rostro sea visible y de no usar anteojos ni sombreros.</p>\n                </div>\n              </ion-row>\n            </ion-row>\n          </ion-grid>\n          <div class=\"fixed-footer\">\n            <ion-button class=\"custom-button\" expand=\"block\" (click)=\"step.action()\">Abrir la c\u00E1mara</ion-button>\n          </div>\n        </div>\n        <!-- \uD83D\uDD39 Caso por defecto (Error en configuraci\u00F3n) -->\n        <div *ngSwitchDefault>\n          <h2>Paso desconocido</h2>\n        </div>\n      </div>\n    </swiper-slide>\n    <!-- \uD83D\uDD39 PASO FINAL: Confirmaci\u00F3n (Est\u00E1tico) -->\n    <swiper-slide>\n      <div class=\"content\">\n        <ion-col class=\"col-confirmation\" *ngIf=\"isValid\">\n          <ion-item color=\"white\">\n            <p class=\"font-confirmation\">Informaci\u00F3n procesada de manera correcta</p>\n          </ion-item>\n          <ion-item color=\"white\" class=\"image-item\">\n            <img src=\"assets/imagesIdvision/blue-check.png\" alt=\"\" />\n          </ion-item>\n        </ion-col>\n        <ion-col class=\"col-confirmation\" *ngIf=\"!isValid\">\n          <ion-item color=\"white\">\n            <p class=\"font-confirmation\">Ocurri\u00F3 un error al procesar la informaci\u00F3n</p>\n          </ion-item>\n          <ion-item color=\"white\" class=\"image-item\">\n            <img src=\"assets/imagesIdvision/blue-check.png\" alt=\"\" />\n          </ion-item>\n        </ion-col>\n        <ion-item color=\"white\">\n          <div class=\"fixed-footer\">\n            <ion-button class=\"custom-button\" expand=\"block\" (click)=\"handleExit()\">Salir</ion-button>\n          </div>\n        </ion-item>\n      </div>\n    </swiper-slide>\n\n  </swiper-container>\n  <div class=\"version\">{{versionSDK}} {{hasInternet ? 'conected': 'disconected'}}</div>\n  <ion-fab vertical=\"top\" horizontal=\"end\" slot=\"fixed\" *ngIf=\"showDebug\">\n    <ion-fab-button class=\"button-debug\" (click)=\"copyProccess()\">\n      <ion-icon name=\"bug-outline\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n\n</ion-content>\n<!-- pantalla para cuando no exista internet -->\n<ion-content [style.display]=\"!hasInternet ? 'block' : 'none'\"> \n  <div class=\"wrapper-no-internet\">\n    <div class=\"content-no-internet\">\n      <h2 class=\"title-no-internet\">Error de conexi\u00F3n</h2>\n      <img src=\"assets/imagesIdvision/no-internet.svg\" alt=\"Error conexi\u00F3n img\" class=\"icon-no-internet\"/>\n      <p class=\"description-no-internet\">\n        No pudimos cargar la p\u00E1gina. <br>\n        Verifica tu internet y prueba de nuevo.\n      </p>\n    </div>\n  </div>\n</ion-content>", styles: [".content {\n  padding: 10px;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n  background-color: #fff;\n  font-size: 18px;\n  background-image: url('assets/imagesIdvision/background.png');\n\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n\n}\n\n\nh2 {\n  font-size: 1.5em;\n  font-weight: bold;\n  color: var(--orange-primary, orange);\n  text-align: center;\n  margin-top: 20px;\n}\n\np {\n  font-size: 1em;\n  color: #666;\n  text-align: center;\n  margin: 0;\n}\n\nion-grid {\n  margin-top: 20px;\n}\n\nion-row {\n  margin: 15px 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\nion-col {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n\nion-icon {\n  font-size: 3em; // Tama\u00F1o del \u00EDcono para que sea m\u00E1s destacado\n  color: #ff8c00; // Color similar al amarillo-naranja\n  margin-bottom: 10px;\n}\n\n.container-text {\n  text-align: justify !important;\n  width: 180px;\n}\n\np {\n  text-align: start;\n}\n\n.p-center {\n  text-align: center;\n}\n\n.p-justify {\n  text-align: start;\n}\n\n.head {\n  padding: 30px;\n  margin-top: 75px;\n  margin-bottom: 20px;\n}\n\n\n.verify-container {\n  // padding: 60px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 40%; // Ocupa todo el espacio disponible en el ion-content\n  text-align: center;\n  //background-color: black;\n}\n\n.fixed-footer {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  padding: 0px 10px 25px 10px;\n  // background-color: black; // Color de fondo, opcional\n  // box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); // Sombra suave para que resalte\n\n  ion-button {\n    width: 90%;\n    max-width: 300px;\n    margin: 0 auto;\n    background-color: #ffcc00;\n    color: #ffffff;\n    font-weight: bold;\n    border-radius: 20px;\n\n    &:hover {\n      background-color: #ffb300;\n    }\n\n    &:active {\n      background-color: #e6a800;\n    }\n  }\n}\n\n.dpi-container {\n  display: flex;\n  //width: 100%;\n  justify-content: center;\n  align-items: center;\n  height: 50vh;\n}\n\n.dpi-image {\n  width: 200px;\n}\n\n.image-container {\n  width: 100px;\n  max-width: 90px;\n}\n\n.col-confirmation {\n  margin-top: 100px;\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  /* Ajusta el espacio entre los elementos */\n}\n\n.image-item {\n  margin-top: 50px;\n  padding-top: 70px;\n}\n\n.font-confirmation {\n  font-size: 26px;\n  text-align: center;\n  // color: #005da9;\n  color: var(--purple-primary);\n  font-weight: bold;\n}\n\n\n.rounded-input {\n  margin-top: 15px;\n  background-color: #f4f6fc;\n  /* Color de fondo suave */\n  border-radius: 10px;\n  /* Bordes redondeados */\n  padding: 5px 5px;\n  /* Espaciado interno */\n  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);\n  /* Sombra suave */\n  --ion-border-color: transparent;\n  /* Quita cualquier borde por defecto */\n}\n\nion-input {\n  text-align: center;\n  color: var(--orange-primary);\n  --padding-start: 8px;\n}\n\n.custom-footer {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  padding: 10px;\n  display: flex;\n  justify-content: space-between;\n  /* Alinea los botones a los extremos */\n  background-color: #ffffff;\n  /* Fondo opcional */\n  //box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); /* Sombra opcional */\n}\n\n.custom-footer ion-button {\n  flex: 0 0 48%;\n  /* Los botones ocupan casi la mitad del espacio */\n}\n\n.custom-footer .left-button {\n  max-width: 140px;\n  color: black;\n\n  --background: white;\n\n  --color: var(--purple-primary);\n\n  --border-radius: 20px;\n  --border-color: white;\n  margin-right: auto;\n  /* Opcional si necesitas ajustes de margen */\n  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.0);\n\n}\n\n.custom-footer .right-button {\n  margin-left: auto;\n  /* Opcional si necesitas ajustes de margen */\n}\n\n.tutorial-head {\n  padding-top: 50px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: black;\n}\n\n.center-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 60vh;\n  /* Ajusta este valor si quieres m\u00E1s o menos espacio vertical */\n  width: 100%;\n}\n\n.tutorial-title {\n  text-align: center;\n}\n\n.rounded-input ion-input {\n  font-size: 14px;\n  /* Tama\u00F1o de texto */\n  color: #333;\n  /* Color del texto */\n}\n\n.rounded-input::part(native) {\n  background: transparent;\n  /* Fondo transparente para evitar conflictos */\n}\n\n.p-info {\n  font-weight: bold;\n  color: #714e93\n}\n\n.custom-button {\n  --background: var(--purple-primary, #82298F) !important;\n  --background-hover: var(--purple-secondary, #2b0d30) !important;\n  --background-activated: var(--purple-secondary, #2b0d30) !important;\n  --color: #ffffff !important;\n  --border-radius: 20px !important;\n  --padding-top: 10px !important;\n  --padding-bottom: 10px !important;\n  --box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.25) !important;\n  text-transform: none;\n\n  pointer-events: auto;\n\n}\n\n//blur effect\n\n.blur-effect {\n  filter: blur(5px);\n  pointer-events: none;\n}\n\n.blur-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(255, 255, 255, 0.7);\n  z-index: 999;\n  filter: blur(5px);\n}\n\n.boton-personalizado {\n  background-color: #4caf50;\n  /* Verde, por ejemplo */\n  color: white;\n  font-size: 16px;\n}\n\n.version {\n  position: fixed;\n  bottom: 10px;\n  right: 10px;\n  font-size: 12px;\n  color: #888;\n  z-index: 1000;\n}\n\n.button-debug {\n  --background: #ff4081;\n  --color: #fff;\n}\n\n\n.wrapper-no-internet {\n  background-color: #fff;\n  height: 100vh;\n  display: flex;\n  justify-content: center; /* centra en eje vertical */\n  align-items: center;     /* centra en eje horizontal */\n  padding: 40px;\n  background-image: url('assets/imagesIdvision/background.png') !important;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  \n}\n\n.content-no-internet {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 16px;\n}\n\n.title-no-internet{\n  color: #000;\n  font-size: 32px;\n  font-weight: bold;\n}\n\n.icon-no-internet {\n  width: 125px;\n  display: block;\n  margin-top: 25px;\n}\n\n.description-no-internet {\n  margin-top: 25px;\n  font-size: 22px;\n  color: #000;\n  line-height: 1.5;\n  text-align: center;\n}\n"] }]
    }], () => [{ type: i0.NgZone }, { type: i1.ModalController }, { type: i2.DpiService }, { type: i1.AlertController }, { type: i1.LoadingController }, { type: i1.Platform }, { type: i3.ModalDpiServices }, { type: i4.ModalVideoSelfieServices }, { type: i5.SdkCommunicationService }, { type: i1.NavController }, { type: i6.ValidateMetaGService }, { type: i0.ChangeDetectorRef }, { type: i7.PhotoSelfieServices }, { type: i1.ToastController }], { dpi: [{
            type: ViewChild,
            args: ['dpi', { static: false }]
        }], isSwipe: [{
            type: Input
        }], dpiCode: [{
            type: Input
        }], connection: [{
            type: Input
        }], apikey: [{
            type: Input
        }], validationConfig: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(IdVisionComponent, { className: "IdVisionComponent" }); })();
//# sourceMappingURL=id-vision.component.js.map