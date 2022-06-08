import { CombinedState } from 'redux';
import reducer, {user, setUser} from '../../state/userSlice';

describe('Test userSlice.tsx', () => { 
  const initialState = {
    name: '',
    lastname: '',
    email: '',
    pass: '',
    id: 0,
  };
  test('should return the initial state', () => {
    expect(reducer(undefined, {type: 'logout'})).toEqual(initialState);
  });

  test('should persist an user', () => {
    const newState = {
      name: 'John',
      lastname: 'Doe',
      email: 'jdoe@correo.com',
      pass: '1234',
      id: 1,
    }
    expect(reducer(initialState, setUser(newState))).toEqual(newState);
  });

  // test('should return the account persisted', () => {
  //   const userState: UserInterface = {
  //     name: '',
  //     lastname: '',
  //     email: '',
  //     pass: '',
  //     id: 0,
  //   };
  //   const accountState: AccountInterface = {
  //     userId: 1,
  //     id: 'ES1',
  //     transactions: [],
  //   };
  //   const newState: CombinedState<{ userState: UserInterface; accountState: AccountInterface; }> = { userState, accountState}
  //   const useSelector = jest.fn((state) => account(state));
  //   expect(useSelector(account(newState))).toBeCalled();
  // });

})