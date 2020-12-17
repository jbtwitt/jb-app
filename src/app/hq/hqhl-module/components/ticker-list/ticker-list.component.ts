import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-ticker-list',
  templateUrl: './ticker-list.component.html',
  styleUrls: ['./ticker-list.component.sass']
})
export class TickerListComponent implements OnInit, OnChanges {
  @Input() hqHl: any[];
  @Output() hqHlRowChanged: EventEmitter<any> = new EventEmitter<any>();
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [
    "date", "ticker", //"ndaysHL",
    "close", "cChange", "vChange",
    // "lcPos", "lcDate", "lcChange", "lClose",
    // "hClose", "hcChange", "hcDate", "hcPos",
    // "lvPos", "lvDate", //"lVolume",
    // "hvPos", "hvDate", //"hVolume",
  ];

  constructor(public uiService: UiService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.hqHl && this.hqHl.length > 0) {
      this.hqHl = this.hqHl.filter(q => q.ndaysHL === 10);
      // console.log(this.hqHl)
      // this.hqHl = this.uiService.orderBy(this.hqHl, 'lvPos');
      this.dataSource = new MatTableDataSource(this.hqHl);
      this.dataSource.sort = this.sort;
    }
  }
  selectedHqTicker(hlRow) {
    // console.log(hlRow)
    this.hqHlRowChanged.emit(hlRow);
  }
}
