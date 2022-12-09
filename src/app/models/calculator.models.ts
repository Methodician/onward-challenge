export type StepRow = {
  volumeA: number;
  volumeB: number;
  description?: string;
  // Maybe just add a "final" action type instead of a boolean?
  action?: 'Fill' | 'Dump' | 'Transfer' | 'Initial';
  // Could be used to illustrate steps in the UI
  sourceBucket?: 'A' | 'B';
  destinationBucket?: 'A' | 'B';
  // Could be replaced with an action type
  isFinalStep: boolean;
  bucketContainingTargetVolume?: 'A' | 'B' | 'Combined';
};
