import { Component, inject } from '@angular/core';
import { Project } from '../../visitors/home/projects/models/project.model';
import { AboutSmartComponent } from '../about/about.smart.component';
import { CalendlySmartComponent } from '../calendly/calendly.smart.component';
import { ProjectsSmartComponent } from '../projects/projects.smart.component';
import { ChartsSmartComponent } from '../stats/charts/charts/charts.smart.component';
import { CountersDumbComponent } from '../stats/counters/counters.dumb.component';
import { CountersService } from '../stats/counters/services/counters.service';

@Component({
  standalone: true,
  imports: [
    ProjectsSmartComponent,
    CountersDumbComponent,
    ChartsSmartComponent,
    CalendlySmartComponent,
    AboutSmartComponent
  ],
  templateUrl: './dashboard.page.component.html',
  styleUrl: './dashboard.page.component.scss'
})
export class DashboardPageComponent {
  protected projects: Project[] = [];
  protected readonly countersService = inject(CountersService);
}
