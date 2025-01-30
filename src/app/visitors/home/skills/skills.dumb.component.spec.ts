import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsDumbComponent } from './skills.dumb.component';

describe('SkillsDumbComponent', () => {
  let component: SkillsDumbComponent;
  let fixture: ComponentFixture<SkillsDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsDumbComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
