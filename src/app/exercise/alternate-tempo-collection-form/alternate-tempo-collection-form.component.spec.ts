import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlternateTempoCollectionFormComponent } from './alternate-tempo-collection-form.component';

describe('AlternateTempoCollectionFormComponent', () => {
  let component: AlternateTempoCollectionFormComponent;
  let fixture: ComponentFixture<AlternateTempoCollectionFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlternateTempoCollectionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternateTempoCollectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
