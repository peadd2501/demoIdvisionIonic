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

  uploadFrontDPI(file: File, code: string, connection: string, apikey: string): Observable<DPIProcessResponse> {
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
      .post<DPIProcessResponse>(
        `${this.apiUrl}dpi/api/validateFrontDPIAWS`,
        formData,
        {
          headers
        }
      )
      .pipe(
        map((response: DPIProcessResponse) => response),
        catchError((error: HttpErrorResponse) =>
          throwError(() => new Error(error.message))
        )
      );
  }

  uploadBackDPI(file: File, code: string, connection: string, apikey: string): Observable<DPIProcessResponse> {
    const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('codigo', code);
    

    const headers = new HttpHeaders({
      Accept: 'application/json',
      'connection-mg': connection,
      'api-key': apikey
    });


    return this.http
      .post<DPIProcessResponse>(
        `${this.apiUrl}dpi/api/validateBackDPIAWS`,
        formData,
        {
          headers
        }
      )
      .pipe(
        map((response: DPIProcessResponse) => response),
        catchError((error: HttpErrorResponse) =>
          throwError(() => new Error(error.message))
        )
      );
  }

  videoSelfie(file: File, code: string, connection: string, apikey: string): Observable<DPIProcessResponse> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('codigo', code);



    const headers = new HttpHeaders({
      'connection-mg': connection,
      'api-key': apikey
    });


    return this.http
      .post<DPIProcessResponse>(
        `${this.apiUrl}videoSelfie/api/validate`,
        formData,
        {
          headers
        }
      )
      .pipe(
        map((response: DPIProcessResponse) => response),
        catchError((error: HttpErrorResponse) =>
          throwError(() => new Error(error.message))
        )
      );
  }

  acuerdoVideo(file: File, code: string): Observable<DPIProcessResponse> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('codigo', code);

    return this.http
      .post<DPIProcessResponse>(
        `${this.apiUrl}acuerdoVideo/api/validate`,
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
    connection: string,
    apikey: string
  ): Observable<DPIProcessResponse> {
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
      .post<DPIProcessResponse>(
        `${this.apiUrl}initProces/api/initWhitDPINumber`,
        requestBody,
        {
          headers
        }
      )
      .pipe(
        map((response: DPIProcessResponse) => response),
        catchError((error: HttpErrorResponse) =>
          throwError(() => new Error(error.message))
        )
      );
  }

  getConnectionById(id: string): Observable<DPIProcessResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    return this.http
      .get<DPIProcessResponse>(`${this.apiUrl}connection/api/getConnectionXID/${id}`, { headers })
      .pipe(
        map((response: DPIProcessResponse) => response),
        catchError((error: HttpErrorResponse) =>
          throwError(() => new Error(error.message))
        )
      );
  }

  photoSelfie(file: File, code: string, connection: string, apikey: string): Observable<DPIProcessResponse> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('codigo', code);

    const headers = new HttpHeaders({
      'connection-mg': connection,
      'api-key': apikey,
      // 'Content-Type': 'application/json',
    });


    return this.http.post(`${this.apiUrl}selfieAuth/api/validate`, formData, { headers, responseType: 'text' }) // 🔹 Recibir como texto
    .pipe(
      map((response: string) => {
        try {
          // console.log("Respuesta recibida:", response);
          return JSON.parse(response); // Intentar parsear JSON si es válido
        } catch (error) {
          console.error("Error al parsear JSON:", error);
          return response; // Si no es JSON, devolver como texto plano
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Error en la petición:", error);
        return throwError(() => new Error(error.message));
      })
    );

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

