import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Login } from '../../pages/Login';
import { store } from '../../state/store';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

describe('Test <Login />', () => { 
  test('should render Login', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>,
    );
    const linkElement = screen.getByText('Sign In');
    expect(linkElement).toBeInTheDocument();
  });

  test('should change value email', () => {
    const wrapper = render(
      <Provider store={store}>
        <Login />
      </Provider>,
    );
    fireEvent.change(wrapper.getByPlaceholderText("Email"), {
      target: { value: "correo@correo.com" }
    });

    expect(wrapper.getByPlaceholderText("Email")).toBeInTheDocument();
  
  });

  // test('should click button Login', () => {
  //   const wrapper = render(
  //     <Provider store={store}>
  //       <Login />
  //     </Provider>,
  //   );
  //   const event = new CustomEvent('on-click-core-button');
  //   wrapper.container.querySelector('button')?.dispatchEvent(event)

  //   expect(wrapper.container.querySelector('button').toBeInTheDocument();
  
  // });
});