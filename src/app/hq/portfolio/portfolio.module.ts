import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioMainComponent } from './portfolio-main/portfolio-main.component';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { GroupPortfolioListComponent } from './group-portfolio-list/group-portfolio-list.component';
import { MatSelectModule } from '@angular/material/select';
import { SummaryByYearComponent } from './summary-by-year/summary-by-year.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PortfolioMainComponent, PortfolioListComponent, GroupPortfolioListComponent, SummaryByYearComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatSelectModule,
    PortfolioRoutingModule
  ],
  exports: [
    GroupPortfolioListComponent,
  ]
})
export class PortfolioModule { }
