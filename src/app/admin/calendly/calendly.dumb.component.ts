import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-calendly-dumb',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  template: `
    <div class="p-6 bg-background/90 backdrop-blur-md border-2 border-tertiary/20 rounded-lg">
      <h3 class="text-xl font-bold text-text mb-4">Configuration Calendly</h3>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
        <div class="relative group">
          <input
            type="url"
            formControlName="calendlyUrl"
            class="w-full px-4 py-3 rounded-lg bg-background/90 border-2 border-tertiary/20 focus:border-tertiary/60 outline-none transition-all duration-300 text-text"
            [class.border-red-500]="
              form.get('calendlyUrl')?.invalid && form.get('calendlyUrl')?.touched
            "
            required
          />
          <label
            class="absolute left-4 top-3 text-text/50 transition-all duration-300 transform group-focus-within:-translate-y-[26px] group-focus-within:text-sm"
            [ngClass]="{ '!-translate-y-[26px] !text-sm': form.get('calendlyUrl')?.value }"
          >
            URL Calendly
          </label>
          @if (form.get('calendlyUrl')?.invalid && form.get('calendlyUrl')?.touched) {
            <p class="text-red-500 text-sm mt-1">Veuillez entrer une URL Calendly valide</p>
          }
        </div>

        <button
          type="submit"
          [disabled]="form.invalid || isSubmitting"
          class="px-6 py-2 bg-tertiary text-text rounded-lg hover:-translate-y-1 transition-all duration-300 disabled:opacity-50"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendlyDumbComponent {
  private fb = inject(FormBuilder);

  currentUrl = input<string>();
  saved = output<string>();

  protected isSubmitting = false;

  protected form = this.fb.group({
    calendlyUrl: ['', [Validators.required, Validators.pattern('https://calendly.com/.*')]]
  });

  ngOnInit() {
    if (this.currentUrl()) {
      this.form.patchValue({
        calendlyUrl: this.currentUrl()
      });
    }
  }

  protected onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      const newUrl = this.form.get('calendlyUrl')?.value;
      if (newUrl) {
        this.saved.emit(newUrl);
      }
      this.isSubmitting = false;
    }
  }
}
