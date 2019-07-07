import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicAlternateTempoComponent } from './basic-alternate-tempo/basic-alternate-tempo.component';

const routes: Routes = [
  { path: 'bat', component: BasicAlternateTempoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ExerciseRoutingModule { }
