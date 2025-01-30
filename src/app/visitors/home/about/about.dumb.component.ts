import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage],
  templateUrl: './about.dumb.component.html',
  styleUrl: './about.dumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutDumbComponent {}
