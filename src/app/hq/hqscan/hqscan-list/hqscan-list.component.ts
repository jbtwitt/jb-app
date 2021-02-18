import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: "app-hqscan-list",
  templateUrl: "./hqscan-list.component.html",
  styleUrls: ["./hqscan-list.component.sass"],
})
export class HqscanListComponent implements OnInit, OnChanges {
  @Input() hqscanResults: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  columns = "Symbol,Day0,Close,HqType,No,HqTypeChg,CCChg,MetaInfo".split(",");
  dataSource: MatTableDataSource<any>;

  constructor(public uiService: UiService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.hqscanResults);
    this.dataSource.sort = this.sort;
  }
}
