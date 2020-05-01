import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LedgerMainComponent } from './ledger-main/ledger-main.component';

const routes: Routes = [
  {
    path: 'ledger',
    component: LedgerMainComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LedgerRoutingModule { }
