import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBilanComponent } from './table-bilan.component';

describe('TableBilanComponent', () => {
  let component: TableBilanComponent;
  let fixture: ComponentFixture<TableBilanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableBilanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBilanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
