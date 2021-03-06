import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ConfigService } from '../app-config/config.service';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private configService: ConfigService,
    private datePipe: DatePipe,
  ) {}

  getGainLoss(row) {
    return (row.soldDate
      ? (row.soldPrice - row.buyPrice)
      : (row.close - row.buyPrice)
    );
  }

  get hqday0Path() {
    return `hqcsv/hq${this.configService.conf.hqDate}/hqday0.hqcsv`;
  }
  get hqhlPath() {
    // return `hqcsv/hq${this.configService.conf.hqDate}/hqhl.hqcsv`;
    return `hqcsv/hqhl.hqcsv`;
  }
  csvPath(hq) {
    // const dateCol = (hq.soldDate === undefined) ? 'date' : 'soldDate';
    // const hqDate = hq[dateCol].replace(/-/g, '');
    // const hqDate = this.datepipe.transform(new Date(), 'yyyyMMdd');
    // return `hqcsv/hq${this.configService.conf.hqDate}/${hq.ticker}.y.csv`;
    return `hqcsv/download/${hq.ticker}.csv`;
  }
  // css class
  cssGainLoss(delta: number) {
    return (delta > 0) ? 'gain' : 'loss';
  }

  // hq Url
  hqQUrl(ticker: string): string {
    return this.configService.conf.hqConf.hqUrl.q.replace(/{}/g, ticker);
  }
  hqCUrl(ticker: string): string {
    return this.configService.conf.hqConf.hqUrl.c.replace("{}", ticker);
  }
  hqHUrl(ticker: string): string {
    return this.configService.conf.hqConf.hqUrl.h.replace(/{}/g, ticker);
  }

  // compare = (key: string, desc: number) => {
  //   if (key.endsWith('Date')) {
  //     return (a, b) => {
  //       const c = a[key] ? this.datePipe.transform(a[key], 'yyyyMMdd') : '9';
  //       const d = b[key] ? this.datePipe.transform(b[key], 'yyyyMMdd') : '9';
  //       return (c > d ? desc : d > c ? -desc : 0);
  //     }
  //   }
  //   return (a, b) => (a[key] > b[key] ? desc : b[key] > a[key] ? -desc : 0);
  // };
  orderBy(list: any[], key: string, desc: boolean = false) {
    const compare = (key: string, desc: number) => {
      if (key.endsWith('Date')) {
        return (a, b) => {
          const c = a[key] ? this.datePipe.transform(a[key], 'yyyyMMdd') : '9';
          const d = b[key] ? this.datePipe.transform(b[key], 'yyyyMMdd') : '9';
          return (c > d ? desc : d > c ? -desc : 0);
        }
      }
      return (a, b) => (a[key] > b[key] ? desc : b[key] > a[key] ? -desc : 0);
    };
    return list.concat().sort(compare(key, desc ? -1 : 1));
  }
  dateCompare(d1, d2) {
    return this.datePipe.transform(d1, 'yyyyMMdd') >= this.datePipe.transform(d2, 'yyyyMMdd');
  }
  groupBy(arr, key1, key2) {
    return arr.reduce((ret, row) => {
      console.log(ret);
      // console.log(x);
      // console.log(x[key]);
      // console.log(rv[x[key]]);
      (ret[row[key1], row[key2]] = ret[row[key1], row[key2]] || []).push(row);
      return ret;
    }, {});
  };
}
