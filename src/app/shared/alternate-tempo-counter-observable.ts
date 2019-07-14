import { Observable } from 'rxjs';
import { scan, filter } from 'rxjs/operators';
import { AlternateTempo } from '../models/alternate-tempo.model';
import { alternateTempoSubject } from './alternate-tempo-subject';
import { BeatCounting } from '../models/beat-counting.model';

export const alternateTempoCounterObservable = (settings: AlternateTempo): Observable<BeatCounting> => {
  let multicaster: any;
  let multicasterSubscription: any;

  return new Observable(subscriber => {
    let count = 0;
    multicaster = alternateTempoSubject(settings);
    let tempoBeatSubscription = multicaster.subscribe((b: number) => {
      if (count === +settings.repeat && b === 0) {
        multicasterSubscription.unsubscribe();
        subscriber.complete();
      } else {
        subscriber.next({beat: b, count: count});
      }
    });
    let countSubscription = multicaster.pipe(filter((b: number) => b === 0),scan((c: number) => ++c, 0)).subscribe((c: number) => {
      count = c;
    });
    multicasterSubscription = multicaster.connect();
    return () => {
      multicasterSubscription.unsubscribe();
    }
});
}
