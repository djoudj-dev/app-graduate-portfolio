import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { VisitStats } from '../models/visit.model';

export interface DataPoint {
  labels: string[];
  values: number[];
  clicks: number[]; // Assurez-vous que le champ clicks est bien défini ici
}

export interface CreateVisitStatDto {
  period: 'day' | 'week' | 'month' | 'year';
  data: DataPoint;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/stats`;

  private currentStats = signal<VisitStats | null>(null);

  readonly weeklyStats = computed(() => {
    const stats = this.currentStats();
    if (!stats) return null;

    return {
      labels: stats.data.labels,
      datasets: [
        {
          label: 'Visites',
          data: stats.data.values,
          backgroundColor: '#ffd700',
          borderColor: '#ffd700',
          borderWidth: 1,
          hoverBackgroundColor: '#ffed4a',
          hoverBorderColor: '#ffd700',
          borderRadius: 8,
          tension: 0.2
        },
        {
          label: 'Clics', // Ajoutez un dataset pour les clics
          data: stats.data.clicks,
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

  /**
   * Récupère les statistiques depuis le backend
   */
  getStats(period: 'day' | 'week' | 'month' | 'year', startDate?: Date): Observable<VisitStats> {
    const params: { [key: string]: string } = { period };

    if (startDate) {
      params['startDate'] = startDate.toISOString();
    }

    return this.http
      .get<VisitStats>(this.API_URL, { params })
      .pipe(tap((stats) => this.currentStats.set(stats)));
  }

  /**
   * Enregistre de nouvelles statistiques côté backend
   */
  createStat(stat: CreateVisitStatDto): Observable<VisitStats> {
    return this.http
      .post<VisitStats>(this.API_URL, stat)
      .pipe(tap((stats) => this.currentStats.set(stats)));
  }

  /**
   * Expose les statistiques actuelles
   */
  getWeeklyStats() {
    return this.weeklyStats();
  }

  getRealTimeVisits(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/real-time-visits`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des visites en temps réel:', error);
        return of(0); // Retourne 0 ou une valeur par défaut en cas d'erreur
      })
    );
  }
}
