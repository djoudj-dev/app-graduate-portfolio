import { Injectable, computed, signal } from '@angular/core';
import { PROJECTS_MOCK } from '../data/projects.mock';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly projectsSignal = signal<Project[]>(PROJECTS_MOCK);

  // Signal calculé pour les 4 projets les plus récents
  readonly recentProjects = computed(() =>
    this.projectsSignal()
      .sort((a, b) => b.id - a.id)
      .slice(0, 4)
  );

  // Pour la page complète des projets
  getProjects() {
    return this.projectsSignal;
  }
}
