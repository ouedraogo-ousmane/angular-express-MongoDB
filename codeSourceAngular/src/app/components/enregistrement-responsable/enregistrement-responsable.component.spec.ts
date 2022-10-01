import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrementResponsableComponent } from './enregistrement-responsable.component';

describe('EnregistrementResponsableComponent', () => {
  let component: EnregistrementResponsableComponent;
  let fixture: ComponentFixture<EnregistrementResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnregistrementResponsableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregistrementResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
