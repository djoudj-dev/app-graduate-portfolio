import { Injectable, computed, signal } from '@angular/core';
import { PROJECTS_MOCK } from '../../visitors/home/projects/data/projects.mock';
import { Project } from '../../visitors/home/projects/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly projectsSignal = signal<Project[]>(this.loadProjects());

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

  private loadProjects(): Project[] {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : PROJECTS_MOCK;
  }

  private saveProjects(projects: Project[]): void {
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  createProject(projectData: Omit<Project, 'id'>): void {
    const currentProjects = this.projectsSignal();
    const newId = Math.max(...currentProjects.map((p) => p.id), 0) + 1;

    const newProject: Project = {
      id: newId,
      ...projectData
    };

    this.projectsSignal.update((projects) => {
      const updatedProjects = [...projects, newProject];
      this.saveProjects(updatedProjects);
      return updatedProjects;
    });
  }

  updateProject(id: number, projectData: Partial<Project>): void {
    this.projectsSignal.update((projects) => {
      const updatedProjects = projects.map((project) =>
        project.id === id ? { ...project, ...projectData } : project
      );
      this.saveProjects(updatedProjects);
      return updatedProjects;
    });
  }

  deleteProject(id: number): void {
    this.projectsSignal.update((projects) => {
      const updatedProjects = projects.filter((project) => project.id !== id);
      this.saveProjects(updatedProjects);
      return updatedProjects;
    });
  }
}
