import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatCounterMainComponent } from './bat-counter-main.component';

describe('BatCounterMainComponent', () => {
  let component: BatCounterMainComponent;
  let fixture: ComponentFixture<BatCounterMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatCounterMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatCounterMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
