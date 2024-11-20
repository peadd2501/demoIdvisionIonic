import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, signal, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { CameraWithOverlayComponent } from './components/camera-with-overlay/camera-with-overlay.component';
import { CamaraVideoSelfieComponent } from './components/camara-video-selfie/camara-video-selfie.component';
import { CustomSlideComponent } from './components/custom-slide/custom-slide.component';
register();
let IdVisionComponent = class IdVisionComponent {
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
        this.swiperElement()?.initialize();
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
    async handleSlide(slide) {
        setTimeout(() => {
            if (this.swiperElement()?.swiper) {
                this.swiperElement()?.swiper.slideTo(slide);
            }
        }, 300);
    }
    handleGetInit() {
        this.swiperElement()?.swiper?.slideTo(0);
    }
    handleSkipTutorial() {
        this.swiperElement()?.swiper?.slideTo(5);
    }
    handleNext() {
        this.swiperElement()?.swiper?.slideNext();
    }
    async InitProccess() {
        let loader = null;
        try {
            loader = await this.loadingController.create({
                message: 'Procesando...',
                spinner: 'crescent'
            });
            await loader.present();
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
    }
    async DpiFrontProccess(filePath) {
        let loader = null;
        try {
            // Muestra el loader
            loader = await this.loadingController.create({
                message: 'Procesando...',
                spinner: 'crescent'
            });
            await loader.present();
            console.log('enviando DPI front');
            const file = await this.convertImagePathToFile(filePath, 'imagen_temporal.jpg');
            console.log('Archivo temporal creado:', file);
            const codigo = localStorage.getItem('codigo') ?? "";
            await this.dpiService.uploadFrontDPI(file, codigo).subscribe({
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
    async convertImagePathToFile(imagePath, fileName) {
        const response = await fetch(imagePath);
        const blob = await response.blob();
        return new File([blob], fileName, { type: blob.type });
    }
    async DpiBackProccess(filePath) {
        let loader = null;
        try {
            // Muestra el loader
            loader = await this.loadingController.create({
                message: 'Procesando...',
                spinner: 'crescent'
            });
            await loader.present();
            const file = await this.convertImagePathToFile(filePath, 'imagen_temporal_back.jpg');
            // console.log('Archivo temporal creado:', file);
            const codigo = localStorage.getItem('codigo') ?? "";
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
    }
    async VideoSelfieProcccess(file) {
        let loader = null;
        try {
            loader = await this.loadingController.create({
                message: 'Procesando...',
                spinner: 'crescent'
            });
            await loader.present();
            // const file = await this.convertImagePathToFile(filePath, this.isIOS ? 'video_selfie.mp4' : 'video_selfie.webm',);
            // console.log('Archivo temporal creado:', file);
            const codigo = localStorage.getItem('codigo') ?? "";
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
    }
    async validateDPIFront(filePath) {
        await this.DpiFrontProccess(filePath);
        return true;
    }
    async showAlert(header, message, details, onConfirm, subMessage) {
        const detailsMessage = details
            ? details.map(detail => `${detail}           `).join('')
            : '';
        const fullMessage = message + (detailsMessage ? `${detailsMessage}` : '');
        const alert = await this.alertController.create({
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
        await alert.present();
    }
    async openCameraOverlayFrontal() {
        //const modal 
        this.modalRef = await this.modalController.create({
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
        await this.modalRef.present();
    }
    async closeOverlay() {
        console.log('Modal cerrada desde el componente padre');
    }
    async closeModalOverlay() {
        console.log('test');
    }
    //Trasero dpi services
    async validateDPIBack(filePath) {
        this.modalController.dismiss();
        await this.DpiBackProccess(filePath);
        return true;
    }
    async openCameraOverlayTrasero() {
        const modal = await this.modalController.create({
            component: CameraWithOverlayComponent,
            componentProps: {
                text1: 'Coloca el reverso de tu DPI',
                text2: '',
                overlaySrc: './../../../../../assets/imagesIdvision/overlay_container.png',
                onTakePicture: this.DpiBackProccess.bind(this)
            },
            backdropDismiss: false,
        });
        await modal.present();
        const { data } = await modal.onWillDismiss();
        if (data && data.executeFuncion) {
            // Ejecutar la función que se recibió de la modal
            data.executeFuncion();
        }
    }
    async getBackModal(file) {
        if (!file || file.size === 0) {
            // console.log('Archivo temporal recibido está vacío o no válido.');
            return;
        }
        //this.modalController.dismiss();
        await this.VideoSelfieProcccess(file);
    }
    async openAcuerdoVideo() {
        const modal = await this.modalController.create({
            component: CamaraVideoSelfieComponent,
            componentProps: {
                cssClass: 'my-custom-class',
                text1: 'Video Selfie',
                text2: 'Guatemala',
                overlaySrc: 'assets/overlay-image.png',
                backFunction: async (file) => {
                    // console.log('Video recibido en el padre:', file);
                    await this.getBackModal(file);
                },
            },
            backdropDismiss: false,
        });
        await modal.present();
    }
};
__decorate([
    ViewChild('dpi', { static: false })
], IdVisionComponent.prototype, "dpi", void 0);
IdVisionComponent = __decorate([
    Component({
        selector: 'app-id-vision',
        standalone: true,
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [IonicModule, CommonModule, CustomSlideComponent],
        templateUrl: './id-vision.component.html',
        styleUrls: ['./id-vision.component.scss'],
    })
], IdVisionComponent);
export { IdVisionComponent };
//# sourceMappingURL=id-vision.component.js.map