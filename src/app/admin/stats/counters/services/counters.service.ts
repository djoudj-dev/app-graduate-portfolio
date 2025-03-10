import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
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
   * Récupère les compteurs depuis le localStorage ou le backend
   */
  fetchCounters(): Observable<Counters> {
    const countersFromStorage = localStorage.getItem('counters');
    if (countersFromStorage) {
      const counters = JSON.parse(countersFromStorage);

      // Ensure the counters are valid numbers
      const validCounters: Counters = {
        calls: Number(counters.calls) || 0,
        cv: Number(counters.cv) || 0,
        github: Number(counters.github) || 0,
        linkedin: Number(counters.linkedin) || 0,
        projects: Number(counters.projects) || 0,
        websites: Number(counters.websites) || 0
      };

      this.countersSignal.set(validCounters);
      return new Observable<Counters>((observer) => {
        observer.next(validCounters); // Emit the valid counters
        observer.complete();
      });
    } else {
      return this.http.get<Counters>(this.API_URL).pipe(
        tap((counters) => {
          this.countersSignal.set(counters);
          localStorage.setItem('counters', JSON.stringify(counters));
        })
      );
    }
  }

  /**
   * Incrémente un compteur et met à jour le localStorage
   */
  incrementCounter(counterName: keyof Counters): Observable<Counters> {
    const currentCounters = this.countersSignal() || {
      calls: 0,
      cv: 0,
      github: 0,
      linkedin: 0,
      projects: 0,
      websites: 0
    };

    // Assurez-vous que la valeur est un nombre avant d'incrémenter
    currentCounters[counterName] = (currentCounters[counterName] || 0) + 1;
    this.countersSignal.set(currentCounters);
    localStorage.setItem('counters', JSON.stringify(currentCounters));

    return new Observable<Counters>((observer) => {
      observer.next(currentCounters);
      observer.complete();
    });
  }
}
