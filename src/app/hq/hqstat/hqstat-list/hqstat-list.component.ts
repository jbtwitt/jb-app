import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-hqstat-list',
  templateUrl: './hqstat-list.component.html',
  styleUrls: ['./hqstat-list.component.sass']
})
export class HqstatListComponent implements OnInit, OnChanges {
  @Input() hqStatData: any[];
  displayedColumns: string[];
  // moreDisplay =  ['gainLoss', 'gainLossP'];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public uiService: UiService,
  ) { }

  ngOnInit() {
  }
  ngOnChanges() {
    console.log(this.hqStatData)
    if (this.hqStatData && this.hqStatData.length > 0) {
      const cols = Object.keys(this.hqStatData[0]).filter(k => k !== 'cPos');
      // use spread syntax instead of using array push
      // this.displayedColumns = ['broker', ...cols, ...this.moreDisplay];
      this.displayedColumns = cols;
      this.dataSource = new MatTableDataSource(this.hqStatData);
      this.dataSource.sort = this.sort;
    }
  }

}
