// src/app/services/redirect.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  private redirectUrl = signal<string>('');

  setRedirectUrl(url: string) {
    this.redirectUrl.set(url);
  }

  getRedirectUrl(): string {
    return this.redirectUrl();
  }
}
