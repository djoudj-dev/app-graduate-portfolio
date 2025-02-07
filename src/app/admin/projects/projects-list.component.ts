import { NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Project } from '../../visitors/home/projects/models/project.model';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <div class="bg-background/90 rounded-lg border border-tertiary/20">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-tertiary/5 border-b border-tertiary/20">
            <tr>
              <th
                class="px-6 py-4 text-left text-sm font-medium text-text/70 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                class="px-6 py-4 text-left text-sm font-medium text-text/70 uppercase tracking-wider"
              >
                Titre
              </th>
              <th
                class="px-6 py-4 text-left text-sm font-medium text-text/70 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                class="px-6 py-4 text-left text-sm font-medium text-text/70 uppercase tracking-wider"
              >
                Technologies
              </th>
              <th
                class="px-6 py-4 text-left text-sm font-medium text-text/70 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            @for (project of projects(); track project.id) {
              <tr class="hover:bg-tertiary/5 transition-colors">
                <td class="px-6 py-4 text-sm text-text whitespace-nowrap">{{ project.id }}</td>
                <td class="px-6 py-4 text-sm text-text">{{ project.title }}</td>
                <td class="px-6 py-4 text-sm text-text">
                  {{ project.description.slice(0, 100) }}...
                </td>
                <td class="px-6 py-4">
                  <div class="flex flex-wrap gap-2">
                    @for (tech of project.technologies; track tech) {
                      <div class="flex items-center gap-1 px-2 py-1 rounded-full bg-tertiary/10">
                        <img
                          ngSrc="/images/icons/{{ tech.toLowerCase() }}.svg"
                          [alt]="tech"
                          class="w-4 h-4"
                          width="16"
                          height="16"
                        />
                        <span class="text-xs text-text">{{ tech }}</span>
                      </div>
                    }
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <button
                      (click)="editProject.emit(project)"
                      class="p-2 text-tertiary hover:text-text transition-colors duration-300"
                    >
                      <img
                        ngSrc="/images/icons/edit.svg"
                        alt="Éditer"
                        class="w-5 h-5"
                        width="20"
                        height="20"
                      />
                    </button>
                    <button
                      (click)="deleteProject.emit(project.id)"
                      class="p-2 text-red-500 hover:text-red-600 transition-colors duration-300"
                    >
                      <img
                        ngSrc="/images/icons/delete.svg"
                        alt="Supprimer"
                        class="w-5 h-5"
                        width="20"
                        height="20"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ProjectsListComponent {
  projects = input.required<Project[]>();
  editProject = output<Project>();
  deleteProject = output<number>();
}
