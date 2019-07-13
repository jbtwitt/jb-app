import { Observable } from 'rxjs';
import { scan, filter } from 'rxjs/operators';
import { AlternateTempo } from '../models/alternate-tempo.model';
import { alternateTempoSubject } from './alternate-tempo-subject';
import { BeatCounting } from '../models/beat-counting.model';

export const alternateTempoCounterObservable = (settings: AlternateTempo): Observable<BeatCounting> => {
  let multicaster: any;

  return new Observable(subscriber => {
    let count = 0;
    multicaster = alternateTempoSubject(settings);
    let tempoBeatSubscription = multicaster.subscribe((b: number) => {
      if (count === +settings.repeat && b === 0) {
        countSubscription.unsubscribe();
        tempoBeatSubscription.unsubscribe();
        subscriber.complete();
      } else {
        subscriber.next({beat: b, count: count + 1});
      }
    });
    let countSubscription = multicaster.pipe(filter((b: number) => b === 1),scan((c: number) => ++c, 0)).subscribe((c: number) => {
        console.log('count: ' + c + '/' + settings.repeat);
        count = c;
    });
    multicaster.connect();
    return () => {
      countSubscription.unsubscribe();
      tempoBeatSubscription.unsubscribe();
      multicaster = null;
    }
});
}
