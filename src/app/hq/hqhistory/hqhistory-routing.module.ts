import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HqhistoryListComponent } from './hqhistory-list/hqhistory-list.component';

const routes: Routes = [
  {
    path: "hqhistory/:csvPath",
    component: HqhistoryListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HqhistoryRoutingModule { }
