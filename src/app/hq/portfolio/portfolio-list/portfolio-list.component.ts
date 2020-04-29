import { Component, OnInit, Input, OnChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent implements OnInit, OnChanges {
  @Input() portfolio: any[] = [];
  @Input() groupBy: string = "ticker";
  @Output() onGroupSelected: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: MatTableDataSource<any[]>;
  displayedColumns = [
    "broker", "ticker", "shares",
    "buyPrice", "buyDate",
    "soldPrice", "cChange", "vChange",
    "soldDate", "buyCost",
    'gainLoss', 'gainLossP',
  ];

  constructor(
    public uiService: UiService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    // console.log(this.portfolio);
    if (this.portfolio && this.portfolio.length > 0) {
      // const cols = Object.keys(this.portfolio[0]).filter(k => k !== 'broker');
      // use spread syntax instead of using array push
      // this.displayedColumns = ['broker', ...cols, ...this.moreDisplay];
      this.dataSource = new MatTableDataSource(this.portfolio);
      this.dataSource.sort = this.sort;
    }
  }

  groupSelected(group) {
    this.onGroupSelected.emit(group);
  }
}
