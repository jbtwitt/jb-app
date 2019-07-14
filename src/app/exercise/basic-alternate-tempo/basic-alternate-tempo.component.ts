import { Component, OnInit, Input } from '@angular/core';
import { AlternateTempo } from '../../models/alternate-tempo.model';
import { BasicAlternateTempoMulticastService } from '../services/basic-alternate-tempo-multicast.service';

@Component({
  selector: 'app-basic-alternate-tempo',
  templateUrl: './basic-alternate-tempo.component.html',
  styleUrls: ['./basic-alternate-tempo.component.sass']
})
export class BasicAlternateTempoComponent implements OnInit {
  @Input() alternateTempo: AlternateTempo = new AlternateTempo();

  constructor(public batService: BasicAlternateTempoMulticastService) { }

  ngOnInit() {
  }

}
