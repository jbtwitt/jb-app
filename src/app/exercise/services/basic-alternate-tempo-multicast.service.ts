import { Injectable } from '@angular/core';
import { filter, first } from 'rxjs/operators';
import { alternateTempoSubject } from '../../shared/alternate-tempo-subject';
import { AlternateTempo } from '../../models/alternate-tempo.model';
import { audios, vGoodJob, vSetGo } from '../../shared/consts';

@Injectable({
  providedIn: 'root'
})
export class BasicAlternateTempoMulticastService {
  multicaster: any;
  multicasterSubscription: any;

  alternateTempo: AlternateTempo;
  startTime: Date;

  public tempoBeat: number;
  public count: number;
  public runTime: number;

  constructor() { }

  get inSession(): boolean {
    return (this.multicaster) ? true : false;
  }
  start(alternateTempo: AlternateTempo) {
    this.multicaster = alternateTempoSubject(alternateTempo);

    // ready set go
    const setGo = this.multicaster.pipe(first()).subscribe(() => {
      console.log('ready set go');
      vSetGo.play();
      setGo.unsubscribe();
    });

    // alternating beats
    const tempoSubscription = this.multicaster.pipe(filter(b => b === 0 || b === 1)).subscribe((b: number) => {
      // check reach target counting
      if (this.count === +alternateTempo.repeat && b === 0) {
        this.runTime = (new Date()).getTime() - this.startTime.getTime();
        this.stop();
        vGoodJob.play();
      } else {
        this.tempoBeat = b;
        audios[b].play();
        console.log(b);
      }
    });

    // count tempo
    this.count = 0;
    const countSubscription = this.multicaster.pipe(filter(b => b === 1)).subscribe(() => ++ this.count);

    // trace time & calc time
    this.runTime = 0;
    this.startTime = new Date();
    const timeSubscription = this.multicaster.pipe(filter(b => b === 1)).subscribe(() => {
      this.runTime = (new Date()).getTime() - this.startTime.getTime();
    });

    this.multicasterSubscription = this.multicaster.connect();
  }
  stop(): void {
    if (this.multicaster) {
      this.multicasterSubscription.unsubscribe();
      this.multicaster = null;
    }
  }
}
