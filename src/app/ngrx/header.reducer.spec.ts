import { headerReducer, initialState } from './header.reducer';

describe('Header Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = headerReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
