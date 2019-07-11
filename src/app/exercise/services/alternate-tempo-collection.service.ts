import { Injectable } from '@angular/core';
import { AlternateTempo } from '../../models/alternate-tempo.model';
import { alternateTempoCounterObservable } from '../../shared/alternate-tempo-counter-observable';
import { audios, vGoodJob, vSetGo } from '../../shared/consts';
import { BeatCounting } from '../../models/beat-counting.model';

@Injectable({
  providedIn: 'root'
})
export class AlternateTempoCollectionService {
  public currentBeat: BeatCounting;
  subscription: any;

  constructor() { }

  start(alternateTempo: AlternateTempo): void {
    this.subscription = alternateTempoCounterObservable(alternateTempo).subscribe((bc: BeatCounting) => {
      console.log(bc);
      this.currentBeat = bc;
      switch(bc.beat) {
        case -1:
          console.log('ready set go');
          vSetGo.play();
          break;
        default:
          audios[bc.beat].play();
      }
    },
    () => {}, // error
    () => {   // complete
      vGoodJob.play();
      this.currentBeat = null;
    });
  }
  stop(): void {
    this.subscription.unsubscribe();
    this.currentBeat = null;
  }
}
