import reducer, { setAccount } from '../../state/accountSlice';

describe('Test accountSlice.tsx', () => { 
  const initialState = {
    userId: 0,
    id: '',
    transactions: [],
  };
  test('should return the initial state', () => {
    expect(reducer(undefined, {type: {}})).toEqual(initialState);
  });

  test('should persist an account', () => {
    const newState = {
      userId: 1,
      id: 'ES1',
      transactions: [],
    }
    expect(reducer(initialState, setAccount(newState))).toEqual(newState);
  });
});