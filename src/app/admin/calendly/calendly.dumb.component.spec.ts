import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendlyDumbComponent } from './calendly.dumb.component';

describe('CalendlyDumbComponent', () => {
  let component: CalendlyDumbComponent;
  let fixture: ComponentFixture<CalendlyDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendlyDumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendlyDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
