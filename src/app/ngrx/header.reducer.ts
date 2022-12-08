import { Action, createReducer, on } from '@ngrx/store';
import { setHeaderText } from './header.actions';

export const headerFeatureKey = 'header';

export interface HeaderState {
  headerText: string;
}

export const initialState: HeaderState = {
  headerText: 'Water Jug Problem',
};

export const headerReducer = createReducer(
  initialState,
  on(setHeaderText, (state, { headerText }) => ({ ...state, headerText }))
);
