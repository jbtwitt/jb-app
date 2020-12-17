import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HqPlayMainComponent } from './hq-play-main.component';

describe('HqPlayMainComponent', () => {
  let component: HqPlayMainComponent;
  let fixture: ComponentFixture<HqPlayMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HqPlayMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HqPlayMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
