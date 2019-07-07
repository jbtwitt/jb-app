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

  constructor() {}

  get inSession(): boolean {
    return (this.subscription) ? true : false;
  }
  start(tempo: AlternateTempo) {
    this.subscription = alternateTempoObservable(tempo)
        .subscribe(b => {
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
