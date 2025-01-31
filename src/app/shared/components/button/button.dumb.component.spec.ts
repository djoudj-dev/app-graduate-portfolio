import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDumbComponent } from './button.dumb.component';

describe('ButtonDumbComponent', () => {
  let component: ButtonDumbComponent;
  let fixture: ComponentFixture<ButtonDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonDumbComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
