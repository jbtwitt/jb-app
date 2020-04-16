import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-hqstat-main',
  templateUrl: './hqstat-main.component.html',
  styleUrls: ['./hqstat-main.component.sass']
})
export class HqstatMainComponent implements OnInit {
  hqStatData: any[];

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService.getAssetCsvData("hqcsv/hqstat-200.csv").subscribe(data => {
      this.hqStatData = data;
    })
  }

}
