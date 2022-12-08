import { createAction, props } from '@ngrx/store';

export const submitBucketInput = createAction(
  '[Calculator] Submit Bucket Input',
  props<{ bucketA: number; bucketB: number; desiredVolume: number }>()
);
