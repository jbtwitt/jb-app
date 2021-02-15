import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlternateTempoFormComponent } from './alternate-tempo-form.component';

describe('AlternateTempoFormComponent', () => {
  let component: AlternateTempoFormComponent;
  let fixture: ComponentFixture<AlternateTempoFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlternateTempoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternateTempoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
