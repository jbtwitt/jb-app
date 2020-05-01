import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerMainComponent } from './ledger-main.component';

describe('LedgerMainComponent', () => {
  let component: LedgerMainComponent;
  let fixture: ComponentFixture<LedgerMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedgerMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
