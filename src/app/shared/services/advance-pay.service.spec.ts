import { TestBed } from '@angular/core/testing';

import { AdvancePayService } from './advance-pay.service';

describe('AdvancePayService', () => {
  let service: AdvancePayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvancePayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
