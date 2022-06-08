import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Account } from '../../pages/Account';
import { store } from '../../state/store';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

describe('Test <Account />', () => { 
  test('should render Account', () => {
    const wrapper = render(
      <Provider store={store}>
        <Account />
      </Provider>,
    );
    const h6 = wrapper.container.querySelector('h6');
    expect(h6).toBeInTheDocument();
  });
});