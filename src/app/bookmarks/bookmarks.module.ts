import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';

import { BookmarksRoutingModule } from './bookmarks-routing.module';
import { BookmarkMainComponent } from './bookmark-main/bookmark-main.component';
// import { HqPercentListComponent } from './components/hq-percent-list/hq-percent-list.component';

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
