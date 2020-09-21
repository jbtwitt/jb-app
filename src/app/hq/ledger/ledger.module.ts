import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgerRoutingModule } from './ledger-routing.module';
import { LedgerMainComponent } from './ledger-main/ledger-main.component';
import { LedgerListComponent } from './ledger-list/ledger-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
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
