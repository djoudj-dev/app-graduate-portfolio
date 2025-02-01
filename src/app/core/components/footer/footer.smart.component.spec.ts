import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSmartComponent } from './footer.smart.component';

describe('FooterSmartComponent', () => {
  let component: FooterSmartComponent;
  let fixture: ComponentFixture<FooterSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterSmartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
