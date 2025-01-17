import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
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
        if (!file || file.size === 0) {
            console.error('El archivo proporcionado no es válido:', file);
        }
        const formData = new FormData();
        console.log('file', file);
        // Detectar el tipo MIME
        // const fileType = typeof file.type === 'string' ? file.type : 'application/octet-stream';
        // if (!fileType.startsWith('image/') && !fileType.includes('pdf')) {
        //   return throwError(() => new Error('Formato de archivo no válido.'));
        // }
        // Convertir el archivo a Blob con tipo MIME
        // const blob = new Blob([file], { type: fileType });
        formData.append('file', file, file.name);
        // formData.append('file', file, file.name);
        formData.append('codigo', code);
        console.log('formData generado', formData);
        return this.http
            .post(`${this.apiUrl}dpi/api/validateFrontDPIAWS`, formData, {
            headers: new HttpHeaders({
                Accept: 'application/json',
            }),
        })
            .pipe(map((response) => response), catchError((error) => throwError(() => new Error(error.message))));
    }
    uploadBackDPI(file, code) {
        const formData = new FormData();
        console.log('file', file);
        // Detectar el tipo MIME
        // const fileType = typeof file.type === 'string' ? file.type : 'application/octet-stream';
        // if (!fileType.startsWith('image/') && !fileType.includes('pdf')) {
        //   return throwError(() => new Error('Formato de archivo no válido.'));
        // }
        // Convertir el archivo a Blob con tipo MIME
        // const blob = new Blob([file], { type: fileType });
        formData.append('file', file, file.name);
        formData.append('codigo', code);
        console.log('formData', formData);
        // formData.append('file', file, file.name);
        // formData.append('codigo', code);
        return this.http
            .post(`${this.apiUrl}dpi/api/validateBackDPIAWS`, formData, {
            headers: new HttpHeaders({
                Accept: 'application/json',
            }),
        })
            .pipe(map((response) => response), catchError((error) => throwError(() => new Error(error.message))));
    }
    videoSelfie(file, code) {
        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('codigo', code);
        return this.http
            .post(`${this.apiUrl}videoSelfie/api/validate`, formData)
            .pipe(map((response) => response), catchError((error) => throwError(() => new Error(error.message))));
    }
    InitProccess(identificador, connection) {
        const requestBody = {
            identificador,
            connection,
        };
        return this.http
            .post(`${this.apiUrl}initProces/api/initWhitDPINumber`, requestBody)
            .pipe(map((response) => response), catchError((error) => throwError(() => new Error(error.message))));
    }
}
DpiService.ɵfac = function DpiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DpiService)(i0.ɵɵinject(i1.HttpClient)); };
DpiService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DpiService, factory: DpiService.ɵfac, providedIn: 'root' });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DpiService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=dpi-service.service.js.map