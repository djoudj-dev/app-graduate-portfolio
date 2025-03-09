import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { VisitStatsService } from '../../services/visit-stats.service';
import { ChartsFilterDumbComponent } from './charts-filter.dumb.component';
import { ChartsDumbComponent } from './charts.dumb.component';

@Component({
  selector: 'app-charts-smart',
  standalone: true,
  imports: [ChartsDumbComponent, ChartsFilterDumbComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto px-4 py-8">
      <div>
        <h3>Visites en temps réel: {{ realTimeVisits() }}</h3>
      </div>
      <div
        class="bg-background/60 backdrop-blur-lg rounded-xl border border-tertiary/20 p-6 
          shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <h2 class="text-xl font-semibold mb-6 text-text">Statistiques des visites</h2>
        <app-charts-filter (filterChange)="onFilterChange($event)" />
        <app-charts-dumb [chartData]="statsService.weeklyStats()" />
      </div>
    </div>
  `
})
export class ChartsSmartComponent {
  protected readonly statsService = inject(VisitStatsService);
  protected realTimeVisits = signal(0);

  constructor() {
    this.statsService.getStats('week', new Date()).subscribe();
    this.statsService.getRealTimeVisits().subscribe((visits) => {
      this.realTimeVisits.set(visits);
    });
  }

  onFilterChange(filter: { period: 'day' | 'week' | 'month' | 'year'; date: Date }) {
    this.statsService.getStats(filter.period, filter.date).subscribe();
  }
}
