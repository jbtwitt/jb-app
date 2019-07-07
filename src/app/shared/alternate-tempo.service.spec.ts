import { TestBed } from '@angular/core/testing';

import { AlternateTempoService } from './alternate-tempo.service';

describe('AlternateTempoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlternateTempoService = TestBed.get(AlternateTempoService);
    expect(service).toBeTruthy();
  });
});
