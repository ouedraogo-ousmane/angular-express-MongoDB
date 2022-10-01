import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventairePanneComponent } from './inventaire-panne.component';

describe('InventairePanneComponent', () => {
  let component: InventairePanneComponent;
  let fixture: ComponentFixture<InventairePanneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventairePanneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventairePanneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
