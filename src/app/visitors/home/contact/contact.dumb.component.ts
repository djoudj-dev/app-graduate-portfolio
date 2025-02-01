import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './contact.dumb.component.html',
  styleUrl: './contact.dumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDumbComponent {
  protected contactForm: FormGroup;
  protected isSubmitting = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  protected isFieldInvalid(field: string): boolean {
    const formField = this.contactForm.get(field);
    return formField ? formField.invalid && (formField.dirty || formField.touched) : false;
  }

  protected async onSubmit(): Promise<void> {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      try {
        // Ici, vous ajouterez la logique d'envoi du formulaire
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulation
        console.log('Form submitted:', this.contactForm.value);
        this.contactForm.reset();
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        this.isSubmitting = false;
      }
    } else {
      Object.keys(this.contactForm.controls).forEach((key) => {
        const control = this.contactForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
}
