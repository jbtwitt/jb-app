import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-hqscan-main',
  templateUrl: './hqscan-main.component.html',
  styleUrls: ['./hqscan-main.component.sass']
})
export class HqscanMainComponent implements OnInit {
  hqscanResults: any;
  today: Date = new Date();

  constructor(
    private dataService: DataService,
    private uiService: UiService) { }

  ngOnInit(): void {
    this.dataService
      .getHqAssetCsvData("hqcsv/hqscan.csv", "Idx,s:Symbol,s:HqType,s:HqTypeDate,No,HqTypeChg,s:Day0,Close,CCChg,s:MetaInfo")
      .subscribe((data) => {
        this.hqscanResults = this.uiService.orderBy(data, 'HqType', true);
      });
  }

}
