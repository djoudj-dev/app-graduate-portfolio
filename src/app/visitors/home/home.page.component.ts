import { Component, inject } from '@angular/core';
import { AboutService } from '../../core/services/about.service';
import { AboutDumbComponent } from './about/about.dumb.component';
import { ContactDumbComponent } from './contact/contact.dumb.component';
import { ProjectsDumbComponent } from './projects/projects.dumb.component';
import { SkillsDumbComponent } from './skills/skills.dumb.component';

@Component({
  imports: [AboutDumbComponent, ProjectsDumbComponent, ContactDumbComponent, SkillsDumbComponent],
  templateUrl: './home.page.component.html',
  styleUrl: './home.page.component.scss'
})
export class HomePageComponent {
  protected readonly aboutService = inject(AboutService);
}
