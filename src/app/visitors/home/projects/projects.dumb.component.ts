// Importation des modules nécessaires
import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { startWith } from 'rxjs/operators';
import { ProjectsService } from '../../../core/services/projects.service';

// Décorateur du composant avec ses métadonnées
@Component({
  selector: 'app-projects', // Sélecteur utilisé pour intégrer le composant
  standalone: true, // Composant autonome (nouvelle fonctionnalité Angular)
  imports: [NgOptimizedImage, ReactiveFormsModule], // Modules importés localement
  templateUrl: './projects.dumb.component.html', // Template HTML associé
  styleUrl: './projects.dumb.component.scss', // Styles SCSS associés
  changeDetection: ChangeDetectionStrategy.OnPush // Stratégie de détection des changements optimisée
})
export class ProjectsDumbComponent {
  // Injection du service des projets
  private readonly projectsService = inject(ProjectsService);

  // Contrôle de formulaire pour la recherche
  protected readonly searchControl = new FormControl('');

  // Conversion du flux de valeurs du contrôle de recherche en signal
  private readonly searchTerm = toSignal(this.searchControl.valueChanges.pipe(startWith('')));

  // Signal calculé pour filtrer les projets en fonction du terme de recherche
  protected readonly filteredProjects = computed(() => {
    // Récupération et nettoyage du terme de recherche
    const term = (this.searchTerm()?.toLowerCase() || '').trim();
    const projects = this.projectsService.getProjects()();

    // Si aucun terme de recherche, retourne les 4 projets les plus récents
    if (!term) {
      return projects.sort((a, b) => b.id - a.id).slice(0, 4);
    }

    // Sinon, filtre les projets selon le terme de recherche
    return projects
      .filter(
        (project) =>
          project.title.toLowerCase().includes(term) ||
          project.description.toLowerCase().includes(term) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(term))
      )
      .sort((a, b) => b.id - a.id)
      .slice(0, 4);
  });

  // Méthode pour réinitialiser la recherche
  clearSearch(): void {
    this.searchControl.setValue('');
  }
}
