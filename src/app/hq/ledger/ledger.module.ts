import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgerRoutingModule } from './ledger-routing.module';
import { LedgerMainComponent } from './ledger-main/ledger-main.component';
import { LedgerListComponent } from './ledger-list/ledger-list.component';
import { MatTableModule, MatSortModule, MatTabsModule, MatCardModule } from '@angular/material';
import { PortfolioModule } from '../portfolio/portfolio.module';

@NgModule({
  declarations: [LedgerMainComponent, LedgerListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatCardModule,
    LedgerRoutingModule,
    PortfolioModule,
  ]
})
export class LedgerModule { }
