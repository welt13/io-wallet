import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from '../../router/AppRouter';
import { store } from '../../state/store';

describe('Test <AppRouter />', () => {
  beforeAll(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>,
    );
  });

  test('Navegación por defecto a Login', () => {
    const linkElement = screen.getByText('Sign In');
    expect(linkElement).toBeInTheDocument();
  });
});
