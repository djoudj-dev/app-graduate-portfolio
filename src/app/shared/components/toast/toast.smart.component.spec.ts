import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastSmartComponent } from './toast.smart.component';

describe('ToastSmartComponent', () => {
  let component: ToastSmartComponent;
  let fixture: ComponentFixture<ToastSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastSmartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
