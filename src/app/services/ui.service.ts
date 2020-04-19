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
}
