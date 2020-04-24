import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioMainComponent } from './portfolio-main/portfolio-main.component';
import { HqhistoryListComponent } from '../hqhistory/hqhistory-list/hqhistory-list.component';

const routes: Routes = [
  {
    path: 'portfolio',
    component: PortfolioMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
