import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ButtonDumbComponent } from '../../../shared/components/button/button.dumb.component';

@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage, ButtonDumbComponent, ButtonDumbComponent],
  templateUrl: './about.dumb.component.html',
  styleUrl: './about.dumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutDumbComponent {}
