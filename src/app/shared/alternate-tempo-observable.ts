import { Observable } from 'rxjs';
import { AlternateTempo } from '../models/alternate-tempo.model';

export const alternateTempoObservable = (settings: AlternateTempo): Observable<number> => {
    // !!! force math calculation
    let go: number = +settings.goBeats;
    let totalBeats: number = +settings.goBeats;
    totalBeats += +settings.stopBeats;
  
    return new Observable(subscriber => {
  
      subscriber.next(0);
      let t: number = 0;
      const intervalId = setInterval(() => {
        if (++t == go) {
          subscriber.next(1);
        }
        // console.log('- ' + totalBeats + '/' + settings.goBeats + '/' + settings.stopBeats + ', ' + t);
        if (t == totalBeats) {
          subscriber.next(0);
          t = 0;
        }
      }, settings.tempo);
  
      // return unsubscribe for subsciber to dispose
      return () => {
        clearInterval(intervalId);
        console.log('unsubscribe');
      }
    });
}
