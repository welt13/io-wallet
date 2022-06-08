import { render, screen } from '@testing-library/react';
import {TableAccount} from '../../components/TableAccount';
import { MovementType, Transaction } from '../../types/interfaces/accountInterface';

describe('Test <TableAccount />', () => { 
  test('should render the Error component', () => { 
    const transactions: Transaction[] = [
      {
        accountId: "ES1936351498017945",
        date: "1/5/2022",
        type: MovementType.entry,
        description: "Duis at.",
        total: 600,
        id: 1
      },
      {
        accountId: "ES1936351498017945",
        date: "21/5/2022",
        type: MovementType.spent,
        description: "Duis at.",
        total: -22,
        id: 2
      }
    ]
    const {container} = render(<TableAccount transactions={transactions} />);
    expect(container.querySelectorAll('tbody > tr').length).toBe(2);
  })
});