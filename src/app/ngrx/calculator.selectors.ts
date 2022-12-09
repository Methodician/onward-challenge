import { createFeatureSelector, createSelector } from '@ngrx/store';
import { calculatorFeatureKey, CalculatorState } from './calculator.reducer';

export const calculatorState =
  createFeatureSelector<CalculatorState>(calculatorFeatureKey);

export const selectVolumes = createSelector(calculatorState, (state) => ({
  bucketA: state.bucketA,
  bucketB: state.bucketB,
  targetVolume: state.targetVolume,
}));

export const selectResults = createSelector(
  calculatorState,
  (state) => state.results
);
