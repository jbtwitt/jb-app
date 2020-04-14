import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioMainComponent } from './portfolio-main/portfolio-main.component';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import { MatTableModule, MatSortModule } from '@angular/material';

@NgModule({
  declarations: [PortfolioMainComponent, PortfolioListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    PortfolioRoutingModule
  ]
})
export class PortfolioModule { }
