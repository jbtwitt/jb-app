import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule, MatIconModule, MatTabsModule, MatInputModule } from '@angular/material';

import { BookmarksRoutingModule } from './bookmarks-routing.module';
import { BookmarkMainComponent } from './bookmark-main/bookmark-main.component';
import { HqPercentListComponent } from './components/hq-percent-list/hq-percent-list.component';

@NgModule({
  declarations: [BookmarkMainComponent, HqPercentListComponent],
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
