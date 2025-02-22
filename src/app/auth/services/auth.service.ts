import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../shared/components/toast/service/toast.service';

interface LoginResponse {
  access_token: string;
  // autres champs si nécessaire
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isAuthenticatedSignal = signal<boolean>(false);
  private readonly TOKEN_KEY = 'auth_token';

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastService: ToastService
  ) {
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = `${environment.apiUrl}/auth/login`;
    console.log('URL de connexion:', url);
    console.log('Données envoyées:', { email, password });

    const payload = {
      email,
      password
      // username: email  // Parfois le backend attend "username" au lieu de "email"
    };

    return firstValueFrom(this.http.post<LoginResponse>(url, payload, { headers }))
      .then((response) => {
        console.log('Succès:', response);
        if (response) {
          console.log('Réponse du serveur:', response);
          const tokenData = {
            token: response.access_token,
            expiresAt: Date.now() + 24 * 60 * 60 * 1000
          };
          localStorage.setItem(this.TOKEN_KEY, JSON.stringify(tokenData));
          this.isAuthenticatedSignal.set(true);
          this.toastService.showAuthLogin('Connexion réussie !');
          this.router.navigate(['/admin/dashboard']);
        }
      })
      .catch((error) => {
        console.error('Erreur complète:', error);
        console.error('Status:', error.status);
        console.error('Message:', error.message);
        this.toastService.showError('Échec de la connexion. Veuillez réessayer.');
        throw error;
      });
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticatedSignal.set(false);
    this.toastService.showAuthLogout('Déconnexion réussie !');
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSignal();
  }
}
