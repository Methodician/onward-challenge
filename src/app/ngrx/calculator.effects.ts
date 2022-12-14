import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { CalculatorService } from '../services/calculator.service';
import {
  calculateResults,
  calculateResultsError,
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

  navigateToResultsWhen$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(submitBucketInput),
        tap(() => {
          this.router.navigateByUrl('/results');
        })
      ),
    { dispatch: false }
  );

  navigateToHomeWhen$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(resetCalculator),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  calculateOptimizedSolution$ = createEffect(() =>
    this.actions$.pipe(
      ofType(calculateResults),
      exhaustMap(() =>
        this.calculatorSvc.calculateOptimizedSolution$().pipe(
          map((result) => calculateResultsSuccess({ result })),
          catchError((error) => of(calculateResultsError({ error })))
        )
      )
    )
  );
}
