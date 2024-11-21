import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
// import { environments } from 'src/app/pages/constants/enviroments';
import { environments } from './../../../constants/enviroments';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class DpiService {
    constructor(http) {
        this.http = http;
        this.apiUrl = environments.url;
    }
    uploadFrontDPI(file, code) {
        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('codigo', code);
        return this.http.post(`${this.apiUrl}dpi/api/validateFrontDPIAWS`, formData)
            .pipe(map((response) => response), catchError((error) => throwError(() => new Error(error.message))));
    }
    uploadBackDPI(file, code) {
        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('codigo', code);
        return this.http.post(`${this.apiUrl}dpi/api/validateBackDPIAWS`, formData)
            .pipe(map((response) => response), catchError((error) => throwError(() => new Error(error.message))));
    }
    videoSelfie(file, code) {
        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('codigo', code);
        return this.http.post(`${this.apiUrl}videoSelfie/api/validate`, formData)
            .pipe(map((response) => response), catchError((error) => throwError(() => new Error(error.message))));
    }
    InitProccess(identificador, connection) {
        const requestBody = {
            identificador,
            connection
        };
        return this.http.post(`${this.apiUrl}initProces/api/initWhitDPINumber`, requestBody)
            .pipe(map((response) => response), catchError((error) => throwError(() => new Error(error.message))));
    }
}
DpiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: DpiService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
DpiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: DpiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: DpiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });
//# sourceMappingURL=dpi-service.service.js.map