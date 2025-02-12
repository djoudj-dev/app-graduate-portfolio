import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { startWith } from 'rxjs/operators';
import { ProjectsService } from '../../../core/services/projects.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './projects.dumb.component.html',
  styleUrl: './projects.dumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsDumbComponent {
  private readonly projectsService = inject(ProjectsService);
  protected readonly searchControl = new FormControl('');

  private readonly searchTerm = toSignal(this.searchControl.valueChanges.pipe(startWith('')));

  protected readonly filteredProjects = computed(() => {
    const term = (this.searchTerm()?.toLowerCase() || '').trim();
    const projects = this.projectsService.getProjects()();

    if (!term) {
      return projects.sort((a, b) => b.id - a.id).slice(0, 4);
    }

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

  clearSearch(): void {
    this.searchControl.setValue('');
  }
}
