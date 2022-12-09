import { createAction, props } from '@ngrx/store';
import { CalculatorResult } from '../models/calculator.models';

export const submitBucketInput = createAction(
  '[Calculator] Submit Bucket Input',
  props<{ bucketA: number; bucketB: number; targetVolume: number }>()
);

export const calculateResults = createAction('[Calculator] Calculate Results');

export const calculateResultsSuccess = createAction(
  '[Calculator] Calculate Results Success',
  props<{ result: CalculatorResult }>()
);

export const calculateResultsError = createAction(
  '[Calculator] Calculate Results Failure',
  props<{ error: any }>()
);

export const resetCalculator = createAction('[Calculator] Reset Calculator');
