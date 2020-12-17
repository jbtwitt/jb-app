import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-hq-play-main',
  templateUrl: './hq-play-main.component.html',
  styleUrls: ['./hq-play-main.component.sass']
})
export class HqPlayMainComponent implements OnInit {
  hqHl: any;
  hqHlRow: any;

  constructor(
    private dataService: DataService,
    private uiService: UiService,
  ) { }

  ngOnInit(): void {
    this.dataService
      .getAssetCsvData(this.uiService.hqhlPath)
      .subscribe(data => {
        this.hqHl = data;
        // this.getHqHl(this.ndaysList[0]);
      });  
  }

  hqHlRowChanged(row) {
    console.log(row)
    this.hqHlRow = row;
  }
}
