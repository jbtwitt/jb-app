import { Observable } from 'rxjs';
import { AlternateTempo, TempoAudio } from '../models/alternate-tempo.model';
import { alternateTempoCounterObservable } from './alternate-tempo-counter-observable';
import { BeatCounting } from '../models/beat-counting.model';
import { audioPlayHelper } from '../shared/audioPlayHelper';

export const alternateTempoCounterAudioObservable = (settings: AlternateTempo, tempoAudio: TempoAudio): Observable<BeatCounting> => {
  let subscription: any;

  return new Observable(subscriber => {
    subscription = alternateTempoCounterObservable(settings).subscribe((bc: BeatCounting) => {
      console.log(bc);
      switch (+bc.beat) {
        case -1:
          audioPlayHelper.play(tempoAudio.start);
          audioPlayHelper.play(tempoAudio.background, true);
          break;
        default:
          tempoAudio.beats[bc.beat].play();
          subscriber.next(bc);
      }
    },
    error => {},
    () => {
      tempoAudio.end.play();
      audioPlayHelper.stop(tempoAudio.background);
      subscription.unsubscribe();
    });

    return () => {
      audioPlayHelper.stop(tempoAudio.background);
      subscription.unsubscribe();
    }
  });
}
