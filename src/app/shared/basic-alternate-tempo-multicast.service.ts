import { Injectable } from '@angular/core';
import { alternateTempoSubject } from './alternate-tempo-subject';
import { AlternateTempo } from '../models/alternate-tempo.model';
import { BatCounter } from '../models/bat-counter.model';
import { audios, vGoodJob } from './consts';

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
  startTime: Date;
  _runTime: number;

  constructor() { }

  get inSession(): boolean {
    return (this.multicaster) ? true : false;
  }
  get tempoBeat(): number {
    return this._tempoBeat;
  }
  get count(): number {
    return this._count;
  }
  get runTime(): number {
    if (this.count > 0) {
      return this._runTime;
    }
  }

  start(batCounter: BatCounter) {
    let t = batCounter.alternateTempo.tempo * batCounter.alternateTempo.stopBeats;
    this.startTime = new Date();
    this.multicaster = alternateTempoSubject(batCounter.alternateTempo);
    //
    this.tempoSubscription = this.multicaster
        .subscribe(b => {
            this._tempoBeat = b;
            console.log(b);
            audios[b].play();
          });
    //
    this._count = 0;
    this.countSubscription = this.multicaster.subscribe(b => {
      if (b == 1) {
        ++this._count;
        this._runTime = (new Date()).getTime() - this.startTime.getTime() + t;
        // this._runTime += batCounter.alternateTempo.tempo * batCounter.alternateTempo.stopBeats;
      }
      if (this.count == batCounter.targetCount) {
        this.stop();
        vGoodJob.play();
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
