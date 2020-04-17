import { Component, OnInit } from '@angular/core';
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

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService.getAssetCsvData('portfolio.csv').subscribe(arr => {
      this.portfolio = arr;
      this.portfolioOpen = arr.filter(p => p.soldDate === '');
      this.portfolioClose = arr.filter(p => p.soldDate !== '');
    })
  }

}
