import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProjectsService } from '../../core/services/projects.service';
import { ToastService } from '../../shared/components/toast/service/toast.service';
import { ProjectFormConfig } from './data/project-form.config';
import { Project } from './models/project.model';
import { ProjectsListComponent } from './projects-list.component';

@Component({
  selector: 'app-projects',
  imports: [NgClass, ReactiveFormsModule, ProjectsListComponent],
  templateUrl: './projects.smart.component.html',
  styleUrl: './projects.smart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsSmartComponent {
  private readonly projectsService = inject(ProjectsService);
  private readonly fb = inject(FormBuilder);
  private readonly toastService = inject(ToastService);

  protected readonly projects = computed(() => this.projectsService.getProjects()() || []);
  protected projectForm = ProjectFormConfig.getFormGroup(this.fb);
  protected showForm = false;
  protected isSubmitting = false;
  protected editingProject: Project | null = null;

  protected isFieldInvalid(field: string): boolean {
    const formField = this.projectForm.get(field);
    return formField ? formField.invalid && (formField.dirty || formField.touched) : false;
  }

  protected openProjectForm(): void {
    this.showForm = true;
    this.editingProject = null;
    this.projectForm = ProjectFormConfig.getFormGroup(this.fb);
  }

  protected cancelForm(): void {
    this.showForm = false;
    this.editingProject = null;
    this.projectForm.reset();
  }

  protected onEditProject(project: Project): void {
    this.editingProject = project;
    this.showForm = true;
    this.projectForm = ProjectFormConfig.getFormGroup(this.fb, project);
  }

  protected onDeleteProject(projectId: number): void {
    this.toastService.showConfirm(
      'Êtes-vous sûr de vouloir supprimer ce projet ?',
      async () => {
        try {
          await this.projectsService.deleteProject(projectId);
          this.toastService.showSuccess('Le projet a été supprimé avec succès !');
        } catch (error) {
          console.error('Erreur lors de la suppression:', error);
          this.toastService.showError(
            'Erreur lors de la suppression du projet. Veuillez réessayer.'
          );
        }
      },
      () => {}
    );
  }

  protected async onSubmit(): Promise<void> {
    if (this.projectForm.valid) {
      this.isSubmitting = true;
      try {
        const projectData = ProjectFormConfig.mapFormDataToProject(this.projectForm.value);

        if (this.editingProject) {
          await this.projectsService.updateProject(this.editingProject.id, projectData);
          this.toastService.showSuccess('Le projet a été mis à jour avec succès !');
        } else {
          await this.projectsService.createProject(projectData);
          this.toastService.showSuccess('Le projet a été créé avec succès !');
        }

        this.cancelForm();
      } catch (error) {
        console.error('Erreur lors de la soumission:', error);
        this.toastService.showError(
          `Erreur lors de ${this.editingProject ? 'la mise à jour' : 'la création'} du projet. Veuillez réessayer.`
        );
      } finally {
        this.isSubmitting = false;
      }
    } else {
      Object.keys(this.projectForm.controls).forEach((key) => {
        const control = this.projectForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
}
