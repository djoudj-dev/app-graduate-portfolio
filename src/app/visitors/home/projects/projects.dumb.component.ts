import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.dumb.component.html',
  styleUrl: './projects.dumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsDumbComponent {}
