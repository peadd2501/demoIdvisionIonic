import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface DPIProcessResponse {
    error: boolean;
    message: string;
    details: any[];
}
export declare class DpiService {
    private http;
    private apiUrl;
    constructor(http: HttpClient);
    uploadFrontDPI(file: File, code: string): Observable<DPIProcessResponse>;
    uploadBackDPI(file: File, code: string): Observable<DPIProcessResponse>;
    videoSelfie(file: File, code: string): Observable<DPIProcessResponse>;
    InitProccess(identificador: string, connection: string): Observable<DPIProcessResponse>;
}
export {};
