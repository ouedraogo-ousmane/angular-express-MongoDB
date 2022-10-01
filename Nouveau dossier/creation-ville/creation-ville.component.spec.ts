import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationVilleComponent } from './creation-ville.component';

describe('CreationVilleComponent', () => {
  let component: CreationVilleComponent;
  let fixture: ComponentFixture<CreationVilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationVilleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationVilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
