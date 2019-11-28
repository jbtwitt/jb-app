import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookmarkMainComponent } from './bookmark-main/bookmark-main.component';

const routes: Routes = [
  { path: 'bookmarks', component: BookmarkMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookmarksRoutingModule { }
