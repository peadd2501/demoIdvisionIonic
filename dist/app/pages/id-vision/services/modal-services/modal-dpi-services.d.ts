export declare class ModalDpiServices {
    private closeOverlaySubject;
    private resumeCameraSubject;
    closeOverlay$: import("rxjs").Observable<void>;
    resumeCameraSubject$: import("rxjs").Observable<void>;
    requestCloseOverlay(): void;
    requestResumeCamera(): void;
}
