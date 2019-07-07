import { Injectable } from '@angular/core';
import { audios } from './consts';
import { alternateTempoObservable } from './alternate-tempo-observable';
import { AlternateTempo } from '../models/alternate-tempo.model';

@Injectable({
  providedIn: 'root'
})
export class BasicAlternateTempoService {
  alternateTempo: AlternateTempo;
  subscription: any;
  _tempoBeat: number;

  constructor() {}

  get inSession(): boolean {
    return (this.subscription) ? true : false;
  }
  get tempoBeat(): number {
    return this._tempoBeat;
  }
  start(tempo: AlternateTempo) {
    this.subscription = alternateTempoObservable(tempo)
        .subscribe(b => {
            this._tempoBeat = b;
            console.log(b);
            audios[b].play();
    });
  }
  stop(): void {
    if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = null;
    }
  }
}
