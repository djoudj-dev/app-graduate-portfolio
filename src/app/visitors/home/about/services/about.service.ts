import { Injectable, signal } from '@angular/core';
import { ABOUT_MOCK } from '../data/about.mock';
import { About } from '../models/about.model';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  // Signal avec les données mockées
  private readonly aboutSignal = signal<About>(ABOUT_MOCK);

  // Getter pour accéder aux données
  getAbout() {
    return this.aboutSignal;
  }

  // Pour plus tard : méthode pour mettre à jour les données
  updateAbout(data: Partial<About>) {
    this.aboutSignal.update((current) => ({ ...current, ...data }));
  }
}
