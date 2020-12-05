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

@NgModule({
  declarations: [PortfolioMainComponent, PortfolioListComponent, GroupPortfolioListComponent],
  imports: [
    CommonModule,
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
