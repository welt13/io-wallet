import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { SignUp } from '../../pages/SignUp';
import { store } from '../../state/store';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

describe('Test <SignUp />', () => { 
  test('should render SignUp', () => {
    const wrapper = render(
      <Provider store={store}>
        <SignUp />
      </Provider>,
    );
    const h3 = wrapper.container.querySelector('h3');
    expect(h3).toBeInTheDocument();
  });

  test('should render SignUp', () => {
    const wrapper = render(
      <Provider store={store}>
        <SignUp />
      </Provider>,
    );
    fireEvent.change(wrapper.getByPlaceholderText("Email"), {
      target: { value: "correo@correo.com" }
    });

    const inputFile = wrapper.getByPlaceholderText("Email");
  
  });
});