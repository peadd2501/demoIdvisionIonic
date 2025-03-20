import { AfterViewInit, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ModalDpiServices } from '../../services/modal-services/modal-dpi-services';
import * as i0 from "@angular/core";
export declare class PhotoSelfieCameraComponent implements AfterViewInit, OnDestroy {
    private platform;
    private modalController;
    private sanitizer;
    private modalDpiServices;
    videoElement: ElementRef<HTMLVideoElement>;
    text1: string;
    text2: string;
    onTakePicture: (filePath: File) => Promise<boolean>;
    closeRequested: EventEmitter<void>;
    capturedImage: SafeUrl | null;
    stream: MediaStream | null;
    private isAndroid;
    private isIOS;
    isLoading: boolean;
    file?: File;
    capturedImageUrl: string | null;
    constructor(platform: Platform, modalController: ModalController, sanitizer: DomSanitizer, modalDpiServices: ModalDpiServices);
    ngOnDestroy(): Promise<void>;
    ngAfterViewInit(): Promise<void>;
    requestPermissions(): Promise<void>;
    initCamera(): Promise<void>;
    capturePhoto(): Promise<void>;
    blobToFile(blob: Blob, fileName: string): File;
    stopCamera(): void;
    closeOverlay(): void;
    closeRequestedFunction(): void;
    resumeCamera(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PhotoSelfieCameraComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PhotoSelfieCameraComponent, "app-photo-selfie-camera", never, { "text1": { "alias": "text1"; "required": false; }; "text2": { "alias": "text2"; "required": false; }; "onTakePicture": { "alias": "onTakePicture"; "required": false; }; }, { "closeRequested": "closeRequested"; }, never, never, false, never>;
}
//# sourceMappingURL=photo-selfie-camera.component.d.ts.map