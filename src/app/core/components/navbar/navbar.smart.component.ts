import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonDumbComponent } from '../../../shared/components/button/button.dumb.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.smart.component.html',
  styleUrl: './navbar.smart.component.scss',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage, ButtonDumbComponent, NgClass]
})
export class NavbarSmartComponent {
  menuIsOpen = false;
  darkMode = false;

  protected showCallButton = signal(true);
  protected navigationItems = signal([
    { href: '/about', label: 'À propos' },
    { href: '/skills', label: 'Compétences' },
    { href: '/projects', label: 'Projets' },
    { href: '/contact', label: 'Contact' }
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
}
