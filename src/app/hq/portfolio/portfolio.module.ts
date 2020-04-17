import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioMainComponent } from './portfolio-main/portfolio-main.component';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import { MatTableModule, MatSortModule, MatTabsModule } from '@angular/material';

@NgModule({
  declarations: [PortfolioMainComponent, PortfolioListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    PortfolioRoutingModule
  ]
})
export class PortfolioModule { }
