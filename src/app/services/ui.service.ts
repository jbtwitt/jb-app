import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  hqRobotJson: any = {}

  constructor(
    private dataService: DataService,
  ) {
    console.log('----- ui service')
    this.dataService.getAssetJsonData('hqrobot.json').subscribe(data => {
      this.hqRobotJson = data;
    });
  }
}
