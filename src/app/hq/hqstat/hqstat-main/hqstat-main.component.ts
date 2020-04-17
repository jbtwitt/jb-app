import _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-hqstat-main',
  templateUrl: './hqstat-main.component.html',
  styleUrls: ['./hqstat-main.component.sass']
})
export class HqstatMainComponent implements OnInit {
  hqStatData: any[];
  csvPath: string;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService.getAssetCsvData("hqcsv/hqstat-200.csv").subscribe(data => {
      data.forEach(obj => {
        obj.lPos = +obj.lPos;
        obj.hPos = +obj.hPos;
        obj.lDelta = (+obj.cClose - obj.lClose) / obj.lClose
      })
      this.hqStatData = _.orderBy(data, ['lPos'], ['asc']);
    });
  }

  setCsvPath(path: string) {
    this.csvPath = path;
  }
}
