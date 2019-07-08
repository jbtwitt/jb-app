import { Injectable } from '@angular/core';
import { alternateTempoSubject } from './alternate-tempo-subject';
import { AlternateTempo } from '../models/alternate-tempo.model';
import { audios } from './consts';

@Injectable({
  providedIn: 'root'
})
export class BasicAlternateTempoMulticastService {
  multicaster: any;
  countSubscription: any;
  tempoSubscription: any;

  alternateTempo: AlternateTempo;
  _tempoBeat: number;
  _count: number;

  constructor() { }

  get inSession(): boolean {
    return (this.tempoSubscription) ? true : false;
  }
  get tempoBeat(): number {
    return this._tempoBeat;
  }
  get count(): number {
    return this._count;
  }

  start(tempo: AlternateTempo) {
    this.multicaster = alternateTempoSubject(tempo);
    this.tempoSubscription = this.multicaster
        .subscribe(b => {
            this._tempoBeat = b;
            console.log(b);
            audios[b].play();
    });
    this._count = 0;
    this.countSubscription = this.multicaster.subscribe(b => {
      if (b == 1) {
        ++this._count;
      }
    })
    this.multicaster.connect();
  }
  stop(): void {
    if (this.multicaster) {
      this.tempoSubscription.unsubscribe();
      this.countSubscription.unsubscribe();
      this.multicaster = null;
    }
  }
}
