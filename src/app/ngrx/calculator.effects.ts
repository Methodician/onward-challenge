import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, tap } from 'rxjs';
import { submitBucketInput } from './calculator.actions';

@Injectable()
export class CalculatorEffects {
  constructor(private actions$: Actions, private router: Router) {}

  submitBucketInput$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(submitBucketInput),
        tap(() => {
          this.router.navigateByUrl('/results');
        })
      ),
    { dispatch: false }
  );
}
