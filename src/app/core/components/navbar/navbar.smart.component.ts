import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginSmartComponent } from '../../../auth/components/login/login.smart.component';
import { ButtonDumbComponent } from '../../../shared/components/button/button.dumb.component';

interface NavigationItem {
  href: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.smart.component.html',
  styleUrl: './navbar.smart.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
    NgClass,
    ButtonDumbComponent,
    LoginSmartComponent
  ]
})
export class NavbarSmartComponent {
  menuIsOpen = false;
  darkMode = false;
  loginModalOpen = false;

  protected showCallButton = signal(true);
  protected readonly navigationItems = signal<NavigationItem[]>([
    { href: '/home#about', label: 'À propos' },
    { href: '/home#skills', label: 'Skills' },
    { href: '/home#projects', label: 'Projets' },
    { href: '/home#contact', label: 'Contact' }
  ]);

  constructor(private router: Router) {}

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

  onCallClick() {
    this.router.navigate(['/home'], { fragment: 'contact' });
  }

  toggleLoginModal() {
    this.loginModalOpen = !this.loginModalOpen;
  }

  // Ajout du gestionnaire d'événements pour fermer le menu en cliquant en dehors
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const menu = document.getElementById('mobile-menu');
    const hamburgerButton = document.querySelector('[aria-label="Ouvrir/fermer le menu"]');

    if (
      this.menuIsOpen &&
      menu &&
      !menu.contains(event.target as Node) &&
      !hamburgerButton?.contains(event.target as Node)
    ) {
      this.menuIsOpen = false;
    }
  }
}
