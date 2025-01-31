import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.dumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
    <button
      [type]="type()"
      [disabled]="disabled()"
      (click)="clicked.emit()"
    >
      {{ title() }}
    </button>
  `
  ]
})
export class ButtonDumbComponent {
  title = input.required<string>();
  type = input.required<'button' | 'submit' | 'reset' | 'cancel'>();
  disabled = input<boolean>(false);

  clicked = output<void>();
}
