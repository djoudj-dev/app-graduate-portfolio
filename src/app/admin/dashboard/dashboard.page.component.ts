import { Component } from '@angular/core';
import { Project } from '../../visitors/home/projects/models/project.model';
import { ProjectsSmartComponent } from '../projects/projects.smart.component';

@Component({
  standalone: true,
  imports: [ProjectsSmartComponent],
  templateUrl: './dashboard.page.component.html',
  styleUrl: './dashboard.page.component.scss'
})
export class DashboardPageComponent {
  protected projects: Project[] = [];
}
