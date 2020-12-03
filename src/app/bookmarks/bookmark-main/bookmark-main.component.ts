import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-bookmark-main',
  templateUrl: './bookmark-main.component.html',
  styleUrls: ['./bookmark-main.component.sass']
})
export class BookmarkMainComponent implements OnInit {
  bookmarksCollection: any[];
  notes: any[];
  educations: any[];
  hqCategory = ['etf', 'idx', 'tickers', 'covid19'];
  hqConf: any;

  constructor(
    public uiService: UiService,
    private dataService: DataService,
  ) { }

  async ngOnInit() {
    this.dataService.getAssetJsonData('notes.json').subscribe(data => {
      this.notes = data;
    })
    this.dataService.getAssetJsonData('bookmarks-collection.json').subscribe(data => {
      this.bookmarksCollection = data;
    })
    this.dataService.getAssetJsonData('educations.json').subscribe(data => {
      this.educations = data
    })
  }
}
