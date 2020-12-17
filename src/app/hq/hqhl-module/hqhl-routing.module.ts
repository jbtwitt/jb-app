import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HqPlayMainComponent } from './hq-play-main/hq-play-main.component';
import { HqhlMainComponent } from './hqhl-main/hqhl-main.component';

const routes: Routes = [
  {
    path: 'hqhl',
    component: HqhlMainComponent,
  },
  {
    path: 'hqplay',
    component: HqPlayMainComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HqhlRoutingModule { }
