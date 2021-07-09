import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcMainComponent } from './calc-main.component';

describe('CalcMainComponent', () => {
  let component: CalcMainComponent;
  let fixture: ComponentFixture<CalcMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
