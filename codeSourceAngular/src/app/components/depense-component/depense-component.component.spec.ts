import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenseComponentComponent } from './depense-component.component';

describe('DepenseComponentComponent', () => {
  let component: DepenseComponentComponent;
  let fixture: ComponentFixture<DepenseComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepenseComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepenseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
