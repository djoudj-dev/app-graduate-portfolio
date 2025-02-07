import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from '../../visitors/home/projects/models/project.model';
import { ProjectsService } from '../../visitors/home/projects/services/projects.service';
import { ProjectsListComponent } from './projects-list.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, ProjectsListComponent],
  templateUrl: './projects.smart.component.html',
  styleUrl: './projects.smart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsSmartComponent {
  private readonly projectsService = inject(ProjectsService);
  private readonly fb = inject(FormBuilder);

  protected readonly projects = computed(() => this.projectsService.getProjects()() || []);
  protected projectForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    image: ['', [Validators.required]],
    technologies: ['', [Validators.required]],
    githubUrl: [''],
    demoUrl: ['']
  });
  protected showForm = false;
  protected isSubmitting = false;
  protected editingProject: Project | null = null;

  constructor() {
    this.initForm();
  }

  private initForm(project?: Project): void {
    this.projectForm = this.fb.group({
      title: [project?.title || '', [Validators.required]],
      description: [project?.description || '', [Validators.required, Validators.minLength(10)]],
      image: [project?.image || '', [Validators.required]],
      technologies: [project?.technologies.join(', ') || '', [Validators.required]],
      githubUrl: [project?.githubUrl || ''],
      demoUrl: [project?.demoUrl || '']
    });
  }

  protected isFieldInvalid(field: string): boolean {
    const formField = this.projectForm.get(field);
    return formField ? formField.invalid && (formField.dirty || formField.touched) : false;
  }

  protected openProjectForm(): void {
    this.showForm = true;
    this.editingProject = null;
    this.initForm();
  }

  protected cancelForm(): void {
    this.showForm = false;
    this.editingProject = null;
    this.projectForm.reset();
  }

  protected onEditProject(project: Project): void {
    this.editingProject = project;
    this.showForm = true;
    this.initForm(project);
  }

  protected onDeleteProject(projectId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projectsService.deleteProject(projectId);
    }
  }

  protected async onSubmit(): Promise<void> {
    if (this.projectForm.valid) {
      this.isSubmitting = true;
      try {
        const formData = this.projectForm.value;
        const projectData = {
          title: formData.title || '',
          description: formData.description || '',
          image: formData.image || '',
          technologies: formData.technologies?.split(',').map((tech: string) => tech.trim()) || [],
          githubUrl: formData.githubUrl || undefined,
          demoUrl: formData.demoUrl || undefined
        };

        if (this.editingProject) {
          // Mise à jour
          this.projectsService.updateProject(this.editingProject.id, projectData);
        } else {
          // Création
          this.projectsService.createProject(projectData);
        }

        this.cancelForm();
      } catch (error) {
        console.error('Erreur lors de la soumission:', error);
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
