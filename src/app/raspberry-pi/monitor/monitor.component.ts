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
      this.timestamp = new Date();
      let urlParameter = '?' + this.timestamp.getSeconds()
      if (this.hoursAgo != "") {
        urlParameter = '?hoursAgo=' + this.hoursAgo + '&' + this.timestamp.getSeconds()
        this.timestamp.setHours(this.timestamp.getHours() - parseFloat(this.hoursAgo))
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
