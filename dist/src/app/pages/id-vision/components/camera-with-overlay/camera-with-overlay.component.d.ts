import { AfterViewInit, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ModalDpiServices } from '../../services/modal-services/modal-dpi-services';
import * as i0 from "@angular/core";
export declare class CameraWithOverlayComponent implements AfterViewInit, OnDestroy {
    private platform;
    private modalController;
    private modaldpiServices;
    videoElement: ElementRef<HTMLVideoElement>;
    text1: string;
    text2: string;
    overlaySrc: string;
    onTakePicture: (file: File) => Promise<boolean>;
    closeRequested: EventEmitter<void>;
    stream: MediaStream | null;
    isLoading: boolean;
    private readonly isAndroid;
    private readonly isIOS;
    constructor(platform: Platform, modalController: ModalController, modaldpiServices: ModalDpiServices);
    ngAfterViewInit(): Promise<void>;
    ngOnDestroy(): void;
    private requestPermissions;
    /** Muestra en consola cada videoinput encontrado (para debug). */
    private logAvailableCams;
    /**
     * Selecciona la cámara trasera con varios intentos:
     * 1) facingMode:'environment' exact.
     * 2) Recorre todas y acepta la primera cuyo facingMode !== 'user'.
     * 3) Si hay ≥2 cámaras, prueba la segunda (suele ser trasera).
     * 4) Fallback: primera cámara disponible.
     */
    private selectRearCamera;
    private attachStream;
    capturePhoto(): Promise<void>;
    private stopCamera;
    closeOverlay(): void;
    resumeCamera(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CameraWithOverlayComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CameraWithOverlayComponent, "app-camera-overlay", never, { "text1": { "alias": "text1"; "required": false; }; "text2": { "alias": "text2"; "required": false; }; "overlaySrc": { "alias": "overlaySrc"; "required": false; }; "onTakePicture": { "alias": "onTakePicture"; "required": false; }; }, { "closeRequested": "closeRequested"; }, never, never, false, never>;
}
//# sourceMappingURL=camera-with-overlay.component.d.ts.map