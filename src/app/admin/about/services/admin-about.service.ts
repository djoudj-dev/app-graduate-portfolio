import { Injectable, inject } from '@angular/core';
import { About } from '../../../visitors/home/about/models/about.model';
import { AboutService } from '../../../visitors/home/about/services/about.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAboutService {
  private readonly aboutService = inject(AboutService);

  getAbout() {
    return this.aboutService.getAbout();
  }

  updateAbout(about: About) {
    this.aboutService.updateAbout(about);
  }
}
