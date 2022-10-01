import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuParcComponent } from './menu-parc.component';

describe('MenuParcComponent', () => {
  let component: MenuParcComponent;
  let fixture: ComponentFixture<MenuParcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuParcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuParcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
