import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-hqhl-main',
  templateUrl: './hqhl-main.component.html',
  styleUrls: ['./hqhl-main.component.sass']
})
export class HqhlMainComponent implements OnInit {
  hqHl: any[];
  selectedHqHl: any[];
  ndaysList: any[] = [10, 30, 60, 120, 240];
  today: Date = new Date();

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService
      .getAssetCsvData(`hqcsv/hqhl.hqcsv`)
      .subscribe(data => {
        this.hqHl = data;
        this.getHqHl(this.ndaysList[0]);
      });  
  }

  getHqHl(ndays: number) {
    this.selectedHqHl = this.hqHl.filter(q => q.ndaysHL === ndays);
    // console.log(this.selectedHqHl)
  }

  etIraShortTerm() {
    // cretiria:
    this.selectedHqHl = this.hqHl.filter(
      hl => 
        !'^TNX,FIT'.includes(hl.ticker)
        && (
          (
            hl.vChange >= 2         // volume jump
            && hl.ndaysHL === 10    // need only one
          )
          || (
            hl.hvPos === 0   // highest volume
            // && hl.ndaysHL > 10
          )
          || (
            hl.lvPos === 0    // lowest volume date
            && hl.lcPos <= 1  // lowest price
          )
        )
    );
  }
}
