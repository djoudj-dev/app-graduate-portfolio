import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, OnDestroy, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './login.smart.component.html',
  styleUrl: './login.smart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginSmartComponent implements OnDestroy {
  isOpen = input.required<boolean>();
  isOpenChange = output<boolean>();
  loginSuccess = output<{ email: string; password: string }>();

  protected loginForm!: FormGroup;
  protected isSubmitting = false;
  protected showPassword = false;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnDestroy() {
    if (this.loginForm) {
      this.loginForm.reset();
    }
  }

  protected isFieldInvalid(field: string): boolean {
    const formField = this.loginForm.get(field);
    return formField ? formField.invalid && (formField.dirty || formField.touched) : false;
  }

  protected togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  protected onClose(): void {
    this.isOpenChange.emit(false);
  }

  protected async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      try {
        const { email, password } = this.loginForm.value;
        this.loginSuccess.emit({ email, password });
        this.onClose();
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
