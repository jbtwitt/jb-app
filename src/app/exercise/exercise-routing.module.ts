import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicAlternateTempoComponent } from './basic-alternate-tempo/basic-alternate-tempo.component';
import { AlternateTempoCollectionFormComponent } from './alternate-tempo-collection-form/alternate-tempo-collection-form.component';

const routes: Routes = [
  { path: 'at-collection', component: AlternateTempoCollectionFormComponent },
  // { path: 'bat', component: BasicAlternateTempoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ExerciseRoutingModule { }
