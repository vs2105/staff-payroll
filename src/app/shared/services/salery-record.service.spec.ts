import { TestBed } from '@angular/core/testing';

import { SaleryRecordService } from './salery-record.service';

describe('SaleryRecordService', () => {
  let service: SaleryRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleryRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
