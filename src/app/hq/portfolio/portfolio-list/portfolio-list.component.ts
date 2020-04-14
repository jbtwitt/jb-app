import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.sass']
})
export class PortfolioListComponent implements OnInit, OnChanges {
  @Input() portfolio: any[] = [];
  displayedColumns: string[];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.portfolio);
    if (this.portfolio && this.portfolio.length > 0) {
      // use spread syntax instead of using array push
      this.displayedColumns = [...Object.keys(this.portfolio[0]), 'gainLoss', 'gainLossP'];
      this.dataSource = new MatTableDataSource(this.portfolio);
      this.dataSource.sort = this.sort;
    }
  }

}
