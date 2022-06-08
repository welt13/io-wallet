import { render, screen } from '@testing-library/react';
import {Navbar} from '../../components/Navbar';
import { UserInterface } from '../../types/interfaces/userInterface';

describe('Test <Navbar />', () => { 
  test('should render the Error component', () => { 
    const  user: UserInterface = {
      name: 'John',
      lastname: 'Doe',
      email: 'jdoe@correo.com',
      pass: '1234',
      id: 1,
    }
    render(<Navbar user={user} />);
    const linkElement = screen.getByText(/John/);
    expect(linkElement).toBeInTheDocument();
  })
});