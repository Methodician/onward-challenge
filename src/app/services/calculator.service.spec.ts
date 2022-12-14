import { TestBed } from '@angular/core/testing';

import { CalculatorService, transferBucketVolume } from './calculator.service';
import { initialState } from '../ngrx/calculator.reducer';
import { provideMockStore } from '@ngrx/store/testing';
import { CalculatorResult, StepRow } from '../models/calculator.models';

fdescribe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    });
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should work for the example use case', () => {
    const result = service.calculateOptimizedSolution(3, 5, 4);
    console.log(result);
    const expected: CalculatorResult = {
      status: 'SUCCESS',
      steps: [
        {
          action: 'Initial',
          description: 'The containers are initially empty',
          isFinalStep: false,
          volumeA: 0,
          volumeB: 0,
        },
        {
          volumeA: 0,
          volumeB: 5,
          action: 'Fill',
          description: 'Fill bucket A',
          isFinalStep: false,
        },
        {
          volumeA: 3,
          volumeB: 2,
          sourceBucket: 'A',
          action: 'Transfer',
          destinationBucket: 'B',
          description: 'Transfer 3 from bucket A to bucket B',
          isFinalStep: false,
        },
        {
          volumeA: 0,
          volumeB: 2,
          sourceBucket: 'A',
          action: 'Dump',
          description: 'Dump bucket A',
          isFinalStep: false,
        },
        {
          volumeA: 2,
          volumeB: 0,
          sourceBucket: 'B',
          destinationBucket: 'A',
          action: 'Transfer',
          description: 'Transfer 2 from bucket B to bucket A',
          isFinalStep: false,
        },
        {
          volumeA: 2,
          volumeB: 5,
          action: 'Fill',
          description: 'Fill bucket B',
          isFinalStep: false,
        },
        {
          volumeA: 3,
          volumeB: 4,
          sourceBucket: 'B',
          destinationBucket: 'A',
          action: 'Transfer',
          description: 'Transfer 1 from bucket B to bucket A',
          isFinalStep: true,
          bucketContainingTargetVolume: 'B',
        },
      ],
    };

    expect(result).toEqual(expected);
  });

  it('should transfer entire volume when destination bucket can hold it', () => {
    let fakeStepRow: StepRow = {
      volumeA: 6,
      volumeB: 0,
      sourceBucket: 'A',
      destinationBucket: 'B',
      description: 'Fill bucket A',
      isFinalStep: false,
    };
    const result = transferBucketVolume(fakeStepRow, 6, 8);
    expect(result).toEqual({
      volumeA: 0,
      volumeB: 6,
      sourceBucket: 'A',
      action: 'Transfer',
      destinationBucket: 'B',
      description: 'Transfer 6 from bucket A to bucket B',
      isFinalStep: false,
    });
  });

  it('should transfer partial volume when there is not enough space for everything', () => {
    let fakeStepRow: StepRow = {
      volumeA: 6,
      volumeB: 0,
      sourceBucket: 'A',
      destinationBucket: 'B',
      description: 'Fill bucket A',
      isFinalStep: false,
    };
    const result = transferBucketVolume(fakeStepRow, 6, 4);
    expect(result).toEqual({
      volumeA: 2,
      volumeB: 4,
      sourceBucket: 'A',
      action: 'Transfer',
      destinationBucket: 'B',
      description: 'Transfer 4 from bucket A to bucket B',
      isFinalStep: false,
    });
  });
});
