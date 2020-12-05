import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryByYearComponent } from './summary-by-year.component';

describe('SummaryByYearComponent', () => {
  let component: SummaryByYearComponent;
  let fixture: ComponentFixture<SummaryByYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryByYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
