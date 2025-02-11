import { TestBed } from '@angular/core/testing';

import { AdminCalendlyService } from './admin-calendly.service';

describe('AdminCalendlyService', () => {
  let service: AdminCalendlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCalendlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
