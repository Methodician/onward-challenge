import { createReducer, on } from '@ngrx/store';
import { StepRow } from '../models/calculator.models';
import {
  calculateResultsSuccess,
  submitBucketInput,
} from './calculator.actions';

export const calculatorFeatureKey = 'calculator';

export interface CalculatorState {
  bucketA: number;
  bucketB: number;
  targetVolume: number;
  results?: StepRow[];
}

export const initialState: CalculatorState = {
  bucketA: 0,
  bucketB: 0,
  targetVolume: 0,
};

export const calculatorReducer = createReducer(
  initialState,
  on(submitBucketInput, (state, { bucketA, bucketB, targetVolume }) => ({
    ...state,
    bucketA,
    bucketB,
    targetVolume,
  })),
  on(calculateResultsSuccess, (state, { steps }) => ({
    ...state,
    results: steps,
  }))
);
