import { Component, inject } from '@angular/core';
import { Project } from '../../visitors/home/projects/models/project.model';
import { ProjectsSmartComponent } from '../projects/projects.smart.component';
import { CountersDumbComponent } from '../stats/counters/counters.dumb.component';
import { CountersService } from '../stats/counters/services/counters.service';

@Component({
  standalone: true,
  imports: [ProjectsSmartComponent, CountersDumbComponent],
  templateUrl: './dashboard.page.component.html',
  styleUrl: './dashboard.page.component.scss'
})
export class DashboardPageComponent {
  protected projects: Project[] = [];
  protected readonly countersService = inject(CountersService);
}
