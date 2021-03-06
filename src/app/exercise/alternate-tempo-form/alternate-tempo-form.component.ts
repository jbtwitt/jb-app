import { Component, OnInit, Input } from '@angular/core';
import { AlternateTempo } from '../../models/alternate-tempo.model';
import { tempoAudioCollection } from '../../data/tempo-audio-collection';

@Component({
  selector: 'app-alternate-tempo-form',
  templateUrl: './alternate-tempo-form.component.html',
  styleUrls: ['./alternate-tempo-form.component.sass']
})
export class AlternateTempoFormComponent implements OnInit {
  @Input() alternateTempo: AlternateTempo = new AlternateTempo();
  taCollection = tempoAudioCollection;

  constructor() { }

  ngOnInit() {
  }

  get estimatedTime(): number {
    let n: number = +this.alternateTempo.goBeats;
    n += +this.alternateTempo.stopBeats;
    return n * this.alternateTempo.repeat * this.alternateTempo.tempo;
  }
}
