import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicAlternateTempoComponent } from './basic-alternate-tempo/basic-alternate-tempo.component';
import { BatCounterMainComponent } from './bat-counter-main/bat-counter-main.component';

const routes: Routes = [
  { path: 'bat', component: BasicAlternateTempoComponent },
  { path: 'bat-counter', component: BatCounterMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ExerciseRoutingModule { }
