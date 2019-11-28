import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkMainComponent } from './bookmark-main.component';

describe('BookmarkMainComponent', () => {
  let component: BookmarkMainComponent;
  let fixture: ComponentFixture<BookmarkMainComponent>;

  beforeEach(async(() => {
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
