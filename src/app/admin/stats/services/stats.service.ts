import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { VisitStats } from '../models/visit.model';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = '/api/stats';

  private currentStats = signal<VisitStats>({
    period: 'week',
    data: {
      labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      values: [65, 59, 80, 81, 56, 55, 40]
    },
    total: 436,
    average: 62.3,
    peak: {
      value: 81,
      date: new Date()
    },
    lowest: {
      value: 40,
      date: new Date()
    }
  });

  readonly weeklyStats = computed(() => ({
    labels: this.currentStats().data.labels,
    datasets: [
      {
        label: 'Visites',
        data: this.currentStats().data.values,
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(99, 102, 241, 0.7)',
        hoverBorderColor: 'rgb(99, 102, 241)',
        borderRadius: 4
      }
    ]
  }));

  getStats(period: 'day' | 'week' | 'month' | 'year', startDate?: Date): Observable<VisitStats> {
    const mockStats: VisitStats = {
      period,
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        values: [65, 59, 80, 81, 56, 55, 40]
      },
      total: 436,
      average: 62.3,
      peak: {
        value: 81,
        date: new Date()
      },
      lowest: {
        value: 40,
        date: new Date()
      }
    };

    return of(mockStats).pipe(tap((stats) => this.currentStats.set(stats)));
  }

  getWeeklyStats() {
    return this.weeklyStats();
  }

  private getDefaultChartData() {
    return {
      labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      datasets: [
        {
          label: 'Visites',
          data: [0, 0, 0, 0, 0, 0, 0],
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 2,
          hoverBackgroundColor: 'rgba(99, 102, 241, 0.7)',
          hoverBorderColor: 'rgb(99, 102, 241)',
          borderRadius: 4
        }
      ]
    };
  }
}
