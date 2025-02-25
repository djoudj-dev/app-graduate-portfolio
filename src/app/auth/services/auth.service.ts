import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../shared/components/toast/service/toast.service';

interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    roles?: string[];
    // autres propriétés utilisateur
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isAuthenticatedSignal = signal<boolean>(false);
  private readonly userSignal = signal<any>(null);
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
        // Vérifier si le token existe et n'est pas expiré
        if (!tokenData.token || !tokenData.expiresAt || tokenData.expiresAt <= Date.now()) {
          this.logout();
          return;
        }
        this.isAuthenticatedSignal.set(true);
      } catch (error) {
        this.logout();
      }
    } else {
      this.isAuthenticatedSignal.set(false);
    }
  }

  login(email: string, password: string): Promise<void> {
    const url = `${environment.apiUrl}/auth/login`;
    const payload = { email, password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('Données envoyées:', payload);

    return firstValueFrom(this.http.post<LoginResponse>(url, payload, { headers }))
      .then((response) => {
        console.log('Succès:', response);
        if (response) {
          console.log('Réponse du serveur:', response);
          const tokenData = {
            token: response.access_token,
            expiresAt: Date.now() + 24 * 60 * 60 * 1000,
            user: response.user
          };
          localStorage.setItem(this.TOKEN_KEY, JSON.stringify(tokenData));
          this.userSignal.set(response.user);
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
    this.userSignal.set(null);
    this.toastService.showAuthLogout('Déconnexion réussie !');
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSignal();
  }

  getToken(): string | null {
    try {
      const tokenStr = localStorage.getItem(this.TOKEN_KEY);
      if (!tokenStr) {
        console.log('Aucun token trouvé dans le localStorage');
        return null;
      }

      const tokenData = JSON.parse(tokenStr);

      // Vérifier si le token existe et n'est pas expiré
      if (!tokenData.token || !tokenData.expiresAt || tokenData.expiresAt <= Date.now()) {
        console.log('Token expiré ou invalide, suppression...');
        this.logout();
        return null;
      }

      // Mettre à jour les informations utilisateur si disponibles
      if (tokenData.user && !this.userSignal()) {
        this.userSignal.set(tokenData.user);
      }

      console.log('Token récupéré avec succès:', tokenData.token.substring(0, 10) + '...');
      return tokenData.token;
    } catch (error) {
      console.error('Erreur lors de la récupération du token:', error);
      this.logout();
      return null;
    }
  }

  hasPermission(permission: string): boolean {
    try {
      const user = this.userSignal();
      if (!user || !user.roles) return false;

      // Vérifiez si l'utilisateur a le rôle requis
      return user.roles.includes(permission);
    } catch (error) {
      console.error('Erreur lors de la vérification des permissions:', error);
      return false;
    }
  }

  getCurrentUser(): any {
    return this.userSignal();
  }
}
