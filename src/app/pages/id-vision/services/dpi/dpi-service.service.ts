import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
// import { environments } from 'src/app/pages/constants/enviroments';

import { environments } from './../../../constants/enviroments';

interface DPIProcessResponse {
  error: boolean;
  message: string;
  details: any[];
}

@Injectable({
  providedIn: 'root',
})
export class DpiService {
  private apiUrl = environments.url;

  constructor(private http: HttpClient) {}

  uploadFrontDPI(file: File, code: string): Observable<DPIProcessResponse> {
    const formData = new FormData();

    // Detectar el tipo MIME
    const fileType = file.type || 'application/octet-stream';
    if (!fileType.startsWith('image/') && !fileType.includes('pdf')) {
      return throwError(() => new Error('Formato de archivo no válido.'));
    }
    // Convertir el archivo a Blob con tipo MIME
    const blob = new Blob([file], { type: fileType });

    formData.append('file', blob, file.name);

    // formData.append('file', file, file.name);
    formData.append('codigo', code);

    return this.http
      .post<DPIProcessResponse>(
        `${this.apiUrl}dpi/api/validateFrontDPIAWS`,
        formData,
        {
          headers: new HttpHeaders({
            Accept: 'application/json',
          }),
        }
      )
      .pipe(
        map((response: DPIProcessResponse) => response),
        catchError((error: HttpErrorResponse) =>
          throwError(() => new Error(error.message))
        )
      );
  }

  uploadBackDPI(file: File, code: string): Observable<DPIProcessResponse> {
    const formData = new FormData();

    // Detectar el tipo MIME
    const fileType = file.type || 'application/octet-stream';
    if (!fileType.startsWith('image/') && !fileType.includes('pdf')) {
      return throwError(() => new Error('Formato de archivo no válido.'));
    }
    // Convertir el archivo a Blob con tipo MIME
    const blob = new Blob([file], { type: fileType });

    formData.append('file', blob, file.name);
    formData.append('codigo', code);

    // formData.append('file', file, file.name);
    // formData.append('codigo', code);

    return this.http
      .post<DPIProcessResponse>(
        `${this.apiUrl}dpi/api/validateBackDPIAWS`,
        formData,
        {
          headers: new HttpHeaders({
            Accept: 'application/json',
          }),
        }
      )
      .pipe(
        map((response: DPIProcessResponse) => response),
        catchError((error: HttpErrorResponse) =>
          throwError(() => new Error(error.message))
        )
      );
  }

  videoSelfie(file: File, code: string): Observable<DPIProcessResponse> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('codigo', code);

    return this.http
      .post<DPIProcessResponse>(
        `${this.apiUrl}videoSelfie/api/validate`,
        formData
      )
      .pipe(
        map((response: DPIProcessResponse) => response),
        catchError((error: HttpErrorResponse) =>
          throwError(() => new Error(error.message))
        )
      );
  }

  InitProccess(
    identificador: string,
    connection: string
  ): Observable<DPIProcessResponse> {
    const requestBody = {
      identificador,
      connection,
    };

    return this.http
      .post<DPIProcessResponse>(
        `${this.apiUrl}initProces/api/initWhitDPINumber`,
        requestBody
      )
      .pipe(
        map((response: DPIProcessResponse) => response),
        catchError((error: HttpErrorResponse) =>
          throwError(() => new Error(error.message))
        )
      );
  }
}
