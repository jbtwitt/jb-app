
let audioPath = "assets/audios";
export const audios = [
    new Audio("assets/audios/one.m4a"),
    new Audio("assets/audios/two.m4a"),
    new Audio("assets/audios/three.m4a"),
    new Audio("assets/audios/four.m4a"),
    new Audio("assets/audios/five.m4a"),
];
export const v1234 = new Audio(`${audioPath}/v1234.m4a`);

import { Observable } from 'rxjs';

import { AlternateTempo } from '../models/alternate-tempo.model';
export const alternateTempoObservable = (settings: AlternateTempo): Observable<number> => {
  let t: number = 0;
  let go: number = +settings.goBeats - 1;
  let totalBeats: number = +go;
  totalBeats += +settings.stopBeats - 1;

  return new Observable(subscriber => {
    subscriber.next(0);

    const intervalId = setInterval(() => {
      if (t == go) {
        subscriber.next(1);
      }
      // console.log('- ' + totalBeats + '/' + settings.goBeats + '/' + settings.stopBeats + ', ' + t);
      if (t == totalBeats) {
        t = 0;
        subscriber.next(0);
      } else {
        ++ t;
      }
    }, settings.tempo);

    // return unsubscribe for subsciber to dispose
    return () => {
      console.log('unsubscribe');
      clearInterval(intervalId);
    }
  });
}

import { AlternateTempoSettingModel } from '../models/tempo-settings.model';
export const alternateBeat = (settings: AlternateTempoSettingModel): Observable<any> => {
  return new Observable(subscriber => {
    let t = 0;
    // v1234.play();
    subscriber.next('go');
    const intervalId = setInterval(() => {
      // if (t < 4) audios[t].play();
      switch (++t) {
        case settings.startBeats:
          // v1234.play();
          subscriber.next('stop');
          break;
        case settings.totalBeats:
          // audios[0].play();
          subscriber.next('go');
          t = 0;
      }
      console.log('' + settings.totalBeats + ', ' + t);
    }, settings.intervalNumber);

    // return unsubscribe for subsciber to dispose
    return () => {
      console.log('unsubscribe');
      clearInterval(intervalId);
    }
  });
}
