import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AboutService } from '../../core/services/about.service';
import { ToastService } from '../../shared/components/toast/service/toast.service';
import { AboutFormConfig } from './data/about-form.config';

@Component({
  selector: 'app-about-smart',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './about.smart.component.html',
  styleUrl: './about.smart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutSmartComponent {
  protected readonly aboutService = inject(AboutService);
  private readonly toastService = inject(ToastService);
  private readonly fb = inject(FormBuilder);

  protected aboutForm!: FormGroup;
  protected isSubmitting = false;

  constructor() {
    this.initForm();
    this.aboutService.refresh();
  }

  private initForm(): void {
    const about = this.aboutService.about();
    this.aboutForm = AboutFormConfig.getFormGroup(this.fb, about);
  }

  protected isFieldInvalid(fieldName: string): boolean {
    const control = this.aboutForm.get(fieldName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  protected async onSubmit(): Promise<void> {
    console.log('onSubmit appelé', this.aboutForm.value);
    if (this.aboutForm.invalid) {
      this.toastService.showError('Formulaire invalide. Veuillez corriger les erreurs.');
      return;
    }

    const formValues = this.aboutForm.value;
    const about = this.aboutService.about();

    // Forcer la détection des modifications pour LinkedIn
    let hasChanges = true;

    // Vérifier les modifications dans le groupe content
    if (about) {
      const contentGroup = formValues.content;
      if (contentGroup) {
        if (contentGroup.name !== about.name) hasChanges = true;
        if (contentGroup.title !== about.title) hasChanges = true;
        if (contentGroup.description !== about.description) hasChanges = true;
        if (contentGroup.softSkillsTitle !== about.softSkillsTitle) hasChanges = true;

        // Vérifier si les soft skills ont changé
        if (contentGroup.soft_skills?.length !== about.soft_skills?.length) {
          hasChanges = true;
        } else if (about.soft_skills && contentGroup.soft_skills) {
          for (let i = 0; i < contentGroup.soft_skills.length; i++) {
            if (contentGroup.soft_skills[i] !== about.soft_skills[i]) {
              hasChanges = true;
              break;
            }
          }
        }
      }
    }

    if (hasChanges || !about) {
      this.isSubmitting = true;
      try {
        const aboutData = {
          name: formValues.content.name,
          title: formValues.content.title,
          description: formValues.content.description,
          quote: formValues.content.quote,
          quoteFooter: formValues.content.quoteFooter,
          softSkillsTitle: formValues.content.softSkillsTitle,
          soft_skills: formValues.content.soft_skills,
          cvLink: formValues.socialLinks.cv,
          githubLink: formValues.socialLinks.github,
          linkedinLink: formValues.socialLinks.linkedin,
          profileImage: formValues.profileImage,
          id: about?.id
        };

        console.log('Données mappées:', aboutData);
        await this.aboutService.updateAbout(aboutData);
        this.toastService.showSuccess('Informations mises à jour avec succès');
      } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
        this.toastService.showError('Erreur lors de la mise à jour des informations');
      } finally {
        this.isSubmitting = false;
      }
    } else {
      this.toastService.showWarning('Aucune modification détectée');
    }
  }

  protected getInvalidControls() {
    const invalid = [];
    const controls = this.aboutForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push({
          name: name,
          errors: controls[name].errors
        });
      }
    }
    return invalid;
  }

  protected checkFormValidity(): void {
    // Vérifier les champs dans le groupe content
    const contentGroup = this.aboutForm.get('content');
    console.log('Groupe content:', contentGroup);

    console.log('Champ name valide?', contentGroup?.get('name')?.valid);
    console.log('Champ title valide?', contentGroup?.get('title')?.valid);
    console.log('Champ description valide?', contentGroup?.get('description')?.valid);

    console.log('Formulaire entier valide?', this.aboutForm.valid);
    console.log('Erreurs du formulaire:', this.getInvalidControls());

    // Afficher la structure complète du formulaire pour débogage
    console.log('Structure du formulaire:', this.aboutForm);
  }

  protected logButtonClick(): void {
    console.log('Bouton cliqué');
  }

  // Getter pour accéder facilement au FormArray des soft skills
  get softSkillsControls() {
    return (this.aboutForm.get('content.soft_skills') as FormArray).controls;
  }

  // Méthode pour ajouter un nouveau soft skill
  protected addSoftSkill(): void {
    const softSkills = this.aboutForm.get('content.soft_skills') as FormArray;
    softSkills.push(this.fb.control(''));
  }

  // Méthode pour supprimer un soft skill
  protected removeSoftSkill(index: number): void {
    const softSkills = this.aboutForm.get('content.soft_skills') as FormArray;
    softSkills.removeAt(index);
  }
}
