import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteChauffeurComponent } from './activite-chauffeur.component';

describe('ActiviteChauffeurComponent', () => {
  let component: ActiviteChauffeurComponent;
  let fixture: ComponentFixture<ActiviteChauffeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiviteChauffeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteChauffeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
