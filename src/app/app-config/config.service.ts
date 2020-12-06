import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private conf_: any = {};

  constructor(private dataService: DataService) { }

  get conf() {
    return this.conf_;
  }
  get loaded() {
    return this.conf.pis && this.conf.hqConf;
  }

  public load(): Promise<any> {

    return new Promise((resolve, reject) => {

      this.dataService.getAssetCsvData('account.csv')
        .subscribe(data => {
          this.conf.accounts = data;
        });
      this.dataService.getAssetJsonData('pi-addr.json')
        .toPromise()
        .then(data => {
          this.conf.pis = data;
          resolve(this.loaded)
        });
      this.dataService.getAssetJsonData('hqcsv/hqdate.json')
        .toPromise()
        .then(data => {
          this.conf.hqDate = data.hqdate;
          console.log(this.conf_.hqDate);
          resolve(this.loaded)
        });
      this.dataService.getAssetJsonData('hqrobot.json')
        .toPromise()
        .then(data => {
          this.conf.hqConf = data;
          // console.log(this.conf.hqConf);
          resolve(this.loaded)
        });
      // this.getAPI(this.envUrl).subscribe((response: any) => {
      //     console.log('response from the server:::', response);
      //     this.configSettings = response;
      //     resolve(true);
      // });
    });
  }
}
