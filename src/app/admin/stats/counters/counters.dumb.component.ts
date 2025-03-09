import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Counters } from './models/counters.model';
import { CountersService } from './services/counters.service';

@Component({
  selector: 'app-counters-dumb',
  imports: [NgOptimizedImage],
  template: `
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div (click)="increment('calls')" class="counter-item">
          <img ngSrc="/images/icons/phone.svg" alt="Appels" class="icon" />
          <span class="count">{{ counters().calls }}</span>
          <span class="label">Appels réservés</span>
        </div>

        <div (click)="increment('cv')" class="counter-item">
          <img ngSrc="/images/icons/download.svg" alt="CV" class="icon" />
          <span class="count">{{ counters().cv }}</span>
          <span class="label">CV téléchargés</span>
        </div>

        <div (click)="increment('github')" class="counter-item">
          <img ngSrc="/images/icons/github.svg" alt="GitHub" class="icon" />
          <span class="count">{{ counters().github }}</span>
          <span class="label">Visites GitHub</span>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountersDumbComponent {
  counters = input.required<Counters>();
  private readonly countersService = inject(CountersService);

  increment(key: keyof Counters) {
    this.countersService.incrementCounter(key).subscribe();
  }
}
