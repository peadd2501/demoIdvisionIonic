import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
// import { environments } from 'src/app/pages/constants/enviroments';
import { environments } from './../../../constants/enviroments';
let DpiService = class DpiService {
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
};
DpiService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], DpiService);
export { DpiService };
//# sourceMappingURL=dpi-service.service.js.map