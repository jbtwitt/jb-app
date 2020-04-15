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

  constructor(
    public uiService: UiService,
    private dataService: DataService,
  ) { }

  ngOnInit() {
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
  hqUrl(ticker: string): string {
    return this.uiService.hqRobotJson.hqUrl.q.replace(/{}/g, ticker);
  }
  hqChart(ticker: string): string {
    return this.uiService.hqRobotJson.hqUrl.c.replace("{}", ticker);
  }
  hqHistory(ticker: string): string {
    return this.uiService.hqRobotJson.hqUrl.h.replace(/{}/g, ticker);
  }
}
