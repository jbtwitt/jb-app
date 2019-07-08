import { Component, OnInit } from '@angular/core';
import { AlternateTempo } from '../../models/alternate-tempo.model';
import { BatCounter } from '../../models/bat-counter.model';
import { BasicAlternateTempoMulticastService } from '../../shared/basic-alternate-tempo-multicast.service';

@Component({
  selector: 'app-bat-counter-main',
  templateUrl: './bat-counter-main.component.html',
  styleUrls: ['./bat-counter-main.component.sass']
})
export class BatCounterMainComponent implements OnInit {
  batCounter: BatCounter = new BatCounter();

  constructor(private batMulticastService: BasicAlternateTempoMulticastService) { }

  ngOnInit() {
    console.log(this.batCounter);
  }

}
