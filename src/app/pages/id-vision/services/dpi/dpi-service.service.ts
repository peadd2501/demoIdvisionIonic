import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DPIProcessResponse } from '../models/dpi-process-response.model';

@Injectable({
  providedIn: 'root',
})
export class DpiService {
  private apiUrl = 'https://example.com/api/dpi';

  constructor(private http: HttpClient) {}

  async uploadFrontDPI(filePath: string, code: string): Promise<DPIProcessResponse> {
    const formData = new FormData();
    formData.append('file', filePath);
    formData.append('code', code);

    return this.http.post<DPIProcessResponse>(`${this.apiUrl}/upload-front`, formData).toPromise();
  }
}
