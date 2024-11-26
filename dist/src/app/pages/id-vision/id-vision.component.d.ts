import { AfterViewInit, OnInit } from '@angular/core';
import { AlertController, IonInput, LoadingController, ModalController, Platform } from '@ionic/angular';
import { SwiperContainer } from 'swiper/element/bundle';
import { DpiService } from './services/dpi/dpi-service.service';
import { ModalDpiServices } from './services/modal-services/modal-dpi-services';
import { ModalVideoSelfieServices } from './services/modal-services/modal-video-selfie-services';
import * as i0 from "@angular/core";
export declare class IdVisionComponent implements OnInit, AfterViewInit {
    private modalController;
    private dpiService;
    private alertController;
    private loadingController;
    private platform;
    private modalDpiServices;
    private modalVideoSelfieServices;
    dpi: IonInput;
    private isAndroid;
    private isIOS;
    tutoImage1: string;
    tutoImage2: string;
    tutoImage3: string;
    tutoImage4: string;
    constructor(modalController: ModalController, dpiService: DpiService, alertController: AlertController, loadingController: LoadingController, platform: Platform, modalDpiServices: ModalDpiServices, modalVideoSelfieServices: ModalVideoSelfieServices);
    swiperElement: import("@angular/core").WritableSignal<SwiperContainer | null>;
    private modalRef;
    isSwipe: boolean;
    dpiCode: string;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    handleClick(): void;
    handleSlide(slide: number): Promise<void>;
    handleGetInit(): void;
    handleSkipTutorial(): void;
    handleNext(): void;
    InitProccess(): Promise<void>;
    DpiFrontProccess(filePath: string): Promise<void>;
    closeModalFromParent(): void;
    closeModalVideoSelfie(): void;
    resumeCameraFromParent(): void;
    convertImagePathToFile(imagePath: string, fileName: string): Promise<File>;
    DpiBackProccess(filePath: string): Promise<void>;
    VideoSelfieProcccess(file: File): Promise<void>;
    validateDPIFront(filePath: string): Promise<boolean>;
    private showAlert;
    openCameraOverlayFrontal(): Promise<void>;
    closeOverlay(): Promise<void>;
    closeModalOverlay(): Promise<void>;
    validateDPIBack(filePath: string): Promise<boolean>;
    openCameraOverlayTrasero(): Promise<void>;
    getBackModal(file: File): Promise<void>;
    openAcuerdoVideo(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<IdVisionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IdVisionComponent, "app-id-vision", never, { "isSwipe": { "alias": "isSwipe"; "required": false; }; "dpiCode": { "alias": "dpiCode"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=id-vision.component.d.ts.map