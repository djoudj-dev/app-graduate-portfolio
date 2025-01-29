import { Component } from '@angular/core';
import { AboutDumbComponent } from './about/about.dumb.component';
import { ProjectsDumbComponent } from './projects/projects.dumb.component';
import { ContactDumbComponent } from './contact/contact.dumb.component';

@Component({
  imports: [AboutDumbComponent, ProjectsDumbComponent, ContactDumbComponent],
  templateUrl: './home.page.component.html',
  styleUrl: './home.page.component.scss'
})
export class HomePageComponent {}
