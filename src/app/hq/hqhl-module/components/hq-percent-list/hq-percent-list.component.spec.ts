import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HqPercentListComponent } from './hq-percent-list.component';

describe('HqPercentListComponent', () => {
  let component: HqPercentListComponent;
  let fixture: ComponentFixture<HqPercentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HqPercentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HqPercentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
