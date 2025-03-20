import { ChangeDetectorRef, ElementRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ModalDpiServices } from '../../services/modal-services/modal-dpi-services';
import * as i0 from "@angular/core";
export declare class CamaraAcuerdoVideoComponent implements OnInit, AfterViewInit, OnDestroy {
    private platform;
    private changeDetector;
    private modalDpiServices;
    private modalController;
    videoElement: ElementRef<HTMLVideoElement>;
    backFunction: (filePath: File) => Promise<void>;
    capVideo?: File;
    countdown: number;
    isRecording: boolean;
    timeRemaining: number;
    canStopRecording: boolean;
    private isAndroid;
    private isIOS;
    stream: MediaStream | null;
    mediaRecorder: MediaRecorder | null;
    recordingTimer: any;
    isLoading: boolean;
    constructor(platform: Platform, changeDetector: ChangeDetectorRef, modalDpiServices: ModalDpiServices, modalController: ModalController);
    ngOnInit(): Promise<void>;
    ngAfterViewInit(): Promise<void>;
    ngOnDestroy(): Promise<void>;
    initCamera(): Promise<void>;
    recordVideo(): Promise<void>;
    startVideoRecord(): Promise<void>;
    stopRecording(): Promise<void>;
    blobToFile(blob: Blob, fileName: string): File;
    stopCamera(): void;
    closeOverlayVideo(): Promise<void>;
    closeRequestedFunction(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CamaraAcuerdoVideoComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CamaraAcuerdoVideoComponent, "app-acuerdo-video", never, { "backFunction": { "alias": "backFunction"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=camara-acuerdo.video.component.d.ts.map