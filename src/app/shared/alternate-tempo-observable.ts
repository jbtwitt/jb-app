import { Observable } from 'rxjs';
import { AlternateTempo } from '../models/alternate-tempo.model';

export const alternateTempoObservable = (settings: AlternateTempo): Observable<number> => {
    // !!! force math calculation
    let totalBeats: number = +settings.goBeats;
    totalBeats += +settings.stopBeats;
  
    return new Observable(subscriber => {
  
      subscriber.next(-1);
      let c: number = 0;   // repeat count
      let t: number = -2;  //delay 2 intervals for: ready set go
      const intervalId = setInterval(() => {
        if (++t === +settings.goBeats) {
          subscriber.next(1);
        }
        // console.log('-- ' + totalBeats + '/' + settings.goBeats + '/' + settings.stopBeats + ', ' + t);
        if (t === 0 || t === totalBeats) {
          if (++c > +settings.repeat) {
            console.log('--force clear intervalId for multicast after count - ' + c);
            clearInterval(intervalId);
          }
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
