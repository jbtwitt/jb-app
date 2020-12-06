import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private pis: any;
  private hqDate: any;
  private hqConf: any;
  private accounts: any;

  constructor(private dataService: DataService) { }

  get conf() {
    return {
      pis: this.pis,
      hqDate: this.hqDate,
      hqConf: this.hqConf,
      accounts: this.accounts
    };
  }
  get loaded() {
    return this.pis && this.hqConf;
  }

  public load(): Promise<any> {

    return new Promise((resolve, reject) => {

      this.dataService.getAssetCsvData('account.csv')
        .subscribe(data => {
          this.accounts = data;
        });
      this.dataService.getAssetJsonData('pi-addr.json')
        .toPromise()
        .then(data => {
          this.pis = data;
          resolve(this.loaded)
        });
      this.dataService.getAssetJsonData('hqcsv/hqdate.json')
        .toPromise()
        .then(data => {
        this.hqDate = data.hqdate;
          console.log(this.hqDate);
          resolve(this.loaded)
        });
      this.dataService.getAssetJsonData('hqrobot.json')
        .toPromise()
        .then(data => {
          this.hqConf = data;
          console.log(this.hqConf);
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
