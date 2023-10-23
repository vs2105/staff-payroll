import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeTableComponent } from './employe-table.component';

describe('EmployeTableComponent', () => {
  let component: EmployeTableComponent;
  let fixture: ComponentFixture<EmployeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
