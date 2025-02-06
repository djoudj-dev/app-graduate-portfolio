import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isAuthenticatedSignal = signal<boolean>(false);
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private router: Router) {
    this.checkToken();
  }

  private checkToken(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    this.isAuthenticatedSignal.set(!!token);
  }

  login(email: string, password: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const fakeToken = 'fake-jwt-token-' + Date.now();
        localStorage.setItem(this.TOKEN_KEY, fakeToken);
        this.isAuthenticatedSignal.set(true);
        this.router.navigate(['/admin/dashboard']);
        resolve();
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticatedSignal.set(false);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSignal();
  }
}
