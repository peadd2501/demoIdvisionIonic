import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
interface DPIProcessResponse {
    error: boolean;
    message: string;
    details: any[];
}
export declare class DpiService {
    private http;
    private apiUrl;
    constructor(http: HttpClient);
    uploadFrontDPI(file: File, code: string, connection: string, apikey: string): Observable<DPIProcessResponse>;
    uploadBackDPI(file: File, code: string, connection: string, apikey: string): Observable<DPIProcessResponse>;
    videoSelfie(file: File, code: string, connection: string, apikey: string): Observable<DPIProcessResponse>;
    acuerdoVideo(file: File, code: string): Observable<DPIProcessResponse>;
    InitProccess(identificador: string, connection: string, apikey: string, versionSDk?: string): Observable<DPIProcessResponse>;
    getConnectionById(id: string): Observable<DPIProcessResponse>;
    photoSelfie(file: File, code: string, connection: string, apikey: string): Observable<DPIProcessResponse>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DpiService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DpiService>;
}
export {};
