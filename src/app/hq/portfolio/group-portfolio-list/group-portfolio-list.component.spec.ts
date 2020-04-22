import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPortfolioListComponent } from './group-portfolio-list.component';

describe('GroupPortfolioListComponent', () => {
  let component: GroupPortfolioListComponent;
  let fixture: ComponentFixture<GroupPortfolioListComponent>;

  beforeEach(async(() => {
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
