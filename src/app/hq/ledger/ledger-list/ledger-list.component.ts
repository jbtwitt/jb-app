import { Component, OnInit, ViewChild, OnChanges, Input } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-ledger-list',
  templateUrl: './ledger-list.component.html',
  styleUrls: ['./ledger-list.component.sass']
})
export class LedgerListComponent implements OnInit, OnChanges {
  @Input() account: any[];
  @Input() transactions: any[];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: MatTableDataSource<any[]>;
  displayedColumns = [
    "ticker", "shares",
    "buyPrice", "buyDate",
    // "soldPrice", "cChange", "vChange",
    // "soldDate", "buyCost",
    // 'gainLoss', 'gainLossP',
  ];

  constructor(
    public uiService: UiService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.transactions);
    this.dataSource.sort = this.sort;
  }
}
