import { createAction, props } from '@ngrx/store';

export const setHeaderText = createAction(
  '[Header] Set Header Text',
  props<{ headerText: string }>()
);
