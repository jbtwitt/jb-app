import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HqstatMainComponent } from './hqstat-main.component';

describe('HqstatMainComponent', () => {
  let component: HqstatMainComponent;
  let fixture: ComponentFixture<HqstatMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HqstatMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HqstatMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
