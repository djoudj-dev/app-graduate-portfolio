import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDumbComponent } from './about.dumb.component';

describe('AboutDumbComponent', () => {
  let component: AboutDumbComponent;
  let fixture: ComponentFixture<AboutDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutDumbComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
