import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CountersService } from '../../../admin/stats/counters/services/counters.service';
import { ButtonDumbComponent } from '../../../shared/components/button/button.dumb.component';
import { AboutService } from './services/about.service';

@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage, ButtonDumbComponent],
  templateUrl: './about.dumb.component.html',
  styleUrl: './about.dumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutDumbComponent {
  private readonly aboutService = inject(AboutService);
  private readonly about = this.aboutService.getAbout();
  private readonly countersService = inject(CountersService);
  // Computed signals basés sur about
  protected readonly content = computed(() => this.about().content);
  protected readonly socialLinks = computed(() => this.about().socialLinks);
  protected readonly profileImage = computed(() => this.about().profileImage);

  // Computed signals pour les boutons
  protected readonly cvButton = computed(() => ({
    variant: 'secondary' as const,
    title: 'Télécharger mon CV',
    type: 'button' as const,
    img: '/images/icons/download.svg'
  }));

  protected readonly githubButton = computed(() => ({
    variant: 'accent' as const,
    title: 'Mon GitHub',
    type: 'button' as const,
    img: '/images/icons/github.svg'
  }));

  // Méthodes pour gérer les clics
  onDownloadCV(): void {
    this.countersService.incrementCv();
    window.open(this.socialLinks().cv, '_blank');
  }

  onOpenGitHub(): void {
    this.countersService.incrementGithub();
    window.open(this.socialLinks().github, '_blank');
  }
}
