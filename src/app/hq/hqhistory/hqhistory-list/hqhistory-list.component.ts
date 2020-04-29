import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import _ from 'lodash';
import { DataService } from 'src/app/services/data.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-hqhistory-list',
  templateUrl: './hqhistory-list.component.html',
  styleUrls: ['./hqhistory-list.component.css']
})
export class HqhistoryListComponent implements OnInit, OnChanges {
  @Input() csvPath: string;
  displayedColumns: string[];
  // [
  //   "position",
  //   "Date",
  //   "Open",
  //   "High",
  //   "Low",
  //   "Close",
  //   "Adj_Close",
  //   "Volume",
  //   "hcDelta",
  //   "hlDelta",
  //   "cChange",
  //   "vChange",
  // ];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ticker: string;

  constructor(
    public uiService: UiService,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.csvPath = params['csvPath'];
      console.log(this.csvPath)
      // parse out ticker from csvPath
      this.ticker = this.csvPath.substring(this.csvPath.lastIndexOf('/'));
      this.ticker = this.ticker.substring(1, this.ticker.indexOf('.'));
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
            const prev = data[pos - 1];
            row.hcDelta = (row.High - row.Close) / row.Low;
            row.hlDelta = (row.High - row.Low) / row.Low;
            row.cChange = (row.Close - prev.Close) / prev.Close;
            row.vChange = (row.Volume - prev.Volume) / prev.Volume;
          }
        });

        // reverse order
        _.reverse(data)
        // console.log(data)
        const cols = Object.keys(data[0]);
        // use spread syntax instead of using array push
        this.displayedColumns = ['position', ...cols];
        // console.log(this.displayedColumns)
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      });
  }

}
