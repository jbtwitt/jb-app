import { TestBed } from '@angular/core/testing';

import { BasicAlternateTempoMulticastService } from './basic-alternate-tempo-multicast.service';

describe('BasicAlternateTempoMulticastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasicAlternateTempoMulticastService = TestBed.get(BasicAlternateTempoMulticastService);
    expect(service).toBeTruthy();
  });
});
