import { Component, inject } from '@angular/core';
import { CountersDumbComponent } from './counters.dumb.component';
import { CountersService } from './services/counters.service';

@Component({
  imports: [CountersDumbComponent],
  template: `
    <app-counters-dumb
      [counters]="
        countersService.getAllCounters() || {
          calls: 0,
          cv: 0,
          github: 0,
          linkedin: 0,
          projects: 0,
          websites: 0
        }
      "
    />
  `
})
export class CountersSmartComponent {
  protected readonly countersService = inject(CountersService);
}
