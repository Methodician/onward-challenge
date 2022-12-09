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

export type CalculatorSuccess = {
  status: 'SUCCESS';
  steps: StepRow[];
};

export type CalculatorError = {
  status: 'FAILURE';
  code: string;
  message: string;
};

export type CalculatorResult = CalculatorSuccess | CalculatorError;
