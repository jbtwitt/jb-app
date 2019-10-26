import { Component, OnInit } from '@angular/core';

const pi1Url = "http://192.168.0.118:5000/snapshot"
const pi2Url = "http://192.168.0.119:5000/snapshot"

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.sass']
})
export class MonitorComponent implements OnInit {
  timestamp: Date = new Date;
  seconds: number = 2;

  piImgs = [pi1Url, pi2Url]

  constructor() { }

  ngOnInit() {
    const intervalId = setInterval(() => {
      this.timestamp = new Date;
      this.piImgs = [
        pi1Url + '?' + this.timestamp.getSeconds(),
        pi2Url + '?' + this.timestamp.getSeconds()
      ]
    }, this.seconds * 1000);
  }

}
