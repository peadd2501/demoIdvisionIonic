import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidateMetaGService {
  private validateMetaG: boolean | null = null;

  setValidateMetaG(value: boolean) {
    this.validateMetaG = value;
  }

  getValidateMetaG(): boolean | null {
    return this.validateMetaG;
  }
}