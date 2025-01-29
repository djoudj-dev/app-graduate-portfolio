import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsDumbComponent } from './projects.dumb.component';

describe('ProjectsDumbComponent', () => {
  let component: ProjectsDumbComponent;
  let fixture: ComponentFixture<ProjectsDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsDumbComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
