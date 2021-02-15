import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GroupPortfolioListComponent } from './group-portfolio-list.component';

describe('GroupPortfolioListComponent', () => {
  let component: GroupPortfolioListComponent;
  let fixture: ComponentFixture<GroupPortfolioListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPortfolioListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPortfolioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
