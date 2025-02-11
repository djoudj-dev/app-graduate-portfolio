import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsDumbComponent } from './charts.dumb.component';

describe('ChartsDumbComponent', () => {
  let component: ChartsDumbComponent;
  let fixture: ComponentFixture<ChartsDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsDumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
