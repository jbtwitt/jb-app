import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-portfolio-main',
  templateUrl: './portfolio-main.component.html',
  styleUrls: ['./portfolio-main.component.sass']
})
export class PortfolioMainComponent implements OnInit {
  portfolio: any[];
  portfolioOpen: any[];
  portfolioClose: any[];
  groupPortfolioOpen: any[];

  groupTicker: string;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService.getAssetCsvData('portfolio.csv').subscribe(arr => {
      this.portfolio = arr;
      // string to number
      arr.forEach(item => {
        item.shares = + item.shares;
        item.buyCost = +item.shares * item.buyPrice;
      });
      this.portfolioOpen = arr.filter(p => p.soldDate === '');
      this.portfolioClose = arr.filter(p => p.soldDate !== '');

      this.groupPortfolioOpen = this.createGroupByTicker(this.portfolioOpen);

      // use destructuring assignment
      // to fill in latest close price
      // in the place of sold
      this.dataService.getAssetCsvData("hqcsv/hqstat-200.csv").subscribe(data => {
        this.portfolioOpen.forEach(p => {
          const curInfo = data.filter(d => d.ticker === p.ticker)[0];
          [p.soldPrice, p.soldDate, p.csvPath] = [curInfo.cClose, curInfo.cDate, curInfo.csvPath];
        });
        this.groupPortfolioOpen.forEach(p => {
          const curInfo = data.filter(d => d.ticker === p.ticker)[0];
          [p.soldPrice, p.soldDate, p.csvPath] = [curInfo.cClose, curInfo.cDate, curInfo.csvPath];
          // find group ticker if any, to show detailed list
          if (!p.buyDate) {
            this.groupTicker = p.ticker;
          }
        });
      });
    })

  }

  groupTickerSelected(ticker) {
    this.groupTicker = ticker;
  }
  get groupList() {
    return this.portfolioOpen.filter(p => p.ticker === this.groupTicker);
  }
  // groupByTicker_(data) {
    // const groupBy = _.chain(data)
    //     .groupBy("ticker")
    //     // .map((value, key) => )
    //     .value();
  // }
  createGroupByTicker(data) {
    // let copy = Object.assign({}, data); // assign doesn't do deep cloning
    const copy = JSON.parse(JSON.stringify(data));
    const groupBy = copy.reduce((acc, row) => {
      const key = acc[row.ticker];
      if (key) {
        key.shares += row.shares;
        key.buyCost += row.buyCost;
        key.buyPrice = key.buyCost / key.shares;
        key.buyDate = '';
      } else {
        acc[row.ticker] = row;
        delete row.ticker;
      }
      return acc;
    }, {});
    const result = [];
    Object.keys(groupBy).forEach(key => {
      groupBy[key] = {ticker: key, ...groupBy[key]};
      result.push(groupBy[key]);
    })
    // console.log(result)
    return result;
  }
}
