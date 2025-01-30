import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage, NgClass],
  templateUrl: './navbar.smart.component.html',
  styleUrl: './navbar.smart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarSmartComponent {
  menuIsOpen = false;
  darkMode = false;

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
}
