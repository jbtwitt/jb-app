import { Component, OnInit, OnDestroy } from '@angular/core';

const PiUrls = [
  "http://192.168.0.118:5000/snapshot",
  "http://192.168.0.119:5000/snapshot",
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
  // count: number = 0
  // maxCount: number = 1000;

  constructor() { }

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.timestamp = new Date;
      for (let i = 0; i < this.piImgs.length; i++) {
        this.piImgs[i] = PiUrls[i] + '?' + this.timestamp.getSeconds()
      }
      // if (++this.count > this.maxCount) {
      //   clearInterval(this.intervalId)
      // }
    }, this.seconds * 1000);
  }

  ngOnDestroy() {
    console.log('destory')
    clearInterval(this.intervalId)
  }
}
