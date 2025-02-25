import { FormBuilder, Validators } from '@angular/forms';
import { Project } from '../models/project.model';

export interface ProjectFormData {
  title: string;
  description: string;
  image_url: string;
  technologies: string[];
  demo_url: string;
  github_links: string;
  secondary_github_links: string;
  created_at: Date;
  updated_at: Date;
}

export class ProjectFormConfig {
  static getFormGroup(fb: FormBuilder, project?: Project) {
    return fb.group({
      title: [project?.title || '', [Validators.required]],
      description: [project?.description || '', [Validators.required, Validators.minLength(10)]],
      image_url: [project?.image_url || '', [Validators.required]],
      technologies: [project?.technologies.join(', ') || '', [Validators.required]],
      githubUrl: [project?.github_links || ''],
      secondaryGithubUrl: [project?.secondary_github_links || ''],
      demoUrl: [project?.demo_url || '']
    });
  }

  static mapFormDataToProject(formData: any): ProjectFormData {
    return {
      title: formData.title || '',
      description: formData.description || '',
      image_url: formData.image_url || '',
      technologies: formData.technologies?.split(',').map((tech: string) => tech.trim()) || [],
      demo_url: formData.demoUrl || '',
      github_links: formData.githubUrl || '',
      secondary_github_links: formData.secondaryGithubUrl || '',
      created_at: new Date(),
      updated_at: new Date()
    };
  }
}
