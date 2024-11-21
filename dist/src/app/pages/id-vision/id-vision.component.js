import { __awaiter } from "tslib";
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, signal, ViewChild } from '@angular/core';
import { AlertController, IonicModule, IonInput, LoadingController, ModalController, Platform } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { CameraWithOverlayComponent } from './components/camera-with-overlay/camera-with-overlay.component';
import { CamaraVideoSelfieComponent } from './components/camara-video-selfie/camara-video-selfie.component';
import { DpiService } from './services/dpi/dpi-service.service';
import { ModalDpiServices } from './services/modal-services/modal-dpi-services';
import { CustomSlideComponent } from './components/custom-slide/custom-slide.component';
import { ModalVideoSelfieServices } from './services/modal-services/modal-video-selfie-services';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
import * as i2 from "./services/dpi/dpi-service.service";
import * as i3 from "./services/modal-services/modal-dpi-services";
import * as i4 from "./services/modal-services/modal-video-selfie-services";
const _c0 = ["dpi"];
register();
export class IdVisionComponent {
    constructor(modalController, dpiService, alertController, loadingController, platform, modalDpiServices, modalVideoSelfieServices
    /*private storage: Storage*/ ) {
        this.modalController = modalController;
        this.dpiService = dpiService;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.platform = platform;
        this.modalDpiServices = modalDpiServices;
        this.modalVideoSelfieServices = modalVideoSelfieServices;
        this.tutoImage1 = './../../../assets/imagesIdvision/documentsImage.png';
        this.tutoImage2 = './../../../assets/imagesIdvision/documentsImage.png';
        this.tutoImage3 = './../../../assets/imagesIdvision/56.png';
        this.tutoImage4 = './../../../assets/imagesIdvision/57.png';
        this.swiperElement = signal(null);
        this.modalRef = null;
        // this.init();
        this.isAndroid = this.platform.is('android');
        this.isIOS = this.platform.is('ios');
    }
    ngOnInit() {
        var _a;
        const swiperElemConstructor = document.querySelector('swiper-container');
        const swiperOptions = {
            slidesPerView: 1,
            pagination: false,
            navigation: {
                enabled: false,
            },
            // allowTouchMove: false,
        };
        Object.assign(swiperElemConstructor, swiperOptions);
        this.swiperElement.set(swiperElemConstructor);
        (_a = this.swiperElement()) === null || _a === void 0 ? void 0 : _a.initialize();
        this.modalDpiServices.closeOverlay$.subscribe(() => {
            this.closeOverlay();
        });
        this.modalVideoSelfieServices.closeOverlay$.subscribe(() => {
            this.closeModalOverlay();
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
    handleSkipTutorial() {
        var _a, _b;
        (_b = (_a = this.swiperElement()) === null || _a === void 0 ? void 0 : _a.swiper) === null || _b === void 0 ? void 0 : _b.slideTo(5);
    }
    handleNext() {
        var _a, _b;
        (_b = (_a = this.swiperElement()) === null || _a === void 0 ? void 0 : _a.swiper) === null || _b === void 0 ? void 0 : _b.slideNext();
    }
    InitProccess() {
        return __awaiter(this, void 0, void 0, function* () {
            let loader = null;
            try {
                loader = yield this.loadingController.create({
                    message: 'Procesando...',
                    spinner: 'crescent'
                });
                yield loader.present();
                this.dpiService.InitProccess(this.dpi.value + '', '673259d3f027711b51e71202').subscribe({
                    next: (response) => {
                        console.log(response);
                        if (loader) {
                            loader.dismiss();
                        }
                        if (!response['error']) {
                            localStorage.setItem('codigo', response['details']);
                            this.handleSlide(1);
                        }
                        else {
                            const dpiValue = this.dpi.value;
                            if (!dpiValue || dpiValue.trim().length === 0) {
                                this.showAlert('Error', 'El campo DPI no puede estar vacío', []);
                            }
                            else if (dpiValue && dpiValue.length > 12) {
                                this.showAlert('Error', response['message'], []);
                            }
                            else {
                                const errorMessage = response['message']['errors']['CUI'][0];
                                this.showAlert('Error', errorMessage, []);
                            }
                        }
                    },
                    error: (error) => {
                        console.error('Error al llamar al servicio:', error);
                    }
                });
            }
            catch (error) {
                alert("error");
                console.log(error);
            }
        });
    }
    DpiFrontProccess(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let loader = null;
            try {
                // Muestra el loader
                loader = yield this.loadingController.create({
                    message: 'Procesando...',
                    spinner: 'crescent'
                });
                yield loader.present();
                console.log('enviando DPI front');
                const file = yield this.convertImagePathToFile(filePath, 'imagen_temporal.jpg');
                console.log('Archivo temporal creado:', file);
                const codigo = (_a = localStorage.getItem('codigo')) !== null && _a !== void 0 ? _a : "";
                yield this.dpiService.uploadFrontDPI(file, codigo).subscribe({
                    next: (response) => {
                        // Oculta el loader cuando se recibe una respuesta
                        if (loader) {
                            loader.dismiss();
                        }
                        console.log(response);
                        if (!response['error']) {
                            this.showAlert('Éxito', 'DPI registrado correctamente', [], () => {
                                this.closeModalFromParent();
                                this.modalController.dismiss();
                                this.handleSlide(2);
                            });
                            // this.swiperElement()?.swiper?.slideNext();
                        }
                        else {
                            this.showAlert(response['mensage'], '', response['details'], () => {
                                this.resumeCameraFromParent();
                            });
                        }
                    },
                    error: (error) => {
                        console.error('Error al llamar al servicio:', error);
                        this.showAlert('Error', '', error, () => {
                            this.resumeCameraFromParent();
                        });
                        // Oculta el loader en caso de error
                        if (loader) {
                            loader.dismiss();
                        }
                    }
                });
            }
            catch (error) {
                alert("error");
                console.log(error);
            }
        });
    }
    closeModalFromParent() {
        // Emite el evento para cerrar la modal
        this.modalDpiServices.requestCloseOverlay();
    }
    closeModalVideoSelfie() {
        this.modalVideoSelfieServices.requestCloseOverlay();
    }
    resumeCameraFromParent() {
        this.modalDpiServices.requestResumeCamera();
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
                    spinner: 'crescent'
                });
                yield loader.present();
                const file = yield this.convertImagePathToFile(filePath, 'imagen_temporal_back.jpg');
                // console.log('Archivo temporal creado:', file);
                const codigo = (_a = localStorage.getItem('codigo')) !== null && _a !== void 0 ? _a : "";
                this.dpiService.uploadBackDPI(file, codigo).subscribe({
                    next: (response) => {
                        if (loader) {
                            loader.dismiss();
                        }
                        if (!response['error']) {
                            this.showAlert('Éxito', 'DPI registrado correctamente', [], () => {
                                this.closeModalFromParent();
                                this.modalController.dismiss();
                                this.handleSlide(3);
                            });
                            // this.swiperElement()?.swiper?.slideNext();
                        }
                        else {
                            this.showAlert(response['mensage'], '', response['details']);
                        }
                    },
                    error: (error) => {
                        if (loader) {
                            loader.dismiss();
                        }
                        console.error('Error al llamar al servicio:', error);
                    }
                });
            }
            catch (error) {
                alert("error");
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
                    spinner: 'crescent'
                });
                yield loader.present();
                // const file = await this.convertImagePathToFile(filePath, this.isIOS ? 'video_selfie.mp4' : 'video_selfie.webm',);
                // console.log('Archivo temporal creado:', file);
                const codigo = (_a = localStorage.getItem('codigo')) !== null && _a !== void 0 ? _a : "";
                this.dpiService.videoSelfie(file, codigo).subscribe({
                    next: (response) => {
                        if (loader) {
                            loader.dismiss();
                        }
                        if (!response['error']) {
                            this.showAlert('Éxito', response['message'], [], () => {
                                this.closeModalVideoSelfie();
                                // this.closeModalFromParent();
                                this.modalController.dismiss();
                                this.handleSlide(4);
                            });
                        }
                        else {
                            this.showAlert('Error', response['message'], [], () => {
                                this.closeModalVideoSelfie();
                            });
                        }
                    },
                    error: (error) => {
                        console.error('Error al llamar al servicio:', error);
                    }
                });
            }
            catch (error) {
                alert("error");
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
            const detailsMessage = details
                ? details.map(detail => `${detail}           `).join('')
                : '';
            const fullMessage = message + (detailsMessage ? `${detailsMessage}` : '');
            const alert = yield this.alertController.create({
                header,
                message: fullMessage,
                buttons: [
                    {
                        text: 'Continuar',
                        handler: () => {
                            if (onConfirm) {
                                onConfirm(); // Ejecuta la función pasada como parámetro
                            }
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    openCameraOverlayFrontal() {
        return __awaiter(this, void 0, void 0, function* () {
            //const modal 
            this.modalRef = yield this.modalController.create({
                component: CameraWithOverlayComponent,
                componentProps: {
                    text1: 'Coloca la parte frontal de tu DPI',
                    text2: '',
                    overlaySrc: './../../../../../assets/imagesIdvision/overlay_container.png',
                    onTakePicture: this.DpiFrontProccess.bind(this),
                    closeRequested: () => this.closeOverlay()
                },
                backdropDismiss: false,
            });
            yield this.modalRef.present();
        });
    }
    closeOverlay() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Modal cerrada desde el componente padre');
        });
    }
    closeModalOverlay() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('test');
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
                    overlaySrc: './../../../../../assets/imagesIdvision/overlay_container.png',
                    onTakePicture: this.DpiBackProccess.bind(this)
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
                // console.log('Archivo temporal recibido está vacío o no válido.');
                return;
            }
            //this.modalController.dismiss();
            yield this.VideoSelfieProcccess(file);
        });
    }
    openAcuerdoVideo() {
        return __awaiter(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: CamaraVideoSelfieComponent,
                componentProps: {
                    cssClass: 'my-custom-class',
                    text1: 'Video Selfie',
                    text2: 'Guatemala',
                    overlaySrc: 'assets/overlay-image.png',
                    backFunction: (file) => __awaiter(this, void 0, void 0, function* () {
                        // console.log('Video recibido en el padre:', file);
                        yield this.getBackModal(file);
                    }),
                },
                backdropDismiss: false,
            });
            yield modal.present();
        });
    }
}
IdVisionComponent.ɵfac = function IdVisionComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || IdVisionComponent)(i0.ɵɵdirectiveInject(i1.ModalController), i0.ɵɵdirectiveInject(i2.DpiService), i0.ɵɵdirectiveInject(i1.AlertController), i0.ɵɵdirectiveInject(i1.LoadingController), i0.ɵɵdirectiveInject(i1.Platform), i0.ɵɵdirectiveInject(i3.ModalDpiServices), i0.ɵɵdirectiveInject(i4.ModalVideoSelfieServices)); };
IdVisionComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: IdVisionComponent, selectors: [["app-id-vision"]], viewQuery: function IdVisionComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.dpi = _t.first);
    } }, standalone: true, features: [i0.ɵɵProvidersFeature([DpiService, ModalDpiServices, ModalVideoSelfieServices]), i0.ɵɵStandaloneFeature], decls: 102, vars: 0, consts: [["dpi", ""], ["init", "false"], [1, "content"], [1, "head"], [1, "p-justify"], [1, "rounded-input"], ["type", "number", "placeholder", "Digita tu n\u00FAmero de DPI"], [1, "verify-container"], [1, "image-container"], ["src", "./../../../assets/imagesIdvision/documentsImage.png", "alt", ""], [1, "container-text"], ["src", "./../../../assets/imagesIdvision/rostroImage.png", "alt", ""], [1, "fixed-footer"], ["expand", "block", 3, "click"], [1, "p-center", "p-info"], [1, "dpi-container"], ["autoplay", "", "loop", "", "muted", "", "width", "1280", "height", "300"], ["src", "./../../../assets/imagesIdvision/Dpi-Front.webm", "type", "video/webm"], ["src", "./../../../assets/imagesIdvision/Dpi-back.webm", "type", "video/webm"], ["src", "./../../../assets/imagesIdvision/Foco.png", "alt", ""], ["src", "./../../../assets/imagesIdvision/Selfie-rostro.png", "alt", ""], [1, "col-confirmation"], ["color", "white"], [1, "font-confirmation"], ["color", "white", 1, "image-item"], ["src", "./../../../assets/imagesIdvision/blue-check.png", "alt", ""]], template: function IdVisionComponent_Template(rf, ctx) { if (rf & 1) {
        const _r1 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "swiper-container", 1)(1, "swiper-slide")(2, "div", 2)(3, "div", 3)(4, "h2", 4);
        i0.ɵɵtext(5, "Verifiquemos tu identidad");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "p", 4);
        i0.ɵɵtext(7, "Para completar tu verificaci\u00F3n, por favor ingresa tu n\u00FAmero de identificaci\u00F3n (DPI).");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "ion-item", 5);
        i0.ɵɵelement(9, "ion-input", 6, 0);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(11, "ion-grid", 7)(12, "ion-row")(13, "ion-row")(14, "div", 8);
        i0.ɵɵelement(15, "img", 9);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(16, "div", 10)(17, "p");
        i0.ɵɵtext(18, "Sube fotos de documentos que prueben tu identidad");
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(19, "ion-row")(20, "ion-row")(21, "div", 8);
        i0.ɵɵelement(22, "img", 11);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "div", 10)(24, "p");
        i0.ɵɵtext(25, "Graba un video selfie mientras lees el texto en voz alta");
        i0.ɵɵelementEnd()()()()();
        i0.ɵɵelementStart(26, "div", 12)(27, "ion-button", 13);
        i0.ɵɵlistener("click", function IdVisionComponent_Template_ion_button_click_27_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.handleClick()); });
        i0.ɵɵtext(28, "Empecemos");
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(29, "swiper-slide")(30, "div", 2)(31, "div", 3)(32, "h2");
        i0.ɵɵtext(33, "Coloca la parte frontal de tu DPI");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(34, "p", 14);
        i0.ɵɵtext(35, " Evita sombras, reflejos y coloca tu documento dentro del recuadro. ");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(36, "div", 15)(37, "video", 16);
        i0.ɵɵelement(38, "source", 17);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(39, "div", 12)(40, "ion-button", 13);
        i0.ɵɵlistener("click", function IdVisionComponent_Template_ion_button_click_40_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.openCameraOverlayFrontal()); });
        i0.ɵɵtext(41, "Tomar una foto");
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(42, "swiper-slide")(43, "div", 2)(44, "div", 3)(45, "h2");
        i0.ɵɵtext(46, "Coloca el reverso de tu DPI");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(47, "p", 14);
        i0.ɵɵtext(48, " Evita sombras, reflejos y coloca tu documento dentro del recuadro.");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(49, "div", 15)(50, "video", 16);
        i0.ɵɵelement(51, "source", 18);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(52, "div", 12)(53, "ion-button", 13);
        i0.ɵɵlistener("click", function IdVisionComponent_Template_ion_button_click_53_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.openCameraOverlayTrasero()); });
        i0.ɵɵtext(54, "Tomar una foto");
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(55, "swiper-slide")(56, "div", 2)(57, "div", 3)(58, "h2");
        i0.ɵɵtext(59, "Video Selfie");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(60, "p", 4);
        i0.ɵɵtext(61, "Graba un breve video para completar tu proceso de identificaci\u00F3n.");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(62, "ion-grid", 7);
        i0.ɵɵelement(63, "br")(64, "br")(65, "br");
        i0.ɵɵelementStart(66, "ion-row")(67, "ion-row")(68, "div", 8);
        i0.ɵɵelement(69, "img", 19);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(70, "div", 10)(71, "p");
        i0.ɵɵtext(72, " Si est\u00E1s en interiores, aseg\u00FArate de que la luz est\u00E9 frente a ti, no detr\u00E1s. ");
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(73, "ion-row")(74, "ion-row")(75, "div", 8);
        i0.ɵɵelement(76, "img", 11);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(77, "div", 10)(78, "p");
        i0.ɵɵtext(79, " Aseg\u00FArate de que tu rostro sea visible y de no usar anteojos ni sombreros. ");
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(80, "ion-row")(81, "ion-row")(82, "div", 8);
        i0.ɵɵelement(83, "img", 20);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(84, "div", 10)(85, "p");
        i0.ɵɵtext(86, " Activa la c\u00E1mara frontal y verifica que tu rostro est\u00E9 bien centrado.. ");
        i0.ɵɵelementEnd()()()()();
        i0.ɵɵelementStart(87, "div", 12)(88, "ion-button", 13);
        i0.ɵɵlistener("click", function IdVisionComponent_Template_ion_button_click_88_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.openAcuerdoVideo()); });
        i0.ɵɵtext(89, "Abrir la c\u00E1mara");
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(90, "swiper-slide")(91, "div", 2)(92, "ion-col", 21)(93, "ion-item", 22)(94, "p", 23);
        i0.ɵɵtext(95, " Informaci\u00F3n procesada de manera correcta ");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(96, "ion-item", 24);
        i0.ɵɵelement(97, "img", 25);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(98, "ion-item", 22)(99, "div", 12)(100, "ion-button", 13);
        i0.ɵɵlistener("click", function IdVisionComponent_Template_ion_button_click_100_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.handleGetInit()); });
        i0.ɵɵtext(101, "Salir");
        i0.ɵɵelementEnd()()()()()();
    } }, dependencies: [IonicModule, i1.IonButton, i1.IonCol, i1.IonGrid, i1.IonInput, i1.IonItem, i1.IonRow, i1.NumericValueAccessor, CommonModule], styles: [".content[_ngcontent-%COMP%] {\n    padding: 10px;\n    align-items: center;\n    justify-content: center;\n    height: 100vh;\n    background-color: #fff;\n    font-size: 18px;\n    background-image: url('/assets/imagesIdvision/background.png');\n\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-position: center;\n    \n}\n\n\nh2[_ngcontent-%COMP%] {\n    font-size: 1.5em;\n    font-weight: bold;\n    color: var(--orange-primary);\n    text-align: center;\n    margin-top: 20px;\n  }\n  \n  p[_ngcontent-%COMP%] {\n    font-size: 1em;\n    color: #666;\n    text-align: center;\n    margin: 0;\n  }\n  \n  ion-grid[_ngcontent-%COMP%] {\n    margin-top: 20px;\n  }\n  \n  ion-row[_ngcontent-%COMP%] {\n    margin: 15px 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n  \n  ion-col[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    text-align: center;\n  }\n  \n  ion-icon[_ngcontent-%COMP%] {\n    font-size: 3em; // Tama\u00F1o del \u00EDcono para que sea m\u00E1s destacado\n    color: #ff8c00; // Color similar al amarillo-naranja\n    margin-bottom: 10px;\n  }\n  \n  //Boton\n[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n    color: #ffffff;\n    font-weight: 50px;\n    border-radius: 20px;\n    margin-top: 20px;\n    //width: 90%;\n    //max-width: 300px;\n    align-self: center;\n    text-transform: none;\n\n    --background: var(--purple-primary);\n    --background-hover: var(--purple-secondary);\n    --background-activated: var(--purple-secondary);\n    --background-focused: var(--purple-secondary);\n  \n    --color: var(--purple-primary);\n  \n    --border-radius: 20px;\n    --border-color: var(--purple-primary);\n    --border-style: solid;\n    --border-width: 1px;\n  \n    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n  \n    --ripple-color: var(--purple-secondary);\n  \n    --padding-top: 10px;\n    --padding-bottom: 10px;\n  }\n\n.container-text[_ngcontent-%COMP%] {\n  text-align: justify !important;\n    width: 180px;\n}\n\np[_ngcontent-%COMP%] {\n  text-align: start;\n}\n\n.p-center[_ngcontent-%COMP%]{\ntext-align: center;\n}\n\n.p-justify[_ngcontent-%COMP%]{\n  text-align: start;\n  }\n\n.head[_ngcontent-%COMP%] {\n    padding: 30px;\n    margin-top: 75px;\n    margin-bottom: 20px;\n}\n\n\n.verify-container[_ngcontent-%COMP%] {\n   // padding: 60px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    height: 40%; // Ocupa todo el espacio disponible en el ion-content\n    text-align: center;\n    //background-color: black;\n}\n\n.fixed-footer[_ngcontent-%COMP%] {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    padding: 0px 10px 25px 10px;\n    // background-color: black; // Color de fondo, opcional\n   // box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); // Sombra suave para que resalte\n  \n    ion-button {\n      width: 90%;\n      max-width: 300px;\n      margin: 0 auto;\n      background-color: #ffcc00;\n      color: #ffffff;\n      font-weight: bold;\n      border-radius: 20px;\n  \n      &:hover {\n        background-color: #ffb300;\n      }\n  \n      &:active {\n        background-color: #e6a800;\n      }\n    }\n  }\n\n  .dpi-container[_ngcontent-%COMP%] {\n    display: flex;\n    //width: 100%;\n    justify-content: center;\n    align-items: center;\n    height: 50vh;\n  }\n.dpi-image[_ngcontent-%COMP%] {\n    width: 200px;\n}\n\n.image-container[_ngcontent-%COMP%] {\n    width: 100px;\n    max-width: 90px;\n}\n\n.col-confirmation[_ngcontent-%COMP%] {\n  margin-top: 100px;\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 20px; \n\n}\n\n.image-item[_ngcontent-%COMP%] {\n  margin-top: 50px;\n  padding-top: 70px;\n}\n\n.font-confirmation[_ngcontent-%COMP%] {\n  font-size: 26px;\n  text-align: center;\n  // color: #005da9;\n  color: var(--purple-primary);\n  font-weight: bold;\n}\n\n\n.rounded-input[_ngcontent-%COMP%] {\n  margin-top: 15px;\n  background-color: #f4f6fc; \n\n  border-radius: 10px; \n\n  padding: 5px 5px; \n\n  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); \n\n  --ion-border-color: transparent; \n\n}\n\nion-input[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--orange-primary);\n  --padding-start: 8px;\n}\n\n.custom-footer[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  padding: 10px;\n  display: flex;\n  justify-content: space-between; \n\n  background-color: #ffffff; \n\n  //box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); \n\n}\n\n.custom-footer[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  flex: 0 0 48%; \n\n}\n\n.custom-footer[_ngcontent-%COMP%]   .left-button[_ngcontent-%COMP%] {\n  max-width: 140px;\n  color: black;\n\n  --background: white;\n\n  --color: var(--purple-primary);\n\n  --border-radius: 20px;\n  --border-color: white;\n  margin-right: auto; \n\n  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.0);\n\n}\n\n.custom-footer[_ngcontent-%COMP%]   .right-button[_ngcontent-%COMP%] {\n  margin-left: auto; \n\n}\n\n.tutorial-head[_ngcontent-%COMP%] {\n  padding-top:50px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: black;\n}\n\n.center-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 60vh; \n\n  width: 100%;\n}\n\n.tutorial-title[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.rounded-input[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n  font-size: 14px; \n\n  color: #333; \n\n}\n\n.rounded-input[_ngcontent-%COMP%]::part(native) {\n  background: transparent; \n\n}\n\n.p-info[_ngcontent-%COMP%]{\n  font-weight: bold;\n  color: #714e93\n}"] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IdVisionComponent, [{
        type: Component,
        args: [{ selector: 'app-id-vision', standalone: true, schemas: [CUSTOM_ELEMENTS_SCHEMA], imports: [IonicModule, CommonModule, CustomSlideComponent], providers: [DpiService, ModalDpiServices, ModalVideoSelfieServices], template: "<swiper-container init=\"false\">\n  <swiper-slide>\n    <div class=\"content\">\n      <div class=\"head\">\n        <h2 class=\"p-justify\">Verifiquemos tu identidad</h2>\n        <p class=\"p-justify\">Para completar tu verificaci\u00F3n, por favor ingresa tu n\u00FAmero de identificaci\u00F3n (DPI).</p>\n\n        <ion-item class=\"rounded-input\">\n          <ion-input #dpi type=\"number\" placeholder=\"Digita tu n\u00FAmero de DPI\"></ion-input>\n        </ion-item>\n\n      </div>\n      <ion-grid class=\"verify-container\">\n        <ion-row>\n          <ion-row>\n            <div class=\"image-container\">\n              <img src=\"./../../../assets/imagesIdvision/documentsImage.png\" alt=\"\" />\n            </div>\n            <div class=\"container-text\">\n              <p>Sube fotos de documentos que prueben tu identidad</p>\n            </div>\n          </ion-row>\n        </ion-row>\n        <ion-row>\n          <ion-row>\n            <div class=\"image-container\">\n              <img src=\"./../../../assets/imagesIdvision/rostroImage.png\" alt=\"\" />\n            </div>\n            <div class=\"container-text\">\n              <p>Graba un video selfie mientras lees el texto en voz alta</p>\n            </div>\n          </ion-row>\n        </ion-row>\n      </ion-grid>\n\n      <div class=\"fixed-footer\">\n        <!-- <app-custom-button\n          text=\"Click Me\"\n          color=\"secondary\"\n          [disabled]=\"false\"\n          icon=\"star\"\n          [showIcon]=\"true\"\n          (clicked)=\"handleClick()\"\n        ></app-custom-button> -->\n        <ion-button expand=\"block\" (click)=\"handleClick()\">Empecemos</ion-button>\n      </div>\n      <!-- <app-slide1></app-slide1> -->\n    </div>\n  </swiper-slide>\n\n  <!-- <swiper-slide>\n    <div class=\"content\">\n      <div class=\"tutorial-head\">\n        <h3 class=\"tutorial-title\">Posiciona tu DPI dentro del marco</h3>\n      </div>\n      <div class=\"center-container\">\n        <video autoplay loop muted width=\"1280\" height=\"300\">\n          <source src=\"./../../../assets/imagesIdvision/Animacion-de-como-tomar-foto-DPI.webm\" type=\"video/webm\">\n        </video>\n      </div>\n\n\n      <div class=\"fixed-footer\">\n        <ion-button expand=\"block\" (click)=\"handleNext()\" class=\"right-button\">\n          Siguiente\n        </ion-button>\n      </div>\n      <div class=\"custom-footer\">\n        <ion-button expand=\"block\" (click)=\"handleSkipTutorial()\" class=\"left-button\">\n          Saltar\n        </ion-button>\n        <ion-button expand=\"block\" (click)=\"handleNext()\" class=\"right-button\">\n          Siguiente\n        </ion-button>\n      </div>\n    </div>\n  </swiper-slide>\n   -->\n  <!-- <swiper-slide>\n    <div class=\"content\">\n      <div class=\"tutorial-head\">\n        <h3 class=\"tutorial-title\">Evita sombras o reflejos</h3>\n      </div>\n\n      <div class=\"center-container\">\n        <app-custom-slide\n        [image1]=\"tutoImage3\" [image2]=\"tutoImage4\">\n        </app-custom-slide>\n      </div>\n\n\n      <div class=\"custom-footer\">\n        <ion-button expand=\"block\" (click)=\"handleSkipTutorial()\" class=\"left-button\">\n          Saltar\n        </ion-button>\n        <ion-button expand=\"block\" (click)=\"handleNext()\" class=\"right-button\">\n          Siguiente\n        </ion-button>\n      </div>\n    </div>\n  </swiper-slide> -->\n  <!-- <swiper-slide>\n    <div class=\"content\">\n      <div class=\"tutorial-head\">\n        <h3 class=\"tutorial-title\">Aseg\u00FArate que tu DPI se lea correctamente</h3>\n\n      </div>\n\n      <div class=\"center-container\">\n        <app-custom-slide\n        [image1]=\"tutoImage3\" [image2]=\"tutoImage4\">\n        </app-custom-slide>\n      </div>\n\n\n      <div class=\"custom-footer\">\n        <ion-button expand=\"block\" (click)=\"handleSkipTutorial()\" class=\"left-button\">\n          Saltar\n        </ion-button>\n        <ion-button expand=\"block\" (click)=\"handleNext()\" class=\"right-button\">\n          Siguiente\n        </ion-button>\n      </div>\n    </div>\n  </swiper-slide> -->\n  <!-- <swiper-slide>\n    <div class=\"content\">\n      <div class=\"tutorial-head\">\n        <h3 class=\"tutorial-title\">Aseg\u00FArate que la informaci\u00F3n sea legible</h3>\n      </div>\n\n      <div class=\"center-container\">\n        <app-custom-slide\n        [image1]=\"tutoImage3\" [image2]=\"tutoImage4\">\n        </app-custom-slide>\n      </div>\n\n\n      <div class=\"custom-footer\">\n        <ion-button expand=\"block\" (click)=\"handleSkipTutorial()\" class=\"left-button\">\n          Saltar\n        </ion-button>\n        <ion-button expand=\"block\" (click)=\"handleNext()\" class=\"right-button\">\n          Siguiente\n        </ion-button>\n      </div>\n    </div>\n  </swiper-slide> -->\n  <swiper-slide>\n    <div class=\"content\">\n      <div class=\"head\">\n        <h2>Coloca la parte frontal de tu DPI</h2>\n        <p class=\"p-center p-info\">\n          Evita sombras, reflejos y coloca tu documento dentro del recuadro.\n        </p>\n       \n      </div>\n      <div class=\"dpi-container\">\n        <video autoplay loop muted width=\"1280\" height=\"300\">\n          <source src=\"./../../../assets/imagesIdvision/Dpi-Front.webm\" type=\"video/webm\">\n        </video>\n\n        <!-- <ion-img class=\"dpi-image\" src=\"./../../../assets/imagesIdvision/frontDpiRegister.png\"></ion-img> -->\n      </div>\n      <!-- <p class=\"p-center\">Frontal</p> -->\n\n      <div class=\"fixed-footer\">\n        <!-- <app-custom-button\n          text=\"Click Me\"\n          color=\"secondary\"\n          [disabled]=\"false\"\n          icon=\"star\"\n          [showIcon]=\"true\"\n          (clicked)=\"handleClick()\"\n        ></app-custom-button> -->\n        <ion-button expand=\"block\" (click)=\"openCameraOverlayFrontal()\">Tomar una foto</ion-button>\n      </div>\n      <!-- <app-slide2></app-slide2> -->\n    </div>\n  </swiper-slide>\n  <swiper-slide>\n    <div class=\"content\">\n      <div class=\"head\">\n        <h2>Coloca el reverso de tu DPI</h2>\n        <p class=\"p-center p-info\">\n          Evita sombras, reflejos y coloca tu documento dentro del recuadro.</p>\n      </div>\n      <div class=\"dpi-container\">\n        <video autoplay loop muted width=\"1280\" height=\"300\">\n          <source src=\"./../../../assets/imagesIdvision/Dpi-back.webm\" type=\"video/webm\">\n        </video>\n\n        <!-- <ion-img class=\"dpi-image\" src=\"./../../../assets/imagesIdvision/backDpiRegister.png\"></ion-img> -->\n      </div>\n      <!-- <p class=\"p-center\">Trasero</p> -->\n\n      <div class=\"fixed-footer\">\n        <!-- <app-custom-button\n          text=\"Click Me\"\n          color=\"secondary\"\n          [disabled]=\"false\"\n          icon=\"star\"\n          [showIcon]=\"true\"\n          (clicked)=\"handleClick()\"\n        ></app-custom-button> -->\n        <ion-button expand=\"block\" (click)=\"openCameraOverlayTrasero()\">Tomar una foto</ion-button>\n      </div>\n      <!-- <app-slide2></app-slide2> -->\n    </div>\n  </swiper-slide>\n  <swiper-slide>\n    <div class=\"content\">\n      <div class=\"head\">\n        <h2>Video Selfie</h2>\n        <p class=\"p-justify\">Graba un breve video para completar tu proceso de identificaci\u00F3n.</p>\n      </div>\n      <ion-grid class=\"verify-container\">\n        <br/>\n        <br/>\n        <br/>\n        <ion-row>\n          <ion-row>\n            <div class=\"image-container\">\n              <img src=\"./../../../assets/imagesIdvision/Foco.png\" alt=\"\" />\n              <!-- <img src=\"./../../../assets/imagesIdvision/rostroImage.png\" alt=\"\" /> -->\n            </div>\n            <div class=\"container-text\">\n              <p>\n                Si est\u00E1s en interiores, aseg\u00FArate de que la luz est\u00E9 frente a ti, no detr\u00E1s.\n              </p>\n            </div>\n          </ion-row>\n        </ion-row>\n        <ion-row>\n          <ion-row>\n            <div class=\"image-container\">\n              <img src=\"./../../../assets/imagesIdvision/rostroImage.png\" alt=\"\" />\n            </div>\n            <div class=\"container-text\">\n              <p>\n                Aseg\u00FArate de que tu rostro sea visible y de no usar anteojos ni\n                sombreros.\n              </p>\n            </div>\n          </ion-row>\n        </ion-row>\n        <ion-row>\n          <ion-row>\n            <div class=\"image-container\">\n              <img src=\"./../../../assets/imagesIdvision/Selfie-rostro.png\" alt=\"\" />\n            </div>\n            <div class=\"container-text\">\n              <p>\n                Activa la c\u00E1mara frontal y verifica que tu rostro est\u00E9 bien centrado..\n              </p>\n            </div>\n          </ion-row>\n        </ion-row>\n      </ion-grid>\n\n      <div class=\"fixed-footer\">\n        <!-- <app-custom-button\n          text=\"Click Me\"\n          color=\"secondary\"\n          [disabled]=\"false\"\n          icon=\"star\"\n          [showIcon]=\"true\"\n          (clicked)=\"handleClick()\"\n        ></app-custom-button> -->\n        <ion-button expand=\"block\" (click)=\"openAcuerdoVideo()\">Abrir la c\u00E1mara</ion-button>\n      </div>\n    </div>\n  </swiper-slide>\n  <swiper-slide>\n    <div class=\"content\">\n      <ion-col class=\"col-confirmation\">\n        <ion-item color=\"white\">\n          <p class=\"font-confirmation\">\n            Informaci\u00F3n procesada de manera correcta\n          </p>\n        </ion-item>\n        <ion-item color=\"white\" class=\"image-item\">\n          <img src=\"./../../../assets/imagesIdvision/blue-check.png\" alt=\"\" />\n        </ion-item>\n      </ion-col>\n      <ion-item color=\"white\">\n        <div class=\"fixed-footer\">\n          <!-- <app-custom-button\n            text=\"Click Me\"\n            color=\"secondary\"\n            [disabled]=\"false\"\n            icon=\"star\"\n            [showIcon]=\"true\"\n            (clicked)=\"handleClick()\"\n          ></app-custom-button> -->\n          <ion-button expand=\"block\" (click)=\"handleGetInit()\">Salir</ion-button>\n        </div>\n      </ion-item>\n    </div>\n  </swiper-slide>\n</swiper-container>", styles: ["\n.content {\n    padding: 10px;\n    align-items: center;\n    justify-content: center;\n    height: 100vh;\n    background-color: #fff;\n    font-size: 18px;\n    background-image: url('/assets/imagesIdvision/background.png');\n\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-position: center;\n    \n}\n\n\nh2 {\n    font-size: 1.5em;\n    font-weight: bold;\n    color: var(--orange-primary);\n    text-align: center;\n    margin-top: 20px;\n  }\n  \n  p {\n    font-size: 1em;\n    color: #666;\n    text-align: center;\n    margin: 0;\n  }\n  \n  ion-grid {\n    margin-top: 20px;\n  }\n  \n  ion-row {\n    margin: 15px 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n  \n  ion-col {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    text-align: center;\n  }\n  \n  ion-icon {\n    font-size: 3em; // Tama\u00F1o del \u00EDcono para que sea m\u00E1s destacado\n    color: #ff8c00; // Color similar al amarillo-naranja\n    margin-bottom: 10px;\n  }\n  \n  //Boton\n  ion-button {\n    color: #ffffff;\n    font-weight: 50px;\n    border-radius: 20px;\n    margin-top: 20px;\n    //width: 90%;\n    //max-width: 300px;\n    align-self: center;\n    text-transform: none;\n\n    --background: var(--purple-primary);\n    --background-hover: var(--purple-secondary);\n    --background-activated: var(--purple-secondary);\n    --background-focused: var(--purple-secondary);\n  \n    --color: var(--purple-primary);\n  \n    --border-radius: 20px;\n    --border-color: var(--purple-primary);\n    --border-style: solid;\n    --border-width: 1px;\n  \n    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);\n  \n    --ripple-color: var(--purple-secondary);\n  \n    --padding-top: 10px;\n    --padding-bottom: 10px;\n  }\n\n.container-text {\n  text-align: justify !important;\n    width: 180px;\n}\n\np {\n  text-align: start;\n}\n\n.p-center{\ntext-align: center;\n}\n\n.p-justify{\n  text-align: start;\n  }\n\n.head {\n    padding: 30px;\n    margin-top: 75px;\n    margin-bottom: 20px;\n}\n\n\n.verify-container {\n   // padding: 60px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    height: 40%; // Ocupa todo el espacio disponible en el ion-content\n    text-align: center;\n    //background-color: black;\n}\n\n.fixed-footer {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    padding: 0px 10px 25px 10px;\n    // background-color: black; // Color de fondo, opcional\n   // box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); // Sombra suave para que resalte\n  \n    ion-button {\n      width: 90%;\n      max-width: 300px;\n      margin: 0 auto;\n      background-color: #ffcc00;\n      color: #ffffff;\n      font-weight: bold;\n      border-radius: 20px;\n  \n      &:hover {\n        background-color: #ffb300;\n      }\n  \n      &:active {\n        background-color: #e6a800;\n      }\n    }\n  }\n\n  .dpi-container {\n    display: flex;\n    //width: 100%;\n    justify-content: center;\n    align-items: center;\n    height: 50vh;\n  }\n.dpi-image {\n    width: 200px;\n}\n\n.image-container {\n    width: 100px;\n    max-width: 90px;\n}\n\n.col-confirmation {\n  margin-top: 100px;\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 20px; /* Ajusta el espacio entre los elementos */\n}\n\n.image-item {\n  margin-top: 50px;\n  padding-top: 70px;\n}\n\n.font-confirmation {\n  font-size: 26px;\n  text-align: center;\n  // color: #005da9;\n  color: var(--purple-primary);\n  font-weight: bold;\n}\n\n\n.rounded-input {\n  margin-top: 15px;\n  background-color: #f4f6fc; /* Color de fondo suave */\n  border-radius: 10px; /* Bordes redondeados */\n  padding: 5px 5px; /* Espaciado interno */\n  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombra suave */\n  --ion-border-color: transparent; /* Quita cualquier borde por defecto */\n}\n\nion-input {\n  text-align: center;\n  color: var(--orange-primary);\n  --padding-start: 8px;\n}\n\n.custom-footer {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  padding: 10px;\n  display: flex;\n  justify-content: space-between; /* Alinea los botones a los extremos */\n  background-color: #ffffff; /* Fondo opcional */\n  //box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); /* Sombra opcional */\n}\n\n.custom-footer ion-button {\n  flex: 0 0 48%; /* Los botones ocupan casi la mitad del espacio */\n}\n\n.custom-footer .left-button {\n  max-width: 140px;\n  color: black;\n\n  --background: white;\n\n  --color: var(--purple-primary);\n\n  --border-radius: 20px;\n  --border-color: white;\n  margin-right: auto; /* Opcional si necesitas ajustes de margen */\n  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.0);\n\n}\n\n.custom-footer .right-button {\n  margin-left: auto; /* Opcional si necesitas ajustes de margen */\n}\n\n.tutorial-head {\n  padding-top:50px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: black;\n}\n\n.center-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 60vh; /* Ajusta este valor si quieres m\u00E1s o menos espacio vertical */\n  width: 100%;\n}\n\n.tutorial-title {\n  text-align: center;\n}\n\n.rounded-input ion-input {\n  font-size: 14px; /* Tama\u00F1o de texto */\n  color: #333; /* Color del texto */\n}\n\n.rounded-input::part(native) {\n  background: transparent; /* Fondo transparente para evitar conflictos */\n}\n\n.p-info{\n  font-weight: bold;\n  color: #714e93\n}"] }]
    }], () => [{ type: i1.ModalController }, { type: i2.DpiService }, { type: i1.AlertController }, { type: i1.LoadingController }, { type: i1.Platform }, { type: i3.ModalDpiServices }, { type: i4.ModalVideoSelfieServices }], { dpi: [{
            type: ViewChild,
            args: ['dpi', { static: false }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(IdVisionComponent, { className: "IdVisionComponent" }); })();
//# sourceMappingURL=id-vision.component.js.map