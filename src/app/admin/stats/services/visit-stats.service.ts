import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { ChartData } from 'chart.js';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { VisitStats } from '../models/visit-stats.model'; // Assurez-vous que ce modèle est correct

export interface DataPoint {
  labels: string[];
  values: number[];
  clicks: number[];
}

export interface CreateVisitStatDto {
  period: 'day' | 'week' | 'month' | 'year';
  data: DataPoint;
}

@Injectable({
  providedIn: 'root'
})
export class VisitStatsService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/stats`;
  private currentStats = signal<VisitStats | null>(null);

  readonly weeklyStats = computed<ChartData<'bar'>>(() => {
    const stats = this.currentStats();
    return {
      labels: stats?.data.labels ?? [],
      datasets: [
        {
          label: 'Visites',
          data: stats?.data.values ?? [],
          backgroundColor: '#ffd700',
          borderColor: '#ffd700',
          borderWidth: 1,
          hoverBackgroundColor: '#ffed4a',
          hoverBorderColor: '#ffd700',
          borderRadius: 8,
          tension: 0.2
        },
        {
          label: 'Clics',
          data: stats?.data.clicks ?? [],
          backgroundColor: '#4caf50',
          borderColor: '#4caf50',
          borderWidth: 1,
          hoverBackgroundColor: '#66bb6a',
          hoverBorderColor: '#4caf50',
          borderRadius: 8,
          tension: 0.2
        }
      ]
    };
  });

  getStats(period: 'day' | 'week' | 'month' | 'year', startDate?: Date): Observable<VisitStats> {
    const params: { [key: string]: string } = { period };
    if (startDate) params['startDate'] = startDate.toISOString();

    return this.http.get<VisitStats>(this.API_URL, { params }).pipe(
      tap((stats) => this.currentStats.set(stats)),
      catchError(() => {
        console.error('Erreur lors de la récupération des statistiques');
        return of({
          period: period,
          total: 0,
          average: 0,
          peak: 0,
          lowest: 0,
          data: { labels: [], values: [], clicks: [] }
        });
      })
    );
  }

  createStat(stat: CreateVisitStatDto): Observable<VisitStats> {
    return this.http.post<VisitStats>(this.API_URL, stat).pipe(
      tap((stats) => this.currentStats.set(stats)),
      catchError(() => {
        console.error('Erreur lors de l’enregistrement des statistiques');
        return of({
          period: stat.period,
          total: 0,
          average: 0,
          peak: 0,
          lowest: 0,
          data: { labels: [], values: [], clicks: [] }
        });
      })
    );
  }

  getRealTimeVisits(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/real-time-visits`).pipe(
      catchError(() => {
        console.error('Erreur lors de la récupération des visites en temps réel');
        return of(0);
      })
    );
  }
}
