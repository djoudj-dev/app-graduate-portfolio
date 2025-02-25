import { Component, effect, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-charts-filter',
  imports: [ReactiveFormsModule],
  template: `
    <div class="flex flex-wrap gap-4 items-center mb-6">
      <select
        [formControl]="periodControl"
        class="px-4 py-2.5 rounded-lg bg-background/80 backdrop-blur-md border-2 border-tertiary/20 
        focus:border-tertiary/60 outline-none text-text transition-colors duration-200 
        hover:border-tertiary/40"
      >
        <option value="day">Jour</option>
        <option value="week">Semaine</option>
        <option value="month">Mois</option>
        <option value="year">Année</option>
      </select>

      <input
        type="date"
        [formControl]="dateControl"
        class="px-4 py-2.5 rounded-lg bg-background/80 backdrop-blur-md border-2 border-tertiary/20 
        focus:border-tertiary/60 outline-none text-text transition-colors duration-200 
        hover:border-tertiary/40"
      />
    </div>
  `
})
export class ChartsFilterDumbComponent {
  private fb = inject(FormBuilder);

  periodControl = this.fb.control('week');
  dateControl = this.fb.control(new Date().toISOString().split('T')[0]);

  filterChange = output<{ period: string; date: Date }>();

  constructor() {
    effect(() => {
      if (this.periodControl.value && this.dateControl.value) {
        this.filterChange.emit({
          period: this.periodControl.value,
          date: new Date(this.dateControl.value)
        });
      }
    });
  }
}
