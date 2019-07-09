import { Injectable } from '@angular/core';
import { audios, vSetGo } from './consts';
import { alternateTempoObservable } from './alternate-tempo-observable';
import { AlternateTempo } from '../models/alternate-tempo.model';

@Injectable({
  providedIn: 'root'
})
export class BasicAlternateTempoService {
  alternateTempo: AlternateTempo;
  subscription: any;

  public tempoBeat: number;

  constructor() {}

  get inSession(): boolean {
    return (this.subscription) ? true : false;
  }
  start(tempo: AlternateTempo) {
    this.subscription = alternateTempoObservable(tempo).subscribe(b => {
        if (b === -1) {
            console.log('ready set go');
            vSetGo.play();
        } else {
            this.tempoBeat = b;
            console.log(b);
            audios[b].play();
        }
    });
  }
  stop(): void {
    if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = null;
    }
  }
}
