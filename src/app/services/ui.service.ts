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

  csvPath(hq) {
    const hqDate = hq.date.replace(/-/g, '');
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
