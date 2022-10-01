import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenererBilanVehiculeComponent } from './generer-bilan-vehicule.component';

describe('GenererBilanVehiculeComponent', () => {
  let component: GenererBilanVehiculeComponent;
  let fixture: ComponentFixture<GenererBilanVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenererBilanVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenererBilanVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
