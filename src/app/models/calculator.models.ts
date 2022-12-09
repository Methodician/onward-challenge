export type StepRow = {
  volumeA: number;
  volumeB: number;
  description?: string;
  action?: 'Fill' | 'Dump' | 'Transfer' | 'Initial';
  // Could be used to illustrate steps in the UI
  sourceBucket?: 'A' | 'B';
  destinationBucket?: 'A' | 'B';
  isFinalStep: boolean;
  bucketContainingTargetVolume?: 'A' | 'B' | 'Combined';
};
