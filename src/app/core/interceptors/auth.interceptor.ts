import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { ToastService } from '../../shared/components/toast/service/toast.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  // Ajouter le token d'authentification si disponible
  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
  } else {
    // Si la requête nécessite une authentification (vers /api/projects par exemple)
    // et qu'aucun token n'est disponible, on peut rediriger l'utilisateur
    if (req.url.includes('/projects') && req.method !== 'GET') {
      authService.logout();
      router.navigate(['/']);
      return throwError(() => new Error('Authentification requise'));
    }
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Erreur 401 = Non autorisé (token invalide ou expiré)
        console.error("Erreur d'authentification:", error);
        authService.logout();
        router.navigate(['/']);
        toastService.showError('Session expirée. Veuillez vous reconnecter.');
        return throwError(() => new Error('Session expirée. Veuillez vous reconnecter.'));
      } else if (error.status === 403) {
        // Erreur 403 = Interdit (permissions insuffisantes)
        console.error("Erreur d'autorisation:", error);
        toastService.showError(
          "Vous n'avez pas les permissions nécessaires pour effectuer cette action."
        );
        return throwError(
          () =>
            new Error("Vous n'avez pas les permissions nécessaires pour effectuer cette action.")
        );
      }
      return throwError(() => error);
    })
  );
};
