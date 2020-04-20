import _ from 'lodash';
import { Component, OnInit, Input, OnChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-hqstat-list',
  templateUrl: './hqstat-list.component.html',
  styleUrls: ['./hqstat-list.component.css']
})
export class HqstatListComponent implements OnInit, OnChanges {
  @Input() hqStatData: any[];
  @Output() onCsvPathSelected: EventEmitter<string> = new EventEmitter<string>();
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [
    "ticker", "cDate", "cClose", "closeChange", "volumeChange",
    "lDate", "lClose", "lPos", "lDelta",
    "hDate", "hClose", "hPos", "hDelta",
    "hvDate", "hvPos", //"hvVolume",
    "lvDate", "lvPos", //"lvVolume",
    "hlvDelta",
  ];

  constructor(
    public uiService: UiService,
  ) { }

  ngOnInit() {
  }
  ngOnChanges() {
    console.log(this.hqStatData)
    if (this.hqStatData && this.hqStatData.length > 0) {
      this.hqStatData = _.orderBy(this.hqStatData, ['lDelta'], ['asc']);
      this.dataSource = new MatTableDataSource(this.hqStatData);
      this.dataSource.sort = this.sort;
    }
  }

  setCsvPath(path: string) {
    this.onCsvPathSelected.emit(path);
  }
}
