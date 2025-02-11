import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CalendlyDumbComponent } from './calendly.dumb.component';
import { AdminCalendlyService } from './services/admin-calendly.service';

@Component({
  selector: 'app-calendly-smart',
  standalone: true,
  imports: [CalendlyDumbComponent],
  template: `
    <app-calendly-dumb [currentUrl]="calendlyService.getCalendlyUrl()" (saved)="onSave($event)" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendlySmartComponent {
  protected readonly calendlyService = inject(AdminCalendlyService);

  protected onSave(newUrl: string) {
    this.calendlyService.updateCalendlyUrl(newUrl);
  }
}
