import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { About } from '../../visitors/home/about/models/about.model';
import { AboutDumbComponent } from './about.dumb.component';
import { AdminAboutService } from './services/admin-about.service';

@Component({
  selector: 'app-about-smart',
  standalone: true,
  imports: [AboutDumbComponent],
  template: ` <app-about-dumb [about]="aboutService.getAbout()()" (saved)="onSave($event)" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutSmartComponent {
  protected readonly aboutService = inject(AdminAboutService);

  protected onSave(updatedAbout: About) {
    this.aboutService.updateAbout(updatedAbout);
  }
}
