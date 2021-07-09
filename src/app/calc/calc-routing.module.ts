import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalcMainComponent } from './calc-main/calc-main.component';

const routes: Routes = [
  {
    path: "calc",
    component: CalcMainComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalcRoutingModule { }
