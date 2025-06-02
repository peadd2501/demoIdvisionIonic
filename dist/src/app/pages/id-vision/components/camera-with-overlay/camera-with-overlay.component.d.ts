import { AfterViewInit, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ModalDpiServices } from '../../services/modal-services/modal-dpi-services';
import * as i0 from "@angular/core";
interface CamInfo {
    label: string;
    deviceId: string;
}
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
    rearCams: CamInfo[];
    selectedCamId: string | null;
    currentRearIndex: number;
    private readonly isMobile;
    constructor(platform: Platform, modalController: ModalController, modaldpiServices: ModalDpiServices);
    ngAfterViewInit(): Promise<void>;
    ngOnDestroy(): void;
    private requestPermissions;
    private enumerateRearCams;
    openCamera(deviceId?: string): Promise<void>;
    /** Avanza al siguiente sensor trasero en modo carrusel */
    toggleRearCam(): void;
    private attachStream;
    capturePhoto(): Promise<void>;
    blobToFile(blob: Blob, fileName: string): File;
    private stopCamera;
    closeOverlay(): void;
    resumeCamera(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CameraWithOverlayComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CameraWithOverlayComponent, "app-camera-overlay", never, { "text1": { "alias": "text1"; "required": false; }; "text2": { "alias": "text2"; "required": false; }; "overlaySrc": { "alias": "overlaySrc"; "required": false; }; "onTakePicture": { "alias": "onTakePicture"; "required": false; }; }, { "closeRequested": "closeRequested"; }, never, never, false, never>;
}
export {};
