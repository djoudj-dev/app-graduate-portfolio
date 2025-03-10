import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core';
import { About } from '../../../admin/about/models/about.model';
import { CountersService } from '../../../admin/stats/counters/services/counters.service';
import { ButtonDumbComponent } from '../../../shared/components/button/button.dumb.component';

@Component({
  selector: 'app-about-dumb',
  imports: [CommonModule, ButtonDumbComponent],
  templateUrl: './about.dumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutDumbComponent {
  @Input() set about(value: About | null) {
    this._about.set(value);
  }

  protected readonly _about = signal<About | null>(null);
  protected readonly countersService = inject(CountersService);

  // Configuration des boutons
  protected readonly cvButton = signal({
    variant: 'secondary' as const,
    title: 'Télécharger CV',
    type: 'button' as const,
    img: '/images/icons/download.svg'
  });

  protected readonly githubButton = signal({
    variant: 'accent' as const,
    title: 'GitHub',
    type: 'button' as const,
    img: '/images/icons/github.svg'
  });

  protected readonly linkedinButton = signal({
    variant: 'primary' as const,
    title: 'LinkedIn',
    type: 'button' as const,
    img: '/images/icons/linkedin.svg'
  });

  protected onDownloadCVClick() {
    this.countersService.incrementCounter('cv').subscribe({
      next: (counters) => {
        console.log('CV counter updated:', counters);
        if (this._about()?.cvLink) {
          window.open(this._about()!.cvLink, '_blank');
        }
      },
      error: (err) => {
        console.error('Error incrementing CV counter:', err);
      }
    });
  }

  protected onOpenGitHubClick() {
    this.countersService.incrementCounter('github').subscribe({
      next: (counters) => {
        console.log('GitHub counter updated:', counters);
        if (this._about()?.githubLink) {
          window.open(this._about()!.githubLink, '_blank');
        }
      },
      error: (err) => {
        console.error('Error incrementing GitHub counter:', err);
      }
    });
  }

  protected onOpenLinkedInClick() {
    this.countersService.incrementCounter('linkedin').subscribe({
      next: (counters) => {
        console.log('LinkedIn counter updated:', counters);
        if (this._about()?.linkedinLink) {
          window.open(this._about()!.linkedinLink, '_blank');
        }
      },
      error: (err) => {
        console.error('Error incrementing LinkedIn counter:', err);
      }
    });
  }
}
