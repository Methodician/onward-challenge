import { Action, createReducer, on } from '@ngrx/store';

export const calculatorFeatureKey = 'calculator';

export interface State {
  bucketA: number;
  bucketB: number;
  desiredVolume: number;
}

export const initialState: State = {
  bucketA: 0,
  bucketB: 0,
  desiredVolume: 0,
};

export const calculatorReducer = createReducer(initialState);
