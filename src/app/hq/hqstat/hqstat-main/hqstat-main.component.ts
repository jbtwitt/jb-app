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
  daysList = [200, 130, 70, 20];
  hqStatData: any[] = new Array(this.daysList.length);

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.daysList.forEach((days, i) => {
      this.dataService
        .getAssetCsvData(`hqcsv/hqstat-${days}.csv`)
        .subscribe(data => {
          data.forEach(obj => {
            // string to number
            // close
            [obj.lPos, obj.hPos] = [+obj.lPos, +obj.hPos];
            obj.lDelta = (+obj.cClose - obj.lClose) / obj.lClose;
            obj.hDelta = (+obj.hClose - obj.cClose) / obj.hClose;
            // volume
            [obj.hvVolume, obj.hvPos] = [+obj.hvVolume, +obj.hvPos];
            [obj.lvVolume, obj.lvPos] = [+obj.lvVolume, +obj.lvPos];
            obj.volumeChange = (+obj.v0Volume - obj.v1Volume) / obj.v1Volume;
            obj.hlvDelta = (obj.hvVolume - obj.lvVolume) / obj.lvVolume
          });
          this.hqStatData[i] = data;
        });  
    });
  }

  setCsvPath(path: string) {
    this.csvPath = path;
    this.hqLabel = path;
    this.hqtab.selectedIndex = this.daysList.length;
  }
}
