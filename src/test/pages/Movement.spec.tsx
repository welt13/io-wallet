import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Movement } from '../../pages/Movement';
import { store } from '../../state/store';
import { MovementType } from '../../types/interfaces/accountInterface';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

describe('Test <Movement />', () => { 
  test('should render Movement', () => {
    const wrapper = render(
      <Provider store={store}>
        <Movement type={MovementType.entry} />
      </Provider>,
    );
    const h1 = wrapper.container.querySelector('h1');
    expect(h1).toBeInTheDocument();
  });
});