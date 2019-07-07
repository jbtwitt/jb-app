import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlternateTempoSettingModel } from '../models/tempo-settings.model';

@Injectable({
  providedIn: 'root'
})
export class AlternateTempoService {
  toggle: number = 0;
  t: number = 0;

  constructor() { }

  // nextBeat(onTime: number, offTime: number): Observable<any> {
  //   return this.beat(onTime, offTime).subscribe(b => this.beat(onTime, offTime)));
  // }
  getAlternateBeat(settings: AlternateTempoSettingModel): Observable<any> {
    this.t = 0;
    return new Observable(subscriber => {
      // let t = 0;
      // v1234.play();
      subscriber.next('go');
      let intervalId = setInterval(() => {
        // if (t < 4) audios[t].play();
        switch (++this.t) {
          case settings.startBeats:
            // v1234.play();
            subscriber.next('stop');
            break;
          case settings.totalBeats:
            // audios[0].play();
            subscriber.next('go');
            this.t = 0;
            break;
          default:
            if (this.t >= settings.totalBeats) {
              this.t = 0;
            }
        }
        console.log('' + settings.totalBeats + ', ' + this.t);
      }, settings.intervalNumber);
  
      // return unsubscribe for subsciber to dispose
      return () => {
        console.log('unsubscribe');
        clearInterval(intervalId);
      }
    });
  }
  beat(onTime: number, offTime: number, tm: number = 1000): Observable<any> {
    return new Observable(subscriber => {
      let sum = onTime + offTime;
      let t = 0;
      // setTimeout(() => {
      //   subscriber.next(this.toggle);
      // }, t);
      const intervalId = setInterval(() => {
        switch (++t) {
          case onTime:
            subscriber.next('off');
            break;
          case sum:
            subscriber.next('on');
            t = 0;
        }
        // console.log(t);
      }, tm);

      // unsubscribe to dispose
      return () => {
        console.log('unsubscribe');
        clearInterval(intervalId);
      }
    });
  }
}
