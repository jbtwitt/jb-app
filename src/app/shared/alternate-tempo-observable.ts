import { Observable } from 'rxjs';
import { AlternateTempo } from '../models/alternate-tempo.model';

export const alternateTempoObservable = (settings: AlternateTempo): Observable<number> => {
  // !!! force math calculation
  let totalBeats: number = +settings.goBeats;
  totalBeats += +settings.stopBeats;

  return new Observable(subscriber => {
    let intervalId: number;

    subscriber.next(-1);
    let t: number = 0;
    setTimeout(() => {  //delay 2 sec for: ready set go
      subscriber.next(0);
      const intervalId = setInterval(() => {
        if (++t === +settings.goBeats) {
          subscriber.next(1);
        }
        // console.log('-- ' + totalBeats + '/' + settings.goBeats + '/' + settings.stopBeats + ', ' + t);
        if (t === 0 || t === totalBeats) {
          subscriber.next(0);
          t = 0;
        }
      }, +settings.tempo);
    }, 2000);
  
    // return unsubscribe for subsciber to dispose
    return () => {
      clearInterval(intervalId);
      console.log('unsubscribe: clear intervalId');
    }  
  });
}
