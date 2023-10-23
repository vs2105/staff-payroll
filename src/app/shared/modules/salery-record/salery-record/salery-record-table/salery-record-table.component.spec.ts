import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleryRecordTableComponent } from './salery-record-table.component';

describe('SaleryRecordTableComponent', () => {
  let component: SaleryRecordTableComponent;
  let fixture: ComponentFixture<SaleryRecordTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleryRecordTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleryRecordTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
