import { Injectable } from '@angular/core';
import { AlternateTempo } from '../../models/alternate-tempo.model';
import { alternateTempoCounterObservable } from '../../shared/alternate-tempo-counter-observable';
import { audios, vGoodJob, vSetGo } from '../../shared/consts';

@Injectable({
  providedIn: 'root'
})
export class AlternateTempoCollectionService {

  constructor() { }

  start(alternateTempo: AlternateTempo): void {
    const subscription = alternateTempoCounterObservable(alternateTempo).subscribe((b: number) => {
      console.log(b);
      switch(b) {
        case -1:
          console.log('ready set go');
          vSetGo.play();
          break;
        default:
          audios[b].play();
      }
    },
    () => {}, // error
    () => {   // complete
      vGoodJob.play();
    });
  }
}
