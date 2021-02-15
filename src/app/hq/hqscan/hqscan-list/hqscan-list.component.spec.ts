import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HqscanListComponent } from './hqscan-list.component';

describe('HqscanListComponent', () => {
  let component: HqscanListComponent;
  let fixture: ComponentFixture<HqscanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HqscanListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HqscanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
