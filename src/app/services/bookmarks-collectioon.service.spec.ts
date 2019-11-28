import { TestBed } from '@angular/core/testing';

import { BookmarksCollectioonService } from './bookmarks-collectioon.service';

describe('BookmarksCollectioonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookmarksCollectioonService = TestBed.get(BookmarksCollectioonService);
    expect(service).toBeTruthy();
  });
});
