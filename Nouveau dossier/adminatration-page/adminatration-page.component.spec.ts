import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminatrationPageComponent } from './adminatration-page.component';

describe('AdminatrationPageComponent', () => {
  let component: AdminatrationPageComponent;
  let fixture: ComponentFixture<AdminatrationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminatrationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminatrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
