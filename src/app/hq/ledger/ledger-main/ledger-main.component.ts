import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ledger-main',
  templateUrl: './ledger-main.component.html',
  styleUrls: ['./ledger-main.component.sass']
})
export class LedgerMainComponent implements OnInit {

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService.getAssetCsvData('account.csv').subscribe(data => {
      const accounts = data;
      this.dataService.getAssetCsvData('portfolio.csv').subscribe(data => {
        const account = accounts[0];
        const transactions = data.filter(t =>
          t.broker === account.broker
          && t.buyDate > account.date
        );
        console.log(transactions)
      })
    });
  }

}
