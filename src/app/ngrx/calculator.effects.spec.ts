import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CalculatorEffects } from './calculator.effects';

describe('CalculatorEffects', () => {
  let actions$: Observable<any>;
  let effects: CalculatorEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CalculatorEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CalculatorEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
