import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookmarkMainComponent } from './bookmark-main.component';

describe('BookmarkMainComponent', () => {
  let component: BookmarkMainComponent;
  let fixture: ComponentFixture<BookmarkMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarkMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
