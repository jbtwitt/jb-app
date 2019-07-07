import { TestBed } from '@angular/core/testing';

import { BasicAlternateTempoService } from './basic-alternate-tempo.service';

describe('BasicAlternateTempoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasicAlternateTempoService = TestBed.get(BasicAlternateTempoService);
    expect(service).toBeTruthy();
  });
});
