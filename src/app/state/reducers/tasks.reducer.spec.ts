import { tasksReducer, initialState } from './tasks.reducer';

describe('Tasks Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = tasksReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
