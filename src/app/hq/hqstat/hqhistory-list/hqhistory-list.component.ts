import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import _ from 'lodash';
import { DataService } from 'src/app/services/data.service';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-hqhistory-list',
  templateUrl: './hqhistory-list.component.html',
  styleUrls: ['./hqhistory-list.component.sass']
})
export class HqhistoryListComponent implements OnChanges {
  @Input() csvPath: string = "hqcsv/hq20200415/LABU.y.csv";
  displayedColumns: string[];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnChanges() {
    this.dataService.getAssetCsvData(this.csvPath).subscribe(data => {
      _.reverse(data)
      // console.log(data)
      const cols = Object.keys(data[0]);//.filter(k => k !== 'Adj Close');
      // use spread syntax instead of using array push
      this.displayedColumns = ['position', ...cols];
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

}
