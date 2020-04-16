import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HqstatListComponent } from './hqstat-list.component';

describe('HqstatListComponent', () => {
  let component: HqstatListComponent;
  let fixture: ComponentFixture<HqstatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HqstatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HqstatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
