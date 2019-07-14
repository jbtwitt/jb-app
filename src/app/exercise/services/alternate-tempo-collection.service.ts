import { Injectable } from '@angular/core';
import { AlternateTempo, TempoAudio } from '../../models/alternate-tempo.model';
import { alternateTempoCounterAudioObservable } from '../../shared/alternate-tempo-counter-audio-observable';
import { BeatCounting } from '../../models/beat-counting.model';
import { tempoAudioCollection } from '../../data/tempo-audio-collection';

@Injectable({
  providedIn: 'root'
})
export class AlternateTempoCollectionService {
  public currentBeat: BeatCounting;
  subscription: any;

  constructor() { }

  start(alternateTempo: AlternateTempo): void {
    this.subscription = alternateTempoCounterAudioObservable(alternateTempo, tempoAudioCollection[alternateTempo.sound])
      .subscribe((bc: BeatCounting) => {
          this.currentBeat = bc;
        },
        () => {},
        () => {
          this.stop(alternateTempo);
        });
  }
  stop(alternateTempo: AlternateTempo): void {
    this.subscription.unsubscribe();
    this.currentBeat = null;
  }
}
