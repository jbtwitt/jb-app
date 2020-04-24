import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import _ from 'lodash';

@Component({
  selector: 'app-hqhl-main',
  templateUrl: './hqhl-main.component.html',
  styleUrls: ['./hqhl-main.component.sass']
})
export class HqhlMainComponent implements OnInit {
  hqHl: any[];
  selectedHqHl: any[];
  ndaysList: any[] = [];
  today: Date = new Date();

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService
      .getAssetCsvData(`hqcsv/hqhl.hqcsv`)
      .subscribe(data => {
        this.hqHl = data;
        // const t = _.uniqBy(data, 'ticker');
        for (const {ndaysHL: ndays} of _.uniqBy(data, 'ndaysHL')) {
          this.ndaysList = [...this.ndaysList, ndays]
          // ndaysList.push(ndays);
        }
        this.getHqHl(this.ndaysList[0]);
      });  
  }

  getHqHl(ndays: number) {
    this.selectedHqHl = this.hqHl.filter(q => q.ndaysHL === ndays);
    // console.log(this.selectedHqHl)
  }

}
