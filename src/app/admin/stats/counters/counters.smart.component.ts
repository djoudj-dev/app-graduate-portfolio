import { Component, inject } from '@angular/core';
import { CountersDumbComponent } from './counters.dumb.component';
import { CountersService } from './services/counters.service';

@Component({
  imports: [CountersDumbComponent],
  template: ` <app-counters-dumb [counters]="countersService.getAllCounters()" /> `
})
export class CountersSmartComponent {
  protected readonly countersService = inject(CountersService);
}
