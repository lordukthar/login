// interval-emitter.service.ts

import { Injectable } from '@angular/core';
import { interval, of } from 'rxjs';
import { map, exhaustMap, mergeMap, switchMap, concatMap, delay, take, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntervalEmitterService {

  constructor() { }

  emitValues() {
    return interval(2000).pipe(
      map(value => `Source Value: ${value}`)
    );
  }

  // Example usage with exhaustMap
  getExhaustMap() {
    return this.emitValues().pipe(
      exhaustMap(val => this.mockHttpRequest(val))
    );
  }

  // Example usage with mergeMap
  getMergeMap() {
    return this.emitValues().pipe(
      mergeMap(val => this.mockHttpRequest(val))
    );
  }

  // Example usage with switchMap
  getSwitchMap() {
      return interval(2000).pipe(
        take(10),  // Limit to 10 emissions
        switchMap(val => this.mockHttpRequest(val.toString())),
        catchError(error => {
          console.error('Error:', error);
          return of('Error occurred');
        })
      );
    }

  // Example usage with concatMap
  getConcatMap() {
    return this.emitValues().pipe(
      concatMap(val => this.mockHttpRequest(val))
    );
  }

  // Simulate an HTTP request
  mockHttpRequest(value: string) {
    return of(`${value} - Processed`).pipe(delay(2000));
  }
}
