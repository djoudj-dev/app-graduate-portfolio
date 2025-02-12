import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSmartComponent } from './about.smart.component';

describe('AboutSmartComponent', () => {
  let component: AboutSmartComponent;
  let fixture: ComponentFixture<AboutSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutSmartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
