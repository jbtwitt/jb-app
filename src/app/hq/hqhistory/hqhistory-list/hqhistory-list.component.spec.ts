import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HqhistoryListComponent } from './hqhistory-list.component';

describe('HqhistoryListComponent', () => {
  let component: HqhistoryListComponent;
  let fixture: ComponentFixture<HqhistoryListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HqhistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HqhistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
