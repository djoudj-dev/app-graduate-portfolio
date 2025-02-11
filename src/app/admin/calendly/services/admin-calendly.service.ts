import { Injectable, inject } from '@angular/core';
import { CalendlyService } from '../../../shared/services/calendly.service';

@Injectable({
  providedIn: 'root'
})
export class AdminCalendlyService {
  private readonly calendlyService = inject(CalendlyService);

  getCalendlyUrl(): string {
    return this.calendlyService.getCalendlyUrl();
  }

  updateCalendlyUrl(newUrl: string) {
    this.calendlyService.updateCalendlyUrl(newUrl);
  }
}
