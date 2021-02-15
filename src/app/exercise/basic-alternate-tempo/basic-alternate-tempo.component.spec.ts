import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BasicAlternateTempoComponent } from './basic-alternate-tempo.component';

describe('BasicAlternateTempoComponent', () => {
  let component: BasicAlternateTempoComponent;
  let fixture: ComponentFixture<BasicAlternateTempoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicAlternateTempoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicAlternateTempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
