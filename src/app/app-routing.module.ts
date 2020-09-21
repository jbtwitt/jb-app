import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: '/at-collection', pathMatch: 'full' }
  { path: '', redirectTo: '/monitor', pathMatch: 'full' },
  // { path: '', redirectTo: '/hqhl', pathMatch: 'full' },
  // { path: '', component: MonitorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
