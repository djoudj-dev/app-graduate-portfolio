import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.dumb.component.html',
  styleUrl: './contact.dumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDumbComponent {}
