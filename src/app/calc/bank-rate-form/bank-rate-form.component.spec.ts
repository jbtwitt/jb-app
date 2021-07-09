import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankRateFormComponent } from './bank-rate-form.component';

describe('BankRateFormComponent', () => {
  let component: BankRateFormComponent;
  let fixture: ComponentFixture<BankRateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankRateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankRateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
