import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendlyService {
  private calendlyUrl = signal<string>('');

  getCalendlyUrl(): string {
    return this.calendlyUrl();
  }

  updateCalendlyUrl(newUrl: string): void {
    this.calendlyUrl.set(newUrl);
  }
}
