import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { ClockLabel} from './models';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'ng-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CountdownComponent implements OnInit, OnDestroy {

  @Input('end') end: number;
  @Input('now') now?: number;
  @Input('labels') labels?: string[] = [];
  @Input('dark') dark?: boolean;

  @Output('completed') completed = new EventEmitter();

  clock$: Observable<ClockLabel[]>;
  _value: BehaviorSubject<ClockLabel[]>;
  _diff: number;
  _sub: Subscription;
  _labels = new Map();
constructor() {}

ngOnInit() {

    this._labels.set('hours', this.labels[0] || 'Hor');
    this._labels.set('minutes', this.labels[1] || 'Min');
    this._labels.set('seconds', this.labels[2] || 'Seg');

    this._value = new BehaviorSubject([]);
    this.clock$ = this._value.asObservable();

    this._diff = this.now ? this.now - Date.now() : 0;
    this._initCountdown();
  }

  _initCountdown() {
    this._sub = Observable.interval(1000).subscribe((v) => {
      const t = this.end - (Date.now() + this._diff);

      if ( t > 0) {
        this._value.next([
          {label: this._labels.get('hours'), value: this.getHours(t)},
          {label: this._labels.get('minutes'), value: this.getMinutes(t)},
          {label: this._labels.get('seconds'), value: this.getSeconds(t)}
        ]);
      } else {
        this._value.next([
          {label: this._labels.get('hours'), value: 0},
          {label: this._labels.get('minutes'), value: 0},
          {label: this._labels.get('seconds'), value: 0}
        ]);
        this._value.complete();
        this.completed.emit();
        this._sub.unsubscribe();
      }
    });
  }

  getHours(t: number): number {
    return Math.floor( t / (1000 * 60 * 60));
  }
  getMinutes(t: number): number {
    return Math.floor( t / (1000 * 60) % 60);
  }
  getSeconds(t: number): number {
    return Math.floor( t / (1000) % 60);
  }
  ngOnDestroy() {
    this._sub.unsubscribe();
  }
}
