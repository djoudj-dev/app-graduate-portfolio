import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Counters } from './models/counters.model';

@Component({
  selector: 'app-counters-dumb',
  imports: [NgOptimizedImage],
  template: `
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div
          class="p-6 rounded-lg bg-background/90 backdrop-blur-md border-2 border-tertiary/20 shadow-lg transform hover:-translate-y-1 transition-all duration-300"
        >
          <div class="flex flex-col items-center">
            <img
              ngSrc="/images/icons/phone.svg"
              alt="Appels"
              class="w-12 h-12 mb-4 invert-0 dark:invert drop-shadow-[0_0_1px_theme(colors.text)] dark:drop-shadow-none"
              width="48"
              height="48"
            />
            <span class="text-3xl font-bold text-tertiary mb-2">{{ counters().calls }}</span>
            <span class="text-text text-sm">Appels réservés</span>
          </div>
        </div>

        <div
          class="p-6 rounded-lg bg-background/90 backdrop-blur-md border-2 border-tertiary/20 shadow-lg transform hover:-translate-y-1 transition-all duration-300"
        >
          <div class="flex flex-col items-center">
            <img
              ngSrc="/images/icons/download.svg"
              alt="CV"
              class="w-12 h-12 mb-4 invert-0 dark:invert drop-shadow-[0_0_1px_theme(colors.text)] dark:drop-shadow-none"
              width="48"
              height="48"
            />
            <span class="text-3xl font-bold text-tertiary mb-2">{{ counters().cv }}</span>
            <span class="text-text text-sm">CV téléchargés</span>
          </div>
        </div>

        <div
          class="p-6 rounded-lg bg-background/90 backdrop-blur-md border-2 border-tertiary/20 shadow-lg transform hover:-translate-y-1 transition-all duration-300"
        >
          <div class="flex flex-col items-center">
            <img
              ngSrc="/images/icons/github.svg"
              alt="GitHub"
              class="w-12 h-12 mb-4 invert-0 dark:invert drop-shadow-[0_0_1px_theme(colors.text)] dark:drop-shadow-none"
              width="48"
              height="48"
            />
            <span class="text-3xl font-bold text-tertiary mb-2">{{ counters().github }}</span>
            <span class="text-text text-sm">Visites GitHub</span>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountersDumbComponent {
  counters = input.required<Counters>();
}
