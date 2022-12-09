import { createAction, props } from '@ngrx/store';
import { StepRow } from '../models/calculator.models';

export const submitBucketInput = createAction(
  '[Calculator] Submit Bucket Input',
  props<{ bucketA: number; bucketB: number; targetVolume: number }>()
);

export const calculateResults = createAction('[Calculator] Calculate Results');

export const calculateResultsSuccess = createAction(
  '[Calculator] Calculate Results Success',
  props<{ steps: StepRow[] }>()
);

export const calculateResultsFailure = createAction(
  '[Calculator] Calculate Results Failure',
  props<{ error: string }>()
);

export const resetCalculator = createAction('[Calculator] Reset Calculator');
