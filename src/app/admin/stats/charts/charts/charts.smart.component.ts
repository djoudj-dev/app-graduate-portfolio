import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StatsService } from '../../services/stats.service';
import { ChartsFilterDumbComponent } from './charts-filter.dumb.component';
import { ChartsDumbComponent } from './charts.dumb.component';

@Component({
  selector: 'app-charts-smart',
  imports: [ChartsDumbComponent, ChartsFilterDumbComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto px-4 py-8">
      <div>
        <h3>Visites en temps réel: {{ realTimeVisits }}</h3>
      </div>
      <div
        class="bg-background/60 backdrop-blur-lg rounded-xl border border-tertiary/20 p-6 
          shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <h2 class="text-xl font-semibold mb-6 text-text">Statistiques des visites</h2>
        <app-charts-filter (filterChange)="onFilterChange($event)" />
        <app-charts-dumb [chartData]="statsService.weeklyStats() || { labels: [], datasets: [] }" />
      </div>
    </div>
  `
})
export class ChartsSmartComponent {
  protected readonly statsService = inject(StatsService);
  protected realTimeVisits: number = 0;

  constructor() {
    // Initialiser les données au démarrage
    this.statsService.getStats('week', new Date()).subscribe();
    this.statsService.getRealTimeVisits().subscribe((visits) => {
      this.realTimeVisits = visits;
      console.log('Nombre de visites en temps réel:', visits);
      // Vous pouvez également mettre à jour une propriété pour afficher cela dans le template
    });
  }

  onFilterChange(filter: { period: string; date: Date }) {
    this.statsService
      .getStats(filter.period as 'day' | 'week' | 'month' | 'year', filter.date)
      .subscribe();
  }
}
