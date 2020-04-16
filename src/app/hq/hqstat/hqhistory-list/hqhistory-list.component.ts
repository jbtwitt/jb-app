import { Component, OnInit, Input, ViewChild } from '@angular/core';
import _ from 'lodash';
import { DataService } from 'src/app/services/data.service';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-hqhistory-list',
  templateUrl: './hqhistory-list.component.html',
  styleUrls: ['./hqhistory-list.component.sass']
})
export class HqhistoryListComponent implements OnInit {
  @Input() csvPath: string = "hqcsv/hq20200415/LABU.y.csv";
  hqData: any[];
  displayedColumns: string[];
  // moreDisplay =  ['gainLoss', 'gainLossP'];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService.getAssetCsvData(this.csvPath).subscribe(data => {
      // this.hqData = data;
      _.reverse(data)
      console.log(data)
      const cols = Object.keys(data[0]);//.filter(k => k !== 'Adj Close');
      // use spread syntax instead of using array push
      // this.displayedColumns = ['broker', ...cols, ...this.moreDisplay];
      this.displayedColumns = cols;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

}
