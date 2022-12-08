import { calculatorReducer, initialState } from './calculator.reducer';

describe('Calculator Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = calculatorReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
