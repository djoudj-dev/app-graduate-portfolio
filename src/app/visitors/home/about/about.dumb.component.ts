import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.dumb.component.html',
  styleUrl: './about.dumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutDumbComponent {}
