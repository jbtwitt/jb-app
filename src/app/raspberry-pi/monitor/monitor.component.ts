import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit, OnDestroy {
  pis: any[]
  piImgs: any[] = []

  timestamp: Date = new Date;
  seconds: number = 1.5;

  intervalId: any
  hoursAgo: string = ""
  minutesAgo: string = ""

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAssetJsonData('pi-addr.json').subscribe(data => {
      this.pis = data;
      this.pis.forEach(pi => {
        this.piImgs.push({ ...pi, show: 0 });
      });
      console.log(this.piImgs);
    });
    this.intervalId = setInterval(() => {
      let minutes = 0
      this.timestamp = new Date();
      let urlParameter = '?nocache=' + this.timestamp.getTime()
      if (this.hoursAgo != "") {
        minutes = 60 * parseInt(this.hoursAgo)
      }
      if (this.minutesAgo != "") {
        minutes += parseInt(this.minutesAgo)
      }
      if (minutes > 0) {
        urlParameter = urlParameter + '&minutesAgo=' + minutes
        this.timestamp.setMinutes(this.timestamp.getMinutes() - minutes)
      }
      for (let i = 0; i < this.piImgs.length; i++) {
        this.piImgs[i].url = this.pis[i].url + urlParameter
      }
      // console.log(this.piImgs)
    }, this.seconds * 1000);
  }
  piImgOnClick(piImg) {
    piImg.show = !piImg.show
  }
  ngOnDestroy() {
    console.log('destory')
    clearInterval(this.intervalId)
  }
}
