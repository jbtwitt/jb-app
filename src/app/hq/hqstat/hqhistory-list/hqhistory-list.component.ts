import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import _ from 'lodash';
import { DataService } from 'src/app/services/data.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hqhistory-list',
  templateUrl: './hqhistory-list.component.html',
  styleUrls: ['./hqhistory-list.component.sass']
})
export class HqhistoryListComponent implements OnInit, OnChanges {
  @Input() csvPath: string = "hqcsv/hq20200415/LABU.y.csv";
  displayedColumns: string[];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.csvPath = params['csvPath'];
      console.log(this.csvPath)
      this.getCsvData(this.csvPath);
    });
  }

  ngOnChanges() {
    this.getCsvData(this.csvPath);
  }

  getCsvData(csvPath) {
    this.dataService.getAssetCsvData(csvPath)
      .subscribe(data => {

        // calc close change appended to array item
        data.forEach((row, pos) => {
          if (pos > 0) {
            const prevClose = +data[pos - 1].Close;
            row.hcDelta = (+row.High - row.Close) / row.Low;
            row.hlDelta = (+row.High - row.Low) / row.Low;
            row.closeChange = (+row.Close - prevClose) / prevClose;
          }
        });

        // reverse order
        _.reverse(data)
        // console.log(data)
        const cols = Object.keys(data[0]);
        // use spread syntax instead of using array push
        this.displayedColumns = ['position', ...cols];
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      });
  }

}
