import { Subject, Observable } from 'rxjs';
import { multicast } from 'rxjs/operators';
import { alternateTempoObservable } from './alternate-tempo-observable';
import { AlternateTempo } from '../models/alternate-tempo.model';

export const alternateTempoSubject = (tempoSettings: AlternateTempo): Observable<number> => {
  // const subject = new Subject<number>();
  // const multicasted = alternateTempoObservable(tempoSettings).pipe(multicast(subject));
  // return multicasted;
  return alternateTempoObservable(tempoSettings).pipe(multicast(new Subject<number>()));
}
// export const alternateTempoSubject = (tempoSettings: AlternateTempo): Subject<number> => {
//   const subject = new Subject<number>();
//   alternateTempoObservable(tempoSettings).subscribe(subject);
//   return subject;
// }
