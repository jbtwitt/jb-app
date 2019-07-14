import { Injectable } from '@angular/core';
import { AlternateTempo, TempoAudio } from '../../models/alternate-tempo.model';
import { alternateTempoCounterAudioObservable } from '../../shared/alternate-tempo-counter-audio-observable';
import { BeatCounting } from '../../models/beat-counting.model';
import { tempoAudioCollection } from '../../data/alternate-tempo-collection';

@Injectable({
  providedIn: 'root'
})
export class AlternateTempoCollectionService {
  public currentBeat: BeatCounting;
  subscription: any;
  tempoAudio: TempoAudio = tempoAudioCollection.default;

  constructor() { }

  start(alternateTempo: AlternateTempo, tempoAudio: TempoAudio = tempoAudioCollection.default): void {
    this.subscription = alternateTempoCounterAudioObservable(alternateTempo, tempoAudio).subscribe((bc: BeatCounting) => {
      // console.log(bc);
      this.currentBeat = bc;
    })
  }
  stop(alternateTempo: AlternateTempo): void {
    this.subscription.unsubscribe();
    this.currentBeat = null;
  }
}
