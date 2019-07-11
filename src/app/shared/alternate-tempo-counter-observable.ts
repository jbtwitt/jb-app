import { Observable } from 'rxjs';
import { scan, filter } from 'rxjs/operators';
import { AlternateTempo } from '../models/alternate-tempo.model';
import { alternateTempoSubject } from './alternate-tempo-subject';

export const alternateTempoCounterObservable = (settings: AlternateTempo): Observable<number> => {
  let multicaster: any;

  return new Observable(subscriber => {
    let count = 0;
    multicaster = alternateTempoSubject(settings);
    let tempoBeatSubscription = multicaster.subscribe((b: number) => {
      if (count === settings.repeat && b === 0) {
        subscriber.complete();
        countSubscription.unsubscribe();
        tempoBeatSubscription.unsubscribe();
      }
      subscriber.next(b);
    });
    let countSubscription = multicaster.pipe(
      filter((b: number) => b === 1),
      scan((c: number) => ++c, 0))
      .subscribe((c: number) => {
      console.log('count: ' + c + '/' + settings.repeat);
      count = c;
    });
    multicaster.connect();
  });
}
