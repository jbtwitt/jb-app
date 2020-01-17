import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule, MatIconModule, MatTabsModule, MatInputModule } from '@angular/material';

import { BookmarksRoutingModule } from './bookmarks-routing.module';
import { BookmarkMainComponent } from './bookmark-main/bookmark-main.component';

@NgModule({
  declarations: [BookmarkMainComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,

    BookmarksRoutingModule,
  ],
})
export class BookmarksModule { }
