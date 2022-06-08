import { render, screen } from '@testing-library/react';
import {Error} from '../../components/Error';

describe('Test <Error />', () => { 
  test('should render the Error component', () => { 
    const errorText = 'Error Message';
    render(<Error msg={errorText} />);
    const textElement = screen.getByText(errorText);
    expect(textElement).toBeInTheDocument();
  })
});