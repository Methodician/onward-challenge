import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalculatorResult } from 'src/app/models/calculator.models';
import {
  calculateResults,
  resetCalculator,
} from 'src/app/ngrx/calculator.actions';
import { selectResult, selectVolumes } from 'src/app/ngrx/calculator.selectors';
import { setHeaderText } from 'src/app/ngrx/header.actions';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  volumes$ = this.store.select(selectVolumes);
  result$ = this.store.select(selectResult);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(calculateResults());
    this.store.dispatch(setHeaderText({ headerText: 'Optimized Steps' }));
  }

  onReset = () => this.store.dispatch(resetCalculator());

  stepIntroText = (result: CalculatorResult, targetVolume: number) => {
    if (result.status === 'FAILURE') {
      return result.message;
    }
    if (targetVolume === 0)
      return "Since you don't want any water, there's no need to take any steps.";
    else if (result.steps.length < 2)
      return "Sorry, we couldn't find a solution.";
    else return 'The steps to reach the desired volume are:';
  };

  doesBucketContainTargetVolume = (
    bucket: 'A' | 'B' | 'Combined',
    bucketContainingTargetVolume?: 'A' | 'B' | 'Combined'
  ) => bucket === bucketContainingTargetVolume;
}
