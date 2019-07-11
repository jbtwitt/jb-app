import { Component, OnInit } from '@angular/core';
import { AlternateTempo } from '../../models/alternate-tempo.model';
import { BasicAlternateTempoMulticastService } from '../../shared/basic-alternate-tempo-multicast.service';

@Component({
  selector: 'app-bat-counter-main',
  templateUrl: './bat-counter-main.component.html',
  styleUrls: ['./bat-counter-main.component.sass']
})
export class BatCounterMainComponent implements OnInit {
  alternateTempo: AlternateTempo = new AlternateTempo();

  constructor(public batMulticastService: BasicAlternateTempoMulticastService) { }

  ngOnInit() {
  }
  get estimatedTime(): number {
    return this.alternateTempo.repeat * this.alternateTempo.tempo * (this.alternateTempo.goBeats + this.alternateTempo.stopBeats);
  }
}
