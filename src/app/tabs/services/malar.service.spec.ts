import { TestBed } from '@angular/core/testing';

import { MalarService } from './malar.service';

describe('MalarService', () => {
  let service: MalarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MalarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
