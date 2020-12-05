import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-summary-by-year',
  templateUrl: './summary-by-year.component.html',
  styleUrls: ['./summary-by-year.component.sass']
})
export class SummaryByYearComponent implements OnInit, OnChanges {
  @Input() portfolio: any;
  yearSummary: any;
  selectedYear: string;
  sumUp: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ["year", "broker", "sum",];
  groupKey: any;

  constructor(private uiService: UiService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.portfolio) {
      this.yearSummary = this.groupByYearBroker(this.portfolio);
      console.log(this.yearSummary);
      this.selectedYear = this.uniqYears[0];
      this.sumUp = this.sumUpByYearBroker(this.portfolio);
      this.bindYear();
    }
  }

  bindYear() {
    let sumYear = this.uiService.orderBy(
      this.sumUp.filter(f => f.year === this.selectedYear),
      'broker'
    );
    const allSums = sumYear.reduce((ret, r) => {
      (r.broker !== '1T IRA') && ((ret['total'] += r.sum) || (ret['total'] = r.sum));
      return ret;
    }, {});
    sumYear.push({sum: allSums.total});
    this.dataSource = new MatTableDataSource(sumYear);
  }

  showPortfolio(key) {
    this.groupKey = key;
  }

  sumUpByYearBroker(arr) {
    const yearSums = arr.reduce((ret, row) => {
      const key = row.soldDate.substr(row.soldDate.lastIndexOf('/') + 1) + row.broker;
      const delta = (row.soldPrice - row.buyPrice) * row.shares;
      (row.soldDate) && ((ret[key] += delta) || (ret[key] = delta));
      return ret;
    }, {});
    return Object.keys(yearSums).map(key => new Object({
      year: key.substr(0, 4),
      broker: key.substr(4),
      sum: yearSums[key]
    }));
  };

  groupByYearBroker(arr) {
    return arr.reduce((ret, row) => {
      const groupKey = row.soldDate.substr(row.soldDate.lastIndexOf('/') + 1) + row.broker;
      (row.soldDate) && ((ret[groupKey] = ret[groupKey] || []).push(row));
      return ret;
    }, {});
  };

  get uniqYears() {
    if (this.yearSummary) {
      const years = Object.keys(this.yearSummary).reduce((ret, r) => {
        const y = r.substr(0, 4);
        if (!ret[y]) {
          (ret[y] = ret[y] || []).push(y);
        }
        return ret;
      }, {});
      return  Object.keys(years).sort().reverse();
    }
    return [];
  }
}
