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
