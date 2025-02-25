import { Component, inject } from '@angular/core';
import { AboutSmartComponent } from '../about/about.smart.component';
import { Project } from '../projects/models/project.model';
import { ProjectsSmartComponent } from '../projects/projects.smart.component';
import { ChartsSmartComponent } from '../stats/charts/charts/charts.smart.component';
import { CountersDumbComponent } from '../stats/counters/counters.dumb.component';
import { CountersService } from '../stats/counters/services/counters.service';

@Component({
  imports: [
    ProjectsSmartComponent,
    CountersDumbComponent,
    ChartsSmartComponent,
    AboutSmartComponent
  ],
  templateUrl: './dashboard.page.component.html',
  styleUrl: './dashboard.page.component.scss'
})
export class DashboardPageComponent {
  protected projects: Project[] = [];
  protected readonly countersService = inject(CountersService);
}
