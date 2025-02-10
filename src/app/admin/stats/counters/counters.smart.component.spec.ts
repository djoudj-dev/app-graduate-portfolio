import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountersSmartComponent } from './counters.smart.component';

describe('CountersSmartComponent', () => {
  let component: CountersSmartComponent;
  let fixture: ComponentFixture<CountersSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountersSmartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountersSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
