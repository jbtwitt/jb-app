import { Component, OnInit } from '@angular/core';
import { constBookmarksCollection } from "../../data/bookmarks-collection";

@Component({
  selector: 'app-bookmark-main',
  templateUrl: './bookmark-main.component.html',
  styleUrls: ['./bookmark-main.component.sass']
})
export class BookmarkMainComponent implements OnInit {
  bookmarksCollection = constBookmarksCollection;

  constructor() { }

  ngOnInit() {
  }

}
