import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HqhlListComponent } from './hqhl-list.component';

describe('HqhlListComponent', () => {
  let component: HqhlListComponent;
  let fixture: ComponentFixture<HqhlListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HqhlListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HqhlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
