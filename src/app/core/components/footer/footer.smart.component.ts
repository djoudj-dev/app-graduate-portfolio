import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.smart.component.html',
  styleUrl: './footer.smart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterSmartComponent {
  protected readonly currentYear = new Date().getFullYear();
}
