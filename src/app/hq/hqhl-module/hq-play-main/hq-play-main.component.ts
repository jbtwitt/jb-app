import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-hq-play-main',
  templateUrl: './hq-play-main.component.html',
  styleUrls: ['./hq-play-main.component.sass']
})
export class HqPlayMainComponent implements OnInit {
  hqDay0: any;
  hqDay0Row: any;

  constructor(
    private dataService: DataService,
    private uiService: UiService,
  ) { }

  ngOnInit(): void {
    this.dataService
      .getHqAssetCsvData(
        "hqcsv/hqday0.csv",
        this.dataService.HqDaysColumns
      )
      .subscribe((data) => {
        this.hqDay0 = data;
        console.log(this.hqDay0);
      });
  }

  hqDay0RowChanged(row) {
    console.log(row)
    this.hqDay0Row = row;
  }
}
