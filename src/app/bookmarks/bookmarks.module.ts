import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatIconModule } from '@angular/material';

import { BookmarksRoutingModule } from './bookmarks-routing.module';
import { BookmarkMainComponent } from './bookmark-main/bookmark-main.component';

@NgModule({
  declarations: [BookmarkMainComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,

    BookmarksRoutingModule,
  ],
})
export class BookmarksModule { }
