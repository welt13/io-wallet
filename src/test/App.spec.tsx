import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from '../App';
import { store } from '../state/store';

describe('Test <App />', () => {
  test('Existe el div con la clase "app"', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
    );
    const divElement = container.getElementsByClassName('app');
    expect(divElement).toBeTruthy();
  });
});
