import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.sass']
})
export class PortfolioListComponent implements OnChanges {
  @Input() portfolio: any[] = [];
  displayedColumns: string[] = [
    'Ticker',
    'Shares',
    'BuyPrice',
    'SoldPrice',
    'BuyDate',
    'SoldDate',
    'Broker'
  ];

  constructor() { }

  ngOnChanges() {
    console.log(this.portfolio)
  }

}
