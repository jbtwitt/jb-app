import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HqstatMainComponent } from './hqstat-main/hqstat-main.component';

const routes: Routes = [
  {
    path: "hqstat",
    component: HqstatMainComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HqstatRoutingModule { }
