import * as i0 from "@angular/core";
export declare class ModalDpiServices {
    private closeOverlaySubject;
    private resumeCameraSubject;
    private closeModalAndChangeBrightness;
    closeOverlay$: import("rxjs").Observable<void>;
    resumeCameraSubject$: import("rxjs").Observable<void>;
    closeModalAndChangeBrightness$: import("rxjs").Observable<void>;
    requestCloseOverlay(): void;
    requestResumeCamera(): void;
    requestCloseModalAndBrightness(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalDpiServices, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ModalDpiServices>;
}
//# sourceMappingURL=modal-dpi-services.d.ts.map