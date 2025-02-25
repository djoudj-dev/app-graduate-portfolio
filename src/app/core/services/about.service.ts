import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { About } from '../../admin/about/models/about.model';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly apiUrl = `${environment.apiUrl}/about`;
  private readonly aboutSignal = signal<About | null>(null);

  constructor() {
    this.loadAbout();
  }

  // Signal calculé pour accéder aux données about
  readonly about = computed(() => this.aboutSignal());

  refresh(): void {
    this.loadAbout();
  }

  private loadAbout(): void {
    this.http
      .get<About[]>(this.apiUrl)
      .pipe(
        retry(3),
        map((aboutArray) => {
          // Prendre le dernier élément du tableau (le plus récent)
          if (aboutArray && aboutArray.length > 0) {
            return aboutArray[aboutArray.length - 1];
          }
          throw new Error('Aucune donnée about trouvée');
        }),
        catchError((error: HttpErrorResponse | Error) => {
          console.error('Erreur lors du chargement des informations about:', error);
          // Retourner un objet About complet avec tous les champs initialisés
          return of({
            name: '',
            title: '',
            description: '',
            quote: '',
            quoteFooter: '',
            softSkillsTitle: '',
            soft_skills: [],
            cvLink: '',
            githubLink: '',
            linkedinLink: '',
            profileImage: ''
          });
        })
      )
      .subscribe({
        next: (about) => {
          this.aboutSignal.set(about);
        },
        error: (error) => {
          console.error('Erreur lors du chargement des informations about:', error);
          // Même initialisation complète ici
          this.aboutSignal.set({
            name: '',
            title: '',
            description: '',
            quote: '',
            quoteFooter: '',
            softSkillsTitle: '',
            soft_skills: [],
            cvLink: '',
            githubLink: '',
            linkedinLink: '',
            profileImage: ''
          });
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

  async getAbout(): Promise<About | null> {
    if (this.aboutSignal()) {
      return this.aboutSignal();
    }

    await this.loadAbout();
    return this.aboutSignal();
  }

  async updateAbout(aboutData: About): Promise<void> {
    try {
      const headers = this.getAuthHeaders();
      console.log("En-têtes d'authentification:", headers);

      // Vérifier si l'API est disponible en faisant d'abord un GET
      const apiExists = await this.checkApiExists();

      if (!apiExists) {
        console.log("L'API n'est pas disponible, simulation de mise à jour");
        // Simuler une mise à jour réussie en local
        this.aboutSignal.set(aboutData);
        return;
      }

      // Si aboutData n'a pas d'ID, utiliser directement l'objet du signal
      if (!aboutData.id) {
        const currentAbout = this.aboutSignal();
        if (currentAbout && currentAbout.id) {
          aboutData.id = currentAbout.id;
        } else {
          // Si nous n'avons toujours pas d'ID, essayons de créer un nouvel enregistrement
          console.log("Aucun ID trouvé, tentative de création d'un nouvel enregistrement");
          const createdAbout = await firstValueFrom(
            this.http.put<About>(this.apiUrl, aboutData, {
              headers,
              withCredentials: true
            })
          );

          if (createdAbout) {
            this.aboutSignal.set(createdAbout);
          }
          return;
        }
      }

      const id = aboutData.id;
      const updatedAbout = await firstValueFrom(
        this.http.put<About>(`${this.apiUrl}/${id}`, aboutData, {
          headers,
          withCredentials: true
        })
      );

      if (updatedAbout) {
        this.aboutSignal.set(updatedAbout);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations about:', error);
      throw error;
    }
  }

  private async checkApiExists(): Promise<boolean> {
    try {
      await firstValueFrom(this.http.get(this.apiUrl, { observe: 'response' }));
      return true;
    } catch (error) {
      return false;
    }
  }
}
