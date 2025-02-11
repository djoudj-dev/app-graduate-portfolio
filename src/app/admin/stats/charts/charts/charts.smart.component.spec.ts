import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsSmartComponent } from './charts.smart.component';

describe('ChartsSmartComponent', () => {
  let component: ChartsSmartComponent;
  let fixture: ComponentFixture<ChartsSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsSmartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
