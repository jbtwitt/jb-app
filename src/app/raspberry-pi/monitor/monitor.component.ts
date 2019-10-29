import { Component, OnInit, OnDestroy } from '@angular/core';

const PiUrls = [
  "http://192.168.0.118:5000/pi-monitor",
  "http://192.168.0.119:5000/pi-monitor",
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

  constructor() { }

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.timestamp = new Date;
      for (let i = 0; i < this.piImgs.length; i++) {
        if (this.hoursAgo == "") {
          this.piImgs[i] = PiUrls[i] + '?' + this.timestamp.getSeconds()
        } else {
          this.piImgs[i] = PiUrls[i] + '?hoursAgo=' + this.hoursAgo + '&' + this.timestamp.getSeconds()
        }
      }
      // console.log(this.piImgs)
    }, this.seconds * 1000);
  }

  ngOnDestroy() {
    console.log('destory')
    clearInterval(this.intervalId)
  }
}
