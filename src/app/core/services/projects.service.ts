import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Project } from '../../admin/projects/models/project.model';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly apiUrl = `${environment.apiUrl}/projects`;
  private readonly projectsSignal = signal<Project[]>([]);

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {
    this.loadProjects();
  }

  // Signal calculé pour les 4 projets les plus récents
  readonly recentProjects = computed(() =>
    this.projectsSignal()
      .sort((a, b) => b.id - a.id)
      .slice(0, 4)
  );

  // Pour la page complète des projets
  getProjects() {
    return computed(() => this.projectsSignal());
  }

  refresh(): void {
    this.loadProjects();
  }

  private loadProjects(): void {
    this.http
      .get<Project[]>(this.apiUrl)
      .pipe(
        retry(3), // Réessaie 3 fois en cas d'échec
        map((projects) => projects || []), // Garantit un tableau même si null
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur détaillée lors du chargement des projets:', {
            status: error.status,
            message: error.message,
            error: error.error
          });
          return of([]); // Retourne un Observable avec un tableau vide
        })
      )
      .subscribe({
        next: (projects) => {
          // S'assure que chaque projet a des valeurs par défaut pour les tableaux
          const safeProjects = projects.map((project) => ({
            ...project,
            technologies: project.technologies || [],
            github_links: project.github_links || '',
            secondary_github_links: project.secondary_github_links || ''
          }));
          this.projectsSignal.set(safeProjects);
        },
        error: (error) => {
          console.error('Erreur lors du chargement des projets:', error);
          this.projectsSignal.set([]);
        }
      });
  }

  // Méthode utilitaire pour obtenir les headers avec le token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      console.error("Tentative d'accès sans token");
      this.authService.logout();
      throw new Error('Non authentifié');
    }

    // Vérification de la validité du token
    try {
      // Vous pouvez ajouter ici une vérification supplémentaire du token si nécessaire
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
    } catch (error) {
      console.error('Erreur lors de la création des headers:', error);
      this.authService.logout();
      throw new Error('Token invalide');
    }
  }

  async createProject(projectData: Omit<Project, 'id'>): Promise<void> {
    try {
      const headers = this.getAuthHeaders();
      const newProject = await this.http
        .post<Project>(this.apiUrl, projectData, { headers })
        .toPromise();
      if (newProject) {
        this.projectsSignal.update((projects) => [...projects, newProject]);
      }
    } catch (error) {
      console.error('Erreur lors de la création du projet:', error);
      throw error;
    }
  }

  async updateProject(id: number, projectData: Partial<Project>): Promise<void> {
    try {
      const headers = this.getAuthHeaders();

      // Vérification du token avant l'envoi
      if (!headers.get('Authorization')) {
        throw new Error("Token d'authentification manquant");
      }

      const updatedProject = await firstValueFrom(
        this.http.put<Project>(`${this.apiUrl}/${id}`, projectData, {
          headers,
          withCredentials: true // Ajoute les cookies à la requête si nécessaire
        })
      );

      if (updatedProject) {
        this.projectsSignal.update((projects) =>
          projects.map((project) => (project.id === id ? updatedProject : project))
        );
      }
    } catch (error) {
      console.error('Erreur détaillée lors de la mise à jour:', error);
      if (error instanceof HttpErrorResponse) {
        if (error.status === 403) {
          // Gestion spécifique de l'erreur 403
          console.error("Erreur d'autorisation - Token invalide ou expiré");
          this.authService.logout(); // Déconnexion si le token est invalide
        }
        console.error('Status:', error.status);
        console.error('Message:', error.message);
        console.error('Error:', error.error);
      }
      throw error;
    }
  }

  async deleteProject(id: number): Promise<void> {
    try {
      const headers = this.getAuthHeaders();
      await this.http.delete(`${this.apiUrl}/${id}`, { headers }).toPromise();
      this.projectsSignal.update((projects) => projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du projet:', error);
      throw error;
    }
  }
}
