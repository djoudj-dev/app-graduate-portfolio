import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Counters } from '../models/counters.model';

@Injectable({
  providedIn: 'root'
})
export class CountersService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/counters`;

  private countersSignal = signal<Counters | null>(null);

  readonly getCalls = computed(() => this.countersSignal()?.calls ?? 0);
  readonly getCv = computed(() => this.countersSignal()?.cv ?? 0);
  readonly getGithub = computed(() => this.countersSignal()?.github ?? 0);
  readonly getLinkedin = computed(() => this.countersSignal()?.linkedin ?? 0);
  readonly getProjects = computed(() => this.countersSignal()?.projects ?? 0);
  readonly getWebsites = computed(() => this.countersSignal()?.websites ?? 0);
  readonly getAllCounters = computed(() => this.countersSignal());
  readonly getTotalCounters = computed(() => {
    const counters = this.countersSignal();
    return counters
      ? counters.calls +
          counters.cv +
          counters.github +
          counters.linkedin +
          counters.projects +
          counters.websites
      : 0;
  });

  constructor() {
    this.fetchCounters().subscribe();
  }

  /**
   * Récupère les compteurs depuis le backend
   */
  fetchCounters(): Observable<Counters> {
    return this.http
      .get<Counters>(this.API_URL)
      .pipe(tap((counters) => this.countersSignal.set(counters)));
  }

  /**
   * Incrémente un compteur et envoie les nouvelles valeurs au backend
   */
  incrementCounter(key: keyof Counters): Observable<Counters> {
    const currentCounters = this.countersSignal();
    if (!currentCounters)
      return of({ calls: 0, cv: 0, github: 0, linkedin: 0, projects: 0, websites: 0 });

    const updatedCounters = { ...currentCounters, [key]: (currentCounters[key] ?? 0) + 1 };
    return this.sendCountersData(updatedCounters);
  }

  private sendCountersData(data: Counters): Observable<Counters> {
    return this.http
      .post<Counters>(this.API_URL, data)
      .pipe(tap(() => this.countersSignal.set(data)));
  }
}
