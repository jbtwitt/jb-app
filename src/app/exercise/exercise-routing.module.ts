import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicAlternateTempoComponent } from './basic-alternate-tempo/basic-alternate-tempo.component';
import { BatCounterMainComponent } from './bat-counter-main/bat-counter-main.component';
import { AlternateTempoCollectionFormComponent } from './alternate-tempo-collection-form/alternate-tempo-collection-form.component';

const routes: Routes = [
  // { path: 'bat', component: BasicAlternateTempoComponent },
  { path: 'at-collection', component: AlternateTempoCollectionFormComponent },
  { path: 'bat-counter', component: BatCounterMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ExerciseRoutingModule { }
