import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HqhlMainComponent } from './hqhl-main.component';

describe('HqhlMainComponent', () => {
  let component: HqhlMainComponent;
  let fixture: ComponentFixture<HqhlMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HqhlMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HqhlMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
