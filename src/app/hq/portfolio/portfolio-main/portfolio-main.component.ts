import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/app-config/config.service';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-portfolio-main',
  templateUrl: './portfolio-main.component.html',
  styleUrls: ['./portfolio-main.component.sass']
})
export class PortfolioMainComponent implements OnInit {
  portfolio: any[];
  portfolioOpen: any[];
  portfolioClose: any[];
  portfolioTest: any[];
  yearSummary: any;

  constructor(
    private uiService: UiService,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService.getAssetCsvData('portfolio.csv').subscribe(csv => {
      this.portfolio = csv;

      // const group = this.uiService.groupBy(this.portfolio.slice(0,2), "broker", "ticker");
      this.yearSummary = this.groupByYearBroker(this.portfolio);

      csv.forEach(item => {
        item.buyCost = item.shares * item.buyPrice;
        item.soldIncome = item.shares * item.soldPrice;
      });

      this.portfolioClose = csv.filter(p => p.soldDate !== '');

      // this.dataService.getAssetCsvData("hqcsv/hqday0.hqcsv").subscribe(data => {
      this.dataService.getAssetCsvData(this.uiService.hqday0Path).subscribe(data => {

        const opens = csv.filter(
          p => p.soldDate === ''
        );

        // use destructuring assignment
        // to fill in close price in the place of sold date
        opens.forEach(p => {
          const hq = data.filter(d => d.ticker === p.ticker)[0];
          [p.soldPrice, p.soldDate, p.cChange, p.vChange] = [
            hq.close, hq.date, hq.cChange, hq.vChange
          ];
          p.soldIncome = p.shares * p.soldPrice;
        });

        this.portfolioTest = opens.filter(p => p.broker === 'Test *');
  
        this.portfolioOpen = opens.filter(p => p.broker !== 'Test *');
      });
    });
  }
  groupByYearBroker(arr) {
    return arr.reduce((ret, row) => {
      if (row.soldDate) {
        const groupKey = row.soldDate.substr(row.soldDate.lastIndexOf('/') + 1) + row.broker;
        (ret[groupKey] = ret[groupKey] || []).push(row);
      }
      return ret;
    }, {});
  };
  get uniqYears() {
    if (this.yearSummary) {
      const years = Object.keys(this.yearSummary).reduce((ret, r) => {
        // console.log(r);
        const y = r.substr(0, 4);
        if (!ret[y]) {
          (ret[y] = ret[y] || []).push(y);
        }
        return ret;
      }, {});
      return  Object.keys(years).sort().reverse();
    }
  }
}
