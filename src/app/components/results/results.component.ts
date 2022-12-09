import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  calculateResults,
  resetCalculator,
} from 'src/app/ngrx/calculator.actions';
import {
  selectResults,
  selectVolumes,
} from 'src/app/ngrx/calculator.selectors';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  volumes$ = this.store.select(selectVolumes);
  results$ = this.store.select(selectResults);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(calculateResults());
  }

  onReset = () => this.store.dispatch(resetCalculator());

  stepIntroText = (stepLength: number, targetVolume: number) => {
    if (targetVolume === 0)
      return "Since you don't want any water, there's no need to take any steps.";
    else if (stepLength < 2) return "Sorry, we couldn't find a solution.";
    else return 'The steps to reach the desired volume are:';
  };

  doesBucketContainTargetVolume = (
    bucket: 'A' | 'B' | 'Combined',
    bucketContainingTargetVolume?: 'A' | 'B' | 'Combined'
  ) => bucket === bucketContainingTargetVolume;
}
