import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-bookmark-main',
  templateUrl: './bookmark-main.component.html',
  styleUrls: ['./bookmark-main.component.sass']
})
export class BookmarkMainComponent implements OnInit {
  bookmarksCollection: any[];
  hqCollection: any;
  notes: any[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getNotes().subscribe(data => {
      this.notes = data;
    })
    this.dataService.getBookmarksCollection().subscribe(data => {
      this.bookmarksCollection = data;
    })
    this.dataService.getHqCollection().subscribe(data => {
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
