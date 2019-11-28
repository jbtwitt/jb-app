import { Component, OnInit } from '@angular/core';
import { BookmarksCollectioonService } from 'src/app/services/bookmarks-collectioon.service';

@Component({
  selector: 'app-bookmark-main',
  templateUrl: './bookmark-main.component.html',
  styleUrls: ['./bookmark-main.component.sass']
})
export class BookmarkMainComponent implements OnInit {
  bookmarksCollection: any;
  hqCollection: any;

  constructor(private bookmarkService: BookmarksCollectioonService) { }

  ngOnInit() {
    this.bookmarkService.getBookmarksCollection().subscribe(data => {
      this.bookmarksCollection = data;
    })
    this.bookmarkService.getHqCollection().subscribe(data => {
      this.hqCollection = data;
    })
  }
  hqUrl(ticker: string): string {
    return this.hqCollection.hqUrl.q.replace(/{}/g, ticker);
  }
  hqChart(ticker: string): string {
    return this.hqCollection.hqUrl.c.replace("{}", ticker);
  }
  hqHistory(ticker: string): string {
    return this.hqCollection.hqUrl.h.replace(/{}/g, ticker);
  }
}
