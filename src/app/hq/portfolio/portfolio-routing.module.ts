import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioMainComponent } from './portfolio-main/portfolio-main.component';
import { HqhistoryListComponent } from '../hqstat/hqhistory-list/hqhistory-list.component';

const routes: Routes = [
  {
    path: 'portfolio',
    component: PortfolioMainComponent,
  },
  {
    path: "hqhistory/:csvPath",
    component: HqhistoryListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
