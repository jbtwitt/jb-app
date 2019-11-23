import { Component, OnInit, OnDestroy } from '@angular/core';

const PiUrls = [
  "http://192.168.0.110:5000/pi-monitor",
  "http://192.168.0.107:5000/pi-monitor",
]

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.sass']
})
export class MonitorComponent implements OnInit, OnDestroy {
  piImgs = PiUrls.slice()

  timestamp: Date = new Date;
  seconds: number = 1.5;

  intervalId: any
  hoursAgo: string = ""
  minutesAgo: string = ""

  constructor() { }

  ngOnInit() {
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
        this.piImgs[i] = PiUrls[i] + urlParameter
      }
      // console.log(this.piImgs)
    }, this.seconds * 1000);
  }

  ngOnDestroy() {
    console.log('destory')
    clearInterval(this.intervalId)
  }
}
