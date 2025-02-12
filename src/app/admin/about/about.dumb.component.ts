import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { About } from '../../visitors/home/about/models/about.model';

@Component({
  selector: 'app-about-dumb',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  template: `
    <div class="container mx-auto px-4 mt-12">
      <!-- En-tête -->
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-bold text-text">Configuration About</h2>
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="mb-8">
        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-background/90 p-6 rounded-lg border-2 border-tertiary/20"
        >
          <!-- Section Contenu -->
          <div class="md:col-span-2">
            <h4 class="font-medium mb-4">Contenu principal</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Titre -->
              <div class="relative group">
                <input
                  type="text"
                  formControlName="title"
                  class="w-full px-4 py-3 rounded-lg bg-background/90 border-2 border-tertiary/20 focus:border-tertiary/60 outline-none transition-all duration-300 text-text"
                  [ngClass]="{
                    'border-red-500': form.get('title')?.invalid && form.get('title')?.touched
                  }"
                  required
                />
                <label
                  class="absolute left-4 top-3 text-text/50 transition-all duration-300 transform group-focus-within:-translate-y-[26px] group-focus-within:text-sm"
                  [ngClass]="{ '!-translate-y-[26px] !text-sm': form.get('title')?.value }"
                >
                </label>
                @if (form.get('title')?.invalid && form.get('title')?.touched) {
                  <span class="text-red-500 text-sm mt-1">Le titre est requis</span>
                }
              </div>

              <!-- Sous-titre -->
              <div class="relative group">
                <input
                  type="text"
                  formControlName="subtitle"
                  class="w-full px-4 py-3 rounded-lg bg-background/90 border-2 border-tertiary/20 focus:border-tertiary/60 outline-none transition-all duration-300 text-text"
                  [ngClass]="{
                    'border-red-500': form.get('subtitle')?.invalid && form.get('subtitle')?.touched
                  }"
                  required
                />
                <label
                  class="absolute left-4 top-3 text-text/50 transition-all duration-300 transform group-focus-within:-translate-y-[26px] group-focus-within:text-sm"
                  [ngClass]="{ '!-translate-y-[26px] !text-sm': form.get('subtitle')?.value }"
                >
                </label>
                @if (form.get('subtitle')?.invalid && form.get('subtitle')?.touched) {
                  <span class="text-red-500 text-sm mt-1">Le sous-titre est requis</span>
                }
              </div>

              <!-- Description -->
              <div class="relative group md:col-span-2">
                <textarea
                  formControlName="description"
                  rows="4"
                  class="w-full px-4 py-3 rounded-lg bg-background/90 border-2 border-tertiary/20 focus:border-tertiary/60 outline-none transition-all duration-300 text-text resize-none"
                  [ngClass]="{
                    'border-red-500':
                      form.get('description')?.invalid && form.get('description')?.touched
                  }"
                  required
                ></textarea>
                <label
                  class="absolute left-4 top-3 text-text/50 transition-all duration-300 transform group-focus-within:-translate-y-[26px] group-focus-within:text-sm"
                  [ngClass]="{ '!-translate-y-[26px] !text-sm': form.get('description')?.value }"
                >
                </label>
                @if (form.get('description')?.invalid && form.get('description')?.touched) {
                  <span class="text-red-500 text-sm mt-1">La description est requise</span>
                }
              </div>
            </div>
          </div>

          <!-- Section Citation -->
          <div class="md:col-span-2">
            <h4 class="font-medium mb-4">Citation</h4>
            <div class="grid grid-cols-1 gap-6">
              <div class="relative group">
                <textarea
                  formControlName="quote"
                  rows="2"
                  class="w-full px-4 py-3 rounded-lg bg-background/90 border-2 border-tertiary/20 focus:border-tertiary/60 outline-none transition-all duration-300 text-text resize-none"
                  [ngClass]="{
                    'border-red-500': form.get('quote')?.invalid && form.get('quote')?.touched
                  }"
                  required
                ></textarea>
                <label
                  class="absolute left-4 top-3 text-text/50 transition-all duration-300 transform group-focus-within:-translate-y-[26px] group-focus-within:text-sm"
                  [ngClass]="{ '!-translate-y-[26px] !text-sm': form.get('quote')?.value }"
                >
                </label>
                @if (form.get('quote')?.invalid && form.get('quote')?.touched) {
                  <span class="text-red-500 text-sm mt-1">La citation est requise</span>
                }
              </div>

              <div class="relative group">
                <input
                  type="text"
                  formControlName="quoteFooter"
                  class="w-full px-4 py-3 rounded-lg bg-background/90 border-2 border-tertiary/20 focus:border-tertiary/60 outline-none transition-all duration-300 text-text"
                  [ngClass]="{
                    'border-red-500':
                      form.get('quoteFooter')?.invalid && form.get('quoteFooter')?.touched
                  }"
                  required
                />
                <label
                  class="absolute left-4 top-3 text-text/50 transition-all duration-300 transform group-focus-within:-translate-y-[26px] group-focus-within:text-sm"
                  [ngClass]="{ '!-translate-y-[26px] !text-sm': form.get('quoteFooter')?.value }"
                >
                </label>
                @if (form.get('quoteFooter')?.invalid && form.get('quoteFooter')?.touched) {
                  <span class="text-red-500 text-sm mt-1">L'auteur est requis</span>
                }
              </div>
            </div>
          </div>

          <!-- Section Liens & Documents -->
          <div class="md:col-span-2">
            <h4 class="font-medium mb-4">Liens & Documents</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Upload CV -->
              <div class="relative group">
                <div
                  class="w-full px-4 py-3 rounded-lg bg-background/90 border-2 border-tertiary/20 focus-within:border-tertiary/60 transition-all duration-300"
                >
                  <label class="block text-sm font-medium text-text/50 mb-1"></label>
                  <div class="flex items-center gap-2">
                    <input
                      type="file"
                      (change)="onFileSelected($event)"
                      accept=".pdf"
                      class="hidden"
                      #fileInput
                    />
                    <button
                      type="button"
                      (click)="fileInput.click()"
                      class="px-4 py-2 bg-tertiary/10 hover:bg-tertiary/20 text-text rounded transition-all duration-300"
                    >
                      Choisir un fichier
                    </button>
                    <span class="text-sm text-text/70 truncate">
                      {{ selectedFileName || 'Aucun fichier sélectionné' }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- GitHub URL -->
              <div class="relative group">
                <input
                  type="url"
                  formControlName="githubUrl"
                  class="w-full px-4 py-3 rounded-lg bg-background/90 border-2 border-tertiary/20 focus:border-tertiary/60 outline-none transition-all duration-300 text-text"
                  [ngClass]="{
                    'border-red-500':
                      form.get('githubUrl')?.invalid && form.get('githubUrl')?.touched
                  }"
                  required
                />
                <label
                  class="absolute left-4 top-3 text-text/50 transition-all duration-300 transform group-focus-within:-translate-y-[26px] group-focus-within:text-sm"
                  [ngClass]="{ '!-translate-y-[26px] !text-sm': form.get('githubUrl')?.value }"
                >
                </label>
              </div>
            </div>
          </div>

          <!-- Bouton de soumission -->
          <div class="md:col-span-2 flex justify-end">
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
export class AboutDumbComponent {
  private fb = inject(FormBuilder);

  about = input<About>();
  saved = output<About>();
  fileUploaded = output<File>();

  protected selectedFileName: string | null = null;
  protected isSubmitting = false;

  protected form = this.fb.group({
    title: ['', [Validators.required]],
    subtitle: ['', [Validators.required]],
    description: ['', [Validators.required]],
    quote: ['', [Validators.required]],
    quoteFooter: ['', [Validators.required]],
    cvUrl: ['', [Validators.required]],
    githubUrl: ['', [Validators.required]]
  });

  ngOnInit() {
    if (this.about()) {
      this.form.patchValue({
        title: this.about()?.content.title,
        subtitle: this.about()?.content.subtitle,
        description: this.about()?.content.description,
        quote: this.about()?.content.quote,
        quoteFooter: this.about()?.content.quoteFooter,
        cvUrl: this.about()?.socialLinks.cv,
        githubUrl: this.about()?.socialLinks.github
      });
    }
  }

  protected onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      const formValue = this.form.value;

      const updatedAbout: About = {
        content: {
          title: formValue.title || '',
          subtitle: formValue.subtitle || '',
          description: formValue.description || '',
          quote: formValue.quote || '',
          quoteFooter: formValue.quoteFooter || '',
          softSkillsTitle: this.about()?.content.softSkillsTitle || '',
          softSkills: this.about()?.content.softSkills || []
        },
        socialLinks: {
          cv: formValue.cvUrl || '',
          github: formValue.githubUrl || ''
        },
        profileImage: this.about()?.profileImage || ''
      };

      this.saved.emit(updatedAbout);
      this.isSubmitting = false;
    }
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.type === 'application/pdf') {
        this.selectedFileName = file.name;
        this.fileUploaded.emit(file);
      } else {
        // Gérer l'erreur de type de fichier
        this.selectedFileName = null;
        // Vous pouvez ajouter un toast ou une notification ici
      }
    }
  }
}
