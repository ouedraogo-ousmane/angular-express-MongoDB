import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDepRecetteComponent } from './menu-dep-recette.component';

describe('MenuDepRecetteComponent', () => {
  let component: MenuDepRecetteComponent;
  let fixture: ComponentFixture<MenuDepRecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDepRecetteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDepRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
