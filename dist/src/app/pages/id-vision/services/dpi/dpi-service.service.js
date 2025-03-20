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
    uploadFrontDPI(file, code, connection, apikey) {
        if (!file || file.size === 0) {
            console.error('El archivo proporcionado no es válido:', file);
        }
        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('codigo', code);
        const headers = new HttpHeaders({
            Accept: 'application/json',
            'connection-mg': connection,
            'api-key': apikey
        });
        return this.http
            .post(`${this.apiUrl}dpi/api/validateFrontDPIAWS`, formData, {
            headers
        })
            .pipe(map((response) => response), catchError((error) => throwError(() => new Error(error.message))));
    }
    uploadBackDPI(file, code, connection, apikey) {
        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('codigo', code);
        const headers = new HttpHeaders({
            Accept: 'application/json',
            'connection-mg': connection,
            'api-key': apikey
        });
        return this.http
            .post(`${this.apiUrl}dpi/api/validateBackDPIAWS`, formData, {
            headers
        })
            .pipe(map((response) => response), catchError((error) => throwError(() => new Error(error.message))));
    }
    videoSelfie(file, code, connection, apikey) {
        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('codigo', code);
        const headers = new HttpHeaders({
            'connection-mg': connection,
            'api-key': apikey
        });
        return this.http
            .post(`${this.apiUrl}videoSelfie/api/validate`, formData, {
            headers
        })
            .pipe(map((response) => response), catchError((error) => throwError(() => new Error(error.message))));
    }
    acuerdoVideo(file, code) {
        console.log("acuerdoVideo: ", file, code);
        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('codigo', code);
        return this.http
            .post(`${this.apiUrl}acuerdoVideo/api/validate`, formData)
            .pipe(map((response) => response), catchError((error) => throwError(() => new Error(error.message))));
    }
    InitProccess(identificador, connection, apikey) {
        const requestBody = {
            identificador,
            connection,
            apikey
        };
        const headers = new HttpHeaders({
            'connection-mg': connection,
            'api-key': apikey
        });
        return this.http
            .post(`${this.apiUrl}initProces/api/initWhitDPINumber`, requestBody, {
            headers
        })
            .pipe(map((response) => response), catchError((error) => throwError(() => new Error(error.message))));
    }
    getConnectionById(id) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http
            .get(`${this.apiUrl}connection/api/getConnectionXID/${id}`, { headers })
            .pipe(map((response) => response), catchError((error) => throwError(() => new Error(error.message))));
    }
    photoSelfie(file, code, connection, apikey) {
        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('codigo', code);
        console.log("Connection: ", connection);
        console.log("apikey: ", apikey);
        const headers = new HttpHeaders({
            'connection-mg': connection,
            'api-key': apikey,
            // 'Content-Type': 'application/json',
        });
        return this.http.post(`${this.apiUrl}selfieAuth/api/validate`, formData, { headers, responseType: 'text' }) // 🔹 Recibir como texto
            .pipe(map((response) => {
            try {
                console.log("Respuesta recibida:", response);
                return JSON.parse(response); // Intentar parsear JSON si es válido
            }
            catch (error) {
                console.error("Error al parsear JSON:", error);
                return response; // Si no es JSON, devolver como texto plano
            }
        }), catchError((error) => {
            console.error("Error en la petición:", error);
            return throwError(() => new Error(error.message));
        }));
        // return this.http
        //   .post<DPIProcessResponse>(
        //     `${this.apiUrl}selfieAuth/api/validate`,
        //     formData,
        //     {
        //       headers
        //     }
        //   )
        //   .pipe(
        //     map((response: DPIProcessResponse) => response),
        //     catchError((error: HttpErrorResponse) =>
        //       throwError(() => new Error(error.message))
        //     )
        //   );  
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