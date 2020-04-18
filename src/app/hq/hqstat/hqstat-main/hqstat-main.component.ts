import _ from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatTabGroup } from '@angular/material';

@Component({
  selector: 'app-hqstat-main',
  templateUrl: './hqstat-main.component.html',
  styleUrls: ['./hqstat-main.component.sass']
})
export class HqstatMainComponent implements OnInit {
  @ViewChild('hqtab', {static: false}) hqtab: MatTabGroup;
  csvPath: string;
  hqLabel: string;
  daysList = [200, 130, 70];
  hqStatData: any[] = new Array(this.daysList.length);

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.daysList.forEach((n, i) => {
      // const path = `hqcsv/hqstat-${n}.csv`;
      // console.log(i + path)
      this.dataService.getAssetCsvData(`hqcsv/hqstat-${n}.csv`)
        .subscribe(data => {
          data.forEach(obj => {
            obj.lPos = +obj.lPos;
            obj.hPos = +obj.hPos;
            obj.lDelta = (+obj.cClose - obj.lClose) / obj.lClose
          })
          this.hqStatData[i] = _.orderBy(data, ['lPos'], ['asc']);
        });  
    });
  }

  setCsvPath(path: string) {
    this.csvPath = path;
    this.hqLabel = path;
    this.hqtab.selectedIndex = this.daysList.length;
  }
}
