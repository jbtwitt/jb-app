import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

const TOP = 15

@Component({
  selector: 'app-hq-percent-list',
  templateUrl: './hq-percent-list.component.html',
  styleUrls: ['./hq-percent-list.component.sass']
})
export class HqPercentListComponent implements OnInit, OnChanges {
  @Input() hqDay0Row: any;
  hqPrice: number = 10;
  percentList = []
  dataSource: MatTableDataSource<any[]>;
  displayedColumns: string[] = ['positive', 'percent', 'negative'];

  constructor() { }

  ngOnInit() {
    let ret = [];
    for (var i = 0; i <= TOP; i++) {
      const p = i / 100;
      ret.push({
        percent: p,
      });
      this.percentList.push(p);
    }
    this.dataSource = new MatTableDataSource(ret);
  }

  ngOnChanges() {
    if (this.hqDay0Row) {
      this.hqPrice = this.hqDay0Row.close;
    }
  }
}
