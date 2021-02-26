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
  @Input() hqDay0: any;
  @Output() hqDay0RowChanged: EventEmitter<any> = new EventEmitter<any>();
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [
    "date", "ticker", "close", "volume",
    "cchg", "vchg", "cl", 'hl', "high", "low"
  ];

  constructor(public uiService: UiService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.hqDay0 && this.hqDay0.length > 0) {
      this.dataSource = new MatTableDataSource(this.hqDay0);
      this.dataSource.sort = this.sort;
    }
  }
  selectedHqTicker(hqDay0Row) {
    // console.log(hlRow)
    this.hqDay0RowChanged.emit(hqDay0Row);
  }
}
