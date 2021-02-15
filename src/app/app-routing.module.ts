import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/monitor', pathMatch: 'full' },
  // { path: '', redirectTo: '/bookmarks', pathMatch: 'full' },
  // { path: '', redirectTo: '/portfolio', pathMatch: 'full' },
  // { path: '', redirectTo: '/at-collection', pathMatch: 'full' },
  // { path: '', redirectTo: '/hqhl', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
