import { Component, OnInit } from '@angular/core';

const TOP = 15

@Component({
  selector: 'app-hq-percent-list',
  templateUrl: './hq-percent-list.component.html',
  styleUrls: ['./hq-percent-list.component.sass']
})
export class HqPercentListComponent implements OnInit {
  hqPrice: number
  percentList = []

  constructor() { }

  ngOnInit() {
    for (var i = 1; i <= TOP; i++) {
      this.percentList.push(i / 100)
    }
  }

}
