import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-calendly-dumb',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  template: `
    <div class="container mx-auto px-4 mt-12">
      <!-- En-tête -->
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-bold text-text">Configuration Calendly</h2>
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="mb-8">
        <div
          class="grid grid-cols-1 gap-6 bg-background/90 p-6 rounded-lg border-2 border-tertiary/20"
        >
          <div class="relative group">
            <input
              type="url"
              formControlName="calendlyUrl"
              class="w-full px-4 py-3 rounded-lg bg-background/90 border-2 border-tertiary/20 focus:border-tertiary/60 outline-none transition-all duration-300 text-text"
              [ngClass]="{
                'border-red-500':
                  form.get('calendlyUrl')?.invalid && form.get('calendlyUrl')?.touched
              }"
              required
            />
            <label
              class="absolute left-4 top-3 text-text/50 transition-all duration-300 transform group-focus-within:-translate-y-[26px] group-focus-within:text-sm"
              [ngClass]="{ '!-translate-y-[26px] !text-sm': form.get('calendlyUrl')?.value }"
            >
              URL Calendly
            </label>
            @if (form.get('calendlyUrl')?.invalid && form.get('calendlyUrl')?.touched) {
              <span class="text-red-500 text-sm mt-1">Veuillez entrer une URL Calendly valide</span>
            }
          </div>

          <!-- Bouton de soumission -->
          <div class="flex justify-end">
            <button
              type="submit"
              [disabled]="form.invalid || isSubmitting"
              class="px-6 py-2 bg-tertiary text-text rounded-lg hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              @if (isSubmitting) {
                <span class="flex items-center gap-2">
                  <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Mise à jour en cours...
                </span>
              } @else {
                Mettre à jour
              }
            </button>
          </div>
        </div>
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
