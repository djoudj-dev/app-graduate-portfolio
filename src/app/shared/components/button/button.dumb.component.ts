import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [class]="getButtonClasses()"
      (click)="clicked.emit()"
    >
      <div class="flex items-center justify-center gap-2">
        @if (img()) {
          <img width="32" height="32" class="w-6 h-6" [src]="img()" [alt]="''" />
        }
        {{ title() }}
      </div>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonDumbComponent {
  title = input.required<string>();
  type = input.required<'button' | 'submit' | 'reset' | 'cancel'>();
  disabled = input<boolean>(false);
  variant = input<'primary' | 'secondary' | 'accent'>('primary');
  img = input<string>();

  clicked = output<void>();

  getButtonClasses(): string {
    const baseClasses = `w-max text-lg px-4 py-2 mt-4
                        border border-text rounded-md
                        shadow-lg
                        transition-all duration-300 ease-in-out
                        hover:scale-105 hover:-translate-y-1
                        active:scale-95
                        disabled:opacity-50 disabled:cursor-not-allowed
                        disabled:hover:scale-100 disabled:hover:translate-y-0`;

    const variantClasses = {
      primary: 'bg-primary hover:bg-primary/80 shadow-primary/50',
      secondary: 'bg-secondary hover:bg-secondary/80 shadow-secondary/50',
      accent: 'bg-accent hover:bg-accent/80 shadow-accent/50'
    };

    return `${baseClasses} ${variantClasses[this.variant()]}`;
  }
}
