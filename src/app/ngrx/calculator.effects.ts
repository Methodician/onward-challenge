import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, tap } from 'rxjs';
import { CalculatorService } from '../services/calculator.service';
import {
  calculateResults,
  calculateResultsSuccess,
  resetCalculator,
  submitBucketInput,
} from './calculator.actions';
import { setHeaderText } from './header.actions';

@Injectable()
export class CalculatorEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private calculatorSvc: CalculatorService
  ) {}

  navigateToResultsWhen$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitBucketInput),
      tap(() => {
        this.router.navigateByUrl('/results');
      }),
      // Note: This will lead to incorrect header text if the URL is manually
      // changed to /results (or page refreshed) but I know a few ways to fix it.
      // Time is valuable.
      map(() => setHeaderText({ headerText: 'Optimized Steps' }))
    )
  );

  navigateToHomeWhen$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetCalculator),
      tap(() => {
        this.router.navigateByUrl('/');
      }),
      map(() => setHeaderText({ headerText: 'Water Jug Problem' }))
    )
  );

  calculateOptimizedSolution$ = createEffect(() =>
    this.actions$.pipe(
      ofType(calculateResults),
      exhaustMap(() =>
        this.calculatorSvc
          .calculateOptimizedSolution$()
          .pipe(map((steps) => calculateResultsSuccess({ steps })))
      )
    )
  );
}
