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
        this.hqDay0 = data.map(r => {
          return {
            ...r,
            cchg: (r.close - r.prvClose) / r.prvClose,
            vchg: r.volume / r.prvVolume,
            hl: (r.high - r.low) / r.prvClose,
            cl: (r.close - r.low) / r.prvClose,
          };
        });
        console.log(this.hqDay0);
        this.hqDay0 = this.uiService.orderBy(this.hqDay0, 'cchg', true);
      });
  }

  hqDay0RowChanged(row) {
    console.log(row)
    this.hqDay0Row = row;
  }
}
