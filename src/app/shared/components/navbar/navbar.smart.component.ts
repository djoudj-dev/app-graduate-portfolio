import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CountersService } from '../../../admin/stats/counters/services/counters.service';
import { LoginSmartComponent } from '../../../auth/components/login/login.smart.component';
import { AuthService } from '../../../auth/services/auth.service';
import { ButtonDumbComponent } from '../../../shared/components/button/button.dumb.component';
import { ScrollService } from '../../services/scroll.service';

interface NavigationItem {
  href: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.smart.component.html',
  styleUrl: './navbar.smart.component.scss',
  imports: [RouterLink, NgOptimizedImage, NgClass, ButtonDumbComponent, LoginSmartComponent]
})
export class NavbarSmartComponent {
  menuIsOpen = false;
  darkMode = false;
  loginModalOpen = false;
  settingsMenuOpen = false;

  protected showCallButton = signal(true);
  protected readonly navigationItems = signal<NavigationItem[]>([
    { href: '/home#about', label: 'À propos' },
    { href: '/home#skills', label: 'Skills' },
    { href: '/home#projects', label: 'Projets' },
    { href: '/home#contact', label: 'Contact' }
  ]);

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  constructor(
    private router: Router,
    readonly authService: AuthService,
    readonly countersService: CountersService,
    private scrollService: ScrollService
  ) {}

  toggleMenu() {
    this.menuIsOpen = !this.menuIsOpen;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;

    if (this.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  onLogout(): void {
    this.authService.logout();
  }

  onCallClick() {
    this.countersService.incrementCalls();
    this.router.navigate(['/home'], { fragment: 'contact' });
  }

  toggleLoginModal() {
    this.loginModalOpen = !this.loginModalOpen;
  }

  toggleSettingsMenu() {
    this.settingsMenuOpen = !this.settingsMenuOpen;
  }

  navigateToDashboard() {
    this.router.navigate(['/admin/dashboard']);
    this.settingsMenuOpen = false;
  }

  scrollToSection(sectionId: string): void {
    const cleanId = sectionId.replace('home#', '');
    this.scrollService.scrollToElement(cleanId);
    this.menuIsOpen = false;
  }

  // Ajout du gestionnaire d'événements pour fermer le menu en cliquant en dehors
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    // Gestion existante du menu mobile
    const menu = document.getElementById('mobile-menu');
    const hamburgerButton = document.querySelector('[aria-label="Ouvrir/fermer le menu"]');
    const settingsButton = document.querySelector('[aria-label="Menu utilisateur"]');
    const settingsMenu = document.querySelector('.origin-top-right');

    if (
      this.menuIsOpen &&
      menu &&
      !menu.contains(event.target as Node) &&
      !hamburgerButton?.contains(event.target as Node)
    ) {
      this.menuIsOpen = false;
    }

    // Fermeture du menu settings au clic extérieur
    if (
      this.settingsMenuOpen &&
      settingsMenu &&
      !settingsMenu.contains(event.target as Node) &&
      !settingsButton?.contains(event.target as Node)
    ) {
      this.settingsMenuOpen = false;
    }
  }
}
