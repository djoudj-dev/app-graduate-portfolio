import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendlySmartComponent } from './calendly.smart.component';

describe('CalendlySmartComponent', () => {
  let component: CalendlySmartComponent;
  let fixture: ComponentFixture<CalendlySmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendlySmartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendlySmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
