import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDumbComponent } from './contact.dumb.component';

describe('ContactDumbComponent', () => {
  let component: ContactDumbComponent;
  let fixture: ComponentFixture<ContactDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactDumbComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
