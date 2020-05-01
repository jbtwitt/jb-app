import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgerRoutingModule } from './ledger-routing.module';
import { LedgerMainComponent } from './ledger-main/ledger-main.component';
import { LedgerListComponent } from './ledger-list/ledger-list.component';

@NgModule({
  declarations: [LedgerMainComponent, LedgerListComponent],
  imports: [
    CommonModule,
    LedgerRoutingModule
  ]
})
export class LedgerModule { }
