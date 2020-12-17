import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HqhlMainComponent } from './hqhl-main/hqhl-main.component';

const routes: Routes = [
  {
    path: 'hqhl',
    component: HqhlMainComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HqhlRoutingModule { }
