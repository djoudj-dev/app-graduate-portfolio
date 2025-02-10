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
    const tokenStr = localStorage.getItem(this.TOKEN_KEY);
    if (tokenStr) {
      try {
        const tokenData = JSON.parse(tokenStr);
        const isValid = tokenData.expiresAt > Date.now();
        if (!isValid) {
          this.logout();
          return;
        }
        this.isAuthenticatedSignal.set(true);
      } catch (error) {
        // Si le token n'est pas un JSON valide, on le supprime
        this.logout();
      }
    } else {
      this.isAuthenticatedSignal.set(false);
    }
  }

  login(email: string, password: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Création d'un objet contenant le token et sa date d'expiration
        const tokenData = {
          token: 'fake-jwt-token-' + Date.now(),
          expiresAt: Date.now() + 24 * 60 * 60 * 1000 // Expire dans 24 heures
        };
        localStorage.setItem(this.TOKEN_KEY, JSON.stringify(tokenData));
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
