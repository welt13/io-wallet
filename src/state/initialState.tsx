import { InitialStateInterface } from '../types/interfaces/initialStateInterface';

const initialState: InitialStateInterface = {
  user: {
    name: '',
    lastname: '',
    email: '',
    pass: '',
    id: 0,
  },
  account: {
    userId: 0,
    id: '',
    transactions: [],
  },
};
export default initialState;
