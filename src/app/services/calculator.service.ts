import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, switchMap, take } from 'rxjs';
import { StepRow } from '../models/calculator.models';
import { selectVolumes } from '../ngrx/calculator.selectors';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor(private store: Store) {}

  calculateOptimizedSolution$ = () =>
    this.store.select(selectVolumes).pipe(
      take(1),
      map(({ bucketA, bucketB, targetVolume }) =>
        this.calculateOptimizedSolution(bucketA, bucketB, targetVolume)
      )
    );

  // Should create steps required to fill or transfer between buckets A and B to reach target volume in one of the buckets.
  // bucket A or bucket B must be filled completely but can be emptied partially into the other bucket
  // Either bucket A or bucket B or bucket A + B must contain the targetVolume at the final step.
  calculateOptimizedSolution = (
    bucketA: number,
    bucketB: number,
    targetVolume: number
  ): StepRow[] => {
    console.log(
      `Calculating optimized solution for ${bucketA}, ${bucketB}, ${targetVolume}...`
    );

    const maxBucketA = bucketA;
    const maxBucketB = bucketB;
    const steps: StepRow[] = [];
    // push the initial step
    steps.push({
      volumeA: 0,
      volumeB: 0,
      action: `Initial`,
      description: 'The containers are initially empty',
      isFinalStep: false,
    });

    if (targetVolume === 0) {
      return steps;
    }

    // If target volume is greater than the sum of the two buckets, it is impossible to reach the target volume.
    if (targetVolume > bucketA + bucketB) {
      throw new Error(
        `Target volume ${targetVolume} is greater than the sum of the two buckets ${bucketA} + ${bucketB}.`
      );
    }

    if (targetVolume === bucketA) {
      // fill bucket A
      steps.push({
        volumeA: targetVolume,
        volumeB: 0,
        action: `Fill`,
        description: `Fill bucket A`,
        isFinalStep: true,
        bucketContainingTargetVolume: 'A',
      });
    } else if (targetVolume === bucketB) {
      // fill bucket B
      steps.push({
        volumeA: 0,
        volumeB: targetVolume,
        action: `Fill`,
        description: `Fill bucket B`,
        isFinalStep: true,
        bucketContainingTargetVolume: 'B',
      });
    } else if (targetVolume === bucketA + bucketB) {
      // fill bucket A and B
      steps.push({
        volumeA: bucketA,
        volumeB: 0,
        action: `Fill`,
        description: `Fill bucket A`,
        isFinalStep: false,
      });
      steps.push({
        volumeA: bucketA,
        volumeB: bucketB,
        action: `Fill`,
        description: `Fill bucket B`,
        isFinalStep: true,
        bucketContainingTargetVolume: 'Combined',
      });
    } else if (targetVolume === bucketA - bucketB) {
      // fill bucket A and pour into bucket B
      steps.push({
        volumeA: bucketA,
        volumeB: 0,
        action: `Fill`,
        description: `Fill bucket A`,
        isFinalStep: false,
      });

      steps.push(
        transferBucketVolume(
          {
            volumeA: bucketA,
            volumeB: 0,
            sourceBucket: 'A',
            destinationBucket: 'B',
            description: `Transfer volume from bucket A to bucket B`,
            isFinalStep: true,
            bucketContainingTargetVolume: 'A',
          },
          maxBucketA,
          maxBucketB
        )
      );
    } else if (targetVolume === bucketB - bucketA) {
      // fill bucket B and pour into bucket A
      steps.push({
        volumeA: 0,
        volumeB: bucketB,
        action: `Fill`,
        description: `Fill bucket B`,
        isFinalStep: false,
      });

      steps.push(
        transferBucketVolume(
          {
            volumeA: 0,
            volumeB: bucketB,
            sourceBucket: 'B',
            destinationBucket: 'A',
            description: `Transfer volume from bucket B to bucket A`,
            isFinalStep: true,
            bucketContainingTargetVolume: 'B',
          },
          maxBucketA,
          maxBucketB
        )
      );
    } else if (targetVolume < bucketA && targetVolume % bucketB === 0) {
      // fill bucket B and pour into bucket A until target volume is reached
      // We assume they would prefer to carry one bucket rather than both, so add a step to empty the measuring bucket
      while (steps[steps.length - 1].volumeA < targetVolume) {
        const volumeA = steps[steps.length - 1].volumeA;
        steps.push({
          volumeA,
          volumeB: bucketB,
          action: `Fill`,
          description: `Fill bucket B`,
          isFinalStep: false,
        });

        steps.push(
          transferBucketVolume(
            {
              volumeA,
              volumeB: bucketB,
              sourceBucket: 'B',
              destinationBucket: 'A',
              description: `Transfer volume from bucket B to bucket A`,
              isFinalStep: false,
            },
            maxBucketA,
            maxBucketB
          )
        );
      }
      steps[steps.length - 1].isFinalStep = true;
      steps[steps.length - 1].bucketContainingTargetVolume = 'A';
    } else if (targetVolume < bucketB && targetVolume % bucketA === 0) {
      // fill bucket A and pour into bucket B until target volume is reached
      // We assume they would prefer to carry one bucket rather than both, so add a step to empty the measuring bucket
      while (steps[steps.length - 1].volumeB < targetVolume) {
        const volumeB = steps[steps.length - 1].volumeB;
        steps.push({
          volumeA: bucketA,
          volumeB,
          action: `Fill`,
          description: `Fill bucket A`,
          isFinalStep: false,
        });

        steps.push(
          transferBucketVolume(
            {
              volumeA: bucketA,
              volumeB,
              sourceBucket: 'A',
              destinationBucket: 'B',
              description: `Transfer volume from bucket A to bucket B`,
              isFinalStep: false,
            },
            maxBucketA,
            maxBucketB
          )
        );
      }
      steps[steps.length - 1].isFinalStep = true;
      steps[steps.length - 1].bucketContainingTargetVolume = 'B';
    }

    return steps;
  };
}

// transfers the volume from the source bucket to the destination bucket
// if destination bucket is full, the remaining volume stays in source bucket
const transferBucketVolume = (
  step: StepRow,
  maxBucketA: number,
  maxBucketB: number
): StepRow => {
  const { volumeA, volumeB, sourceBucket, destinationBucket } = step;
  if (!sourceBucket || !destinationBucket) {
    throw new Error('Source and destination buckets must be specified.');
  }
  if (sourceBucket === destinationBucket) {
    throw new Error('Source and destination buckets must be different.');
  }

  const sourceBucketVolume = sourceBucket === 'A' ? volumeA : volumeB;
  const destinationBucketVolume = destinationBucket === 'A' ? volumeA : volumeB;
  const maxDestinationBucketVolume =
    destinationBucket === 'A' ? maxBucketA : maxBucketB;
  const maxTransferVolume =
    maxDestinationBucketVolume - destinationBucketVolume;
  const transferredVolume = Math.min(sourceBucketVolume, maxTransferVolume);
  const remainingVolume = sourceBucketVolume - transferredVolume;
  const finalDestinationBucketVolume =
    destinationBucketVolume + transferredVolume;

  return {
    ...step,
    volumeA:
      sourceBucket === 'A' ? remainingVolume : finalDestinationBucketVolume,
    volumeB:
      sourceBucket === 'B' ? remainingVolume : finalDestinationBucketVolume,
    action: `Transfer`,
    description: `Transfer ${transferredVolume} from bucket ${sourceBucket} to bucket ${destinationBucket}`,
  };
};
