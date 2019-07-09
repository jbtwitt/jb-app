import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { alternateTempoSubject } from './alternate-tempo-subject';
import { AlternateTempo } from '../models/alternate-tempo.model';
import { BatCounter } from '../models/bat-counter.model';
import { audios, vGoodJob, vSetGo } from './consts';

@Injectable({
  providedIn: 'root'
})
export class BasicAlternateTempoMulticastService {
  multicaster: any;
  countSubscription: any;
  tempoSubscription: any;
  timeSubscription: any;

  alternateTempo: AlternateTempo;
  startTime: Date;

  public tempoBeat: number;
  public count: number;
  public runTime: number;

  constructor() { }

  get inSession(): boolean {
    return (this.multicaster) ? true : false;
  }
  start(batCounter: BatCounter) {
    let miss = batCounter.alternateTempo.tempo * batCounter.alternateTempo.stopBeats;
    this.multicaster = alternateTempoSubject(batCounter.alternateTempo);

    // ready set go
    let setGo = this.multicaster.pipe(first()).subscribe(() => {
      console.log('ready set go');
      vSetGo.play();
      setGo.unsubscribe();
    });

    // alternating beats
    this.tempoSubscription = this.multicaster.pipe(filter(b => b === 0 || b === 1)).subscribe((b: number) => {
      this.tempoBeat = b;
      if (this.count == batCounter.targetCount && b === 0) {
        this.stop();
        vGoodJob.play();
      } else {
        audios[b].play();
        console.log(b);
      }
    });

    // count tempo
    this.count = 0;
    this.countSubscription = this.multicaster.pipe(filter(b => b === 1)).subscribe(() => ++ this.count);

    // trace time & calc time
    this.startTime = new Date();
    this.timeSubscription = this.multicaster.pipe(filter(b => b === 1)).subscribe(() => {
      this.runTime = (new Date()).getTime() - this.startTime.getTime() + miss;
    });

    this.multicaster.connect();
  }
  stop(): void {
    if (this.multicaster) {
      this.tempoSubscription.unsubscribe();
      this.countSubscription.unsubscribe();
      this.timeSubscription.unsubscribe();
      this.multicaster = null;
    }
  }
}
