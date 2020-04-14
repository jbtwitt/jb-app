import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorComponent } from './raspberry-pi/monitor/monitor.component';

const routes: Routes = [
  // { path: '', redirectTo: '/at-collection', pathMatch: 'full' }
  { path: '', redirectTo: '/bookmarks', pathMatch: 'full' }
  // { path: '', component: MonitorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
