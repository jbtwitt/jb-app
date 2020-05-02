import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ledger-main',
  templateUrl: './ledger-main.component.html',
  styleUrls: ['./ledger-main.component.sass']
})
export class LedgerMainComponent implements OnInit {
  accounts: any[];
  transactions: any[] = [];

  constructor(
    private dataService: DataService,
  ) { }

  async ngOnInit() {
    // await this.dataService.getAssetCsvData('account.csv').toPromise()
    //   .then(data => {
    //     this.accounts = data
    //   });
    this.dataService.getAssetCsvData('account.csv').subscribe(data => {
        this.accounts = data
    });
    let hqday0 = [];
    await this.dataService.getAssetCsvData('hqcsv/hqday0.hqcsv').toPromise()
      .then(data => {
        hqday0 = data;
      });
    this.dataService.getAssetCsvData('portfolio.csv').subscribe(data => {
      this.accounts.forEach(account => {
        const rows = data.filter(t =>
          t.broker === account.broker
          && t.buyDate >= account.date
        );
        const transactions = [];
        rows.forEach(t => {
          const hq = hqday0.filter(q => q.ticker === t.ticker)[0];
          transactions.push({ ...t, ...hq });
        });
        this.transactions = [...this.transactions, transactions];
      })
      console.log(this.transactions)
    });
  }

}
