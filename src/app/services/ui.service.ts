import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  hqConf: any = {}

  constructor(
    private dataService: DataService,
  ) {
    console.log('-----construct ui service')
    this.dataService.getAssetJsonData('hqrobot.json').subscribe(data => {
      this.hqConf = data;
    });
  }

  getGainLoss(row) {
    return (row.soldDate
      ? (row.soldPrice - row.buyPrice)
      : (row.close - row.buyPrice));
  }

  csvPath(hq) {
    const dateCol = (hq.soldDate === undefined) ? 'date' : 'soldDate';
    const hqDate = hq[dateCol].replace(/-/g, '');
    return `hqcsv/hq${hqDate}/${hq.ticker}.y.csv`;
  }
  // css class
  cssGainLoss(delta: number) {
    return (delta > 0) ? 'gain' : 'loss';
  }

  // hq Url
  hqQUrl(ticker: string): string {
    return this.hqConf.hqUrl.q.replace(/{}/g, ticker);
  }
  hqCUrl(ticker: string): string {
    return this.hqConf.hqUrl.c.replace("{}", ticker);
  }
  hqHUrl(ticker: string): string {
    return this.hqConf.hqUrl.h.replace(/{}/g, ticker);
  }
}
