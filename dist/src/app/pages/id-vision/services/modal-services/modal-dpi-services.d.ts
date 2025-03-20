import * as i0 from "@angular/core";
export declare class ModalDpiServices {
    private closeOverlaySubject;
    private resumeCameraSubject;
    private closeModalAndChangeBrightness;
    private closePhotoSelfieSubject;
    private resumePhotoSubject;
    private closeModalAcuerdoVideo;
    closeOverlay$: import("rxjs").Observable<void>;
    resumeCameraSubject$: import("rxjs").Observable<void>;
    closeModalAndChangeBrightness$: import("rxjs").Observable<void>;
    closePhotoSelfieSubject$: import("rxjs").Observable<void>;
    resumePhotoSubject$: import("rxjs").Observable<void>;
    closeModalAcuerdoVideo$: import("rxjs").Observable<void>;
    requestCloseOverlay(): void;
    requestResumeCamera(): void;
    requestCloseModalAndBrightness(): void;
    requestCloseModalAcuerdoVideo(): void;
    requestClosePhotoSelfieSubject(): void;
    requestResumePhotoSubject(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalDpiServices, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ModalDpiServices>;
}
//# sourceMappingURL=modal-dpi-services.d.ts.map