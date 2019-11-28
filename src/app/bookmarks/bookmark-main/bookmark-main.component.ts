import { Component, OnInit } from '@angular/core';
import { BookmarksCollectioonService } from 'src/app/services/bookmarks-collectioon.service';

@Component({
  selector: 'app-bookmark-main',
  templateUrl: './bookmark-main.component.html',
  styleUrls: ['./bookmark-main.component.sass']
})
export class BookmarkMainComponent implements OnInit {
  bookmarksCollection: any;

  constructor(private bookmarkService: BookmarksCollectioonService) { }

  ngOnInit() {
    this.bookmarkService.getBookmarksCollection().subscribe(data => {
      this.bookmarksCollection = data;
    })
  }

}
