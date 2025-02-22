import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterSmartComponent } from './shared/components/footer/footer.smart.component';
import { NavbarSmartComponent } from './shared/components/navbar/navbar.smart.component';
import { ToastComponent } from './shared/components/toast/toast.smart.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarSmartComponent, FooterSmartComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app-graduate-portfolio';
}
