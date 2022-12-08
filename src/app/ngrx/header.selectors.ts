import { createFeatureSelector, createSelector } from '@ngrx/store';
import { headerFeatureKey, HeaderState } from './header.reducer';

export const headerState = createFeatureSelector<HeaderState>(headerFeatureKey);

export const selectHeaderText = createSelector(
  headerState,
  (state) => state.headerText
);
