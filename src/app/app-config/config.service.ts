import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private pis_: any;
  private hqDate_: any;
  private hqConf_: any;
  private accounts_: any;

  constructor(private dataService: DataService) { }

  get pis() {
    return this.pis_;
  }
  get hqDate() {
    return this.hqDate_;
  }
  get hqConf() {
    return this.hqConf_;
  }
  get accounts() {
    return this.accounts_;
  }
  get loaded() {
    return this.pis && this.hqDate && this.hqConf;
  }

  public load(): Promise<any> {

    return new Promise((resolve, reject) => {

      this.dataService.getAssetCsvData('account.csv')
        // .toPromise()
        .subscribe(data => {
          this.accounts_ = data;
          // resolve(this.loaded)
        });
      this.dataService.getAssetJsonData('pi-addr.json')
        .toPromise()
        .then(data => {
          this.pis_ = data;
          resolve(this.loaded)
        });
      this.dataService.getAssetJsonData('hqcsv/hqdate.json')
        .toPromise()
        .then(data => {
        this.hqDate_ = data.hqdate;
          console.log(this.hqDate);
          resolve(this.loaded)
        });
      this.dataService.getAssetJsonData('hqrobot.json')
        .toPromise()
        .then(data => {
          this.hqConf_ = data;
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
