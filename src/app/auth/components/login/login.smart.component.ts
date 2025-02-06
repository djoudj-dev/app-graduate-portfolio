import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './login.smart.component.html',
  styleUrl: './login.smart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginSmartComponent {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() loginSuccess = new EventEmitter<void>();

  protected loginForm: FormGroup;
  protected isSubmitting = false;
  protected showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  protected isFieldInvalid(field: string): boolean {
    const formField = this.loginForm.get(field);
    return formField ? formField.invalid && (formField.dirty || formField.touched) : false;
  }

  protected togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  protected closeModal(): void {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }

  protected async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      try {
        const { email, password } = this.loginForm.value;
        await this.authService.login(email, password);
        this.loginSuccess.emit();
        this.closeModal();
        this.loginForm.reset();
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        this.isSubmitting = false;
      }
    } else {
      Object.keys(this.loginForm.controls).forEach((key) => {
        const control = this.loginForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
}
