import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleryRecordFormComponent } from './salery-record-form.component';

describe('SaleryRecordFormComponent', () => {
  let component: SaleryRecordFormComponent;
  let fixture: ComponentFixture<SaleryRecordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleryRecordFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleryRecordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
