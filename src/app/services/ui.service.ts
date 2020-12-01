import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  hqDate: string;
  hqConf: any;

  constructor(
    private datePipe: DatePipe,
    private dataService: DataService,
  ) {
    // console.log('-----construct ui service')
    // this.init();
    // this.dataService.getAssetJsonData('hqcsv/hqdate.json').subscribe(data => {
    //   this.hqDate = data.hqdate;
    //   console.log(this.hqDate);
    // });
    // this.dataService.getAssetJsonData('hqrobot.json').subscribe(data => {
    //   this.hqConf = data;
    // });
  }

  async init() {
    await this.dataService.getAssetJsonData('hqcsv/hqdate.json')
      .toPromise()
      .then(data => {
      this.hqDate = data.hqdate;
      console.log(this.hqDate);
    });
    await this.dataService.getAssetJsonData('hqrobot.json')
      .toPromise()
      .then(data => {
        this.hqConf = data;
      });
  }

  getHqConf() {
    return this.hqConf;
  }
  getGainLoss(row) {
    return (row.soldDate
      ? (row.soldPrice - row.buyPrice)
      : (row.close - row.buyPrice)
    );
  }

  get hqday0Path() {
    return `hqcsv/hq${this.hqDate}/hqday0.hqcsv`;
  }
  get hqhlPath() {
    return `hqcsv/hq${this.hqDate}/hqhl.hqcsv`;
  }
  csvPath(hq) {
    // const dateCol = (hq.soldDate === undefined) ? 'date' : 'soldDate';
    // const hqDate = hq[dateCol].replace(/-/g, '');
    // const hqDate = this.datepipe.transform(new Date(), 'yyyyMMdd');
    return `hqcsv/hq${this.hqDate}/${hq.ticker}.y.csv`;
  }
  // css class
  cssGainLoss(delta: number) {
    return (delta > 0) ? 'gain' : 'loss';
  }

  // hq Url
  hqQUrl(ticker: string): string {
    if (this.hqConf) {
      return this.hqConf!.hqUrl.q.replace(/{}/g, ticker);
    }
  }
  hqCUrl(ticker: string): string {
    if (this.hqConf) {
      return this.hqConf.hqUrl.c.replace("{}", ticker);
    }
  }
  hqHUrl(ticker: string): string {
    return this.hqConf.hqUrl.h.replace(/{}/g, ticker);
  }

  compare = (key: string, desc: number) => {
    return (a, b) => (a[key] > b[key] ? desc : b[key] > a[key] ? -desc : 0);
  };
  orderBy(list: any[], key: string, desc: boolean = false) {
    return list.concat().sort(this.compare(key, desc ? -1 : 1));
  }
  dateCompare(d1, d2) {
    return this.datePipe.transform(d1, 'yyyyMMdd') >= this.datePipe.transform(d2, 'yyyyMMdd');
  }
}
