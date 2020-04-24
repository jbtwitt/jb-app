import { Component, OnInit, ViewChild, OnChanges, Input } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-hqhl-list',
  templateUrl: './hqhl-list.component.html',
  styleUrls: ['./hqhl-list.component.sass']
})
export class HqhlListComponent implements OnInit, OnChanges {
  @Input() hqhl: any[];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [
    "ticker", "ndaysHL",
    "date", "cClose", "cChange", "vChange",
    "lvPos", "lvDate", //"lClose", "lDelta",
    // "lcPos", "lcDate", //"hClose", "hDelta",
    // "hvDate", "hvPos", //"hvVolume",
    // "lvDate", "lvPos", //"lvVolume",
    // "hlvDelta",
  ];

  constructor(
    public uiService: UiService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.hqhl && this.hqhl.length > 0) {
      // this.hqhl = _.orderBy(this.hqhl, ['lDelta'], ['asc']);
      this.dataSource = new MatTableDataSource(this.hqhl);
      this.dataSource.sort = this.sort;
    }
  }
}
