import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HqscanMainComponent } from './hqscan-main.component';

describe('HqscanMainComponent', () => {
  let component: HqscanMainComponent;
  let fixture: ComponentFixture<HqscanMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HqscanMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HqscanMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
