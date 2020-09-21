import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-ledger-main',
  templateUrl: './ledger-main.component.html',
  styleUrls: ['./ledger-main.component.sass']
})
export class LedgerMainComponent implements OnInit {
  accounts: any[];
  transactions: any[] = [];

  constructor(
    private uiService: UiService,
    private dataService: DataService,
  ) { }

  async ngOnInit() {
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
        let transactions = [];
        rows.forEach(t => {
          const hq = hqday0.filter(q => q.ticker === t.ticker)[0];
          transactions = [...transactions, { ...t, ...hq }];
        });
        // console.log(transactions);
        this.transactions = [...this.transactions, transactions];

        // cash/market value
        account.cash = account.investment;
        account.marketValue = account.investment;
        transactions.forEach(row => {
          account.marketValue += row.shares * this.uiService.getGainLoss(row);
          account.cash += row.shares * (
            (row.soldDate) ? this.uiService.getGainLoss(row) : -row.buyPrice
          );
        });
      })
      // console.log(this.transactions)
    });
  }

}
