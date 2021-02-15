import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HqscanMainComponent } from './hqscan-main/hqscan-main.component';

const routes: Routes = [
  {
    path: "hqscan",
    component: HqscanMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HqscanRoutingModule { }
