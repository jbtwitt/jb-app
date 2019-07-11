import { TestBed } from '@angular/core/testing';

import { AlternateTempoCollectionService } from './alternate-tempo-collection.service';

describe('AlternateTempoCollectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlternateTempoCollectionService = TestBed.get(AlternateTempoCollectionService);
    expect(service).toBeTruthy();
  });
});
