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
  portfolioTest: any[];

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService.getAssetCsvData('portfolio.csv').subscribe(csv => {
      this.portfolio = csv;

      csv.forEach(item => {
        item.buyCost = item.shares * item.buyPrice;
        item.soldIncome = item.shares * item.soldPrice;
      });

      this.portfolioClose = csv.filter(p => p.soldDate !== '');

      this.dataService.getAssetCsvData("hqcsv/hqday0.hqcsv").subscribe(data => {

        const opens = csv.filter(
          p => p.soldDate === ''
        );

        // use destructuring assignment
        // to fill in close price in the place of sold date
        opens.forEach(p => {
          const hq0 = data.filter(d => d.ticker === p.ticker)[0];
          // console.log(curInfo.Date + ',', curInfo.Date.substr(0,3))
          [p.soldPrice, p.soldDate, p.cChange, p.vChange] = [
            hq0.close, hq0.date, hq0.cChange, hq0.vChange
          ];
          p.soldIncome = p.shares * p.soldPrice;
        });

        this.portfolioTest = opens.filter(p => p.broker === 'Test *');
  
        this.portfolioOpen = opens.filter(p => p.broker !== 'Test *');
      });
    });
  }

}
