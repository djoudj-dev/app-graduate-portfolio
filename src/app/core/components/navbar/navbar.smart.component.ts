import { NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonDumbComponent } from '../../../shared/components/button/button.dumb.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage, NgClass, ButtonDumbComponent],
  templateUrl: './navbar.smart.component.html',
  styleUrl: './navbar.smart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarSmartComponent {
  menuIsOpen = false;
  darkMode = false;

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
