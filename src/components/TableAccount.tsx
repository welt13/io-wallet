import { MovementType, Transaction } from '../types/interfaces/accountInterface';

interface Props {
  transactions: Transaction[];
}

interface ELemProps {
  date: string,
  type: MovementType,
  description: string;
  total: number;
}

export const TableAccount = ({ transactions }: Props) => (
  <table className="table">
    <thead>
      <tr>
        <th scope="col">Fecha</th>
        <th scope="col">Tipo</th>
        <th scope="col">Descripción</th>
        <th scope="col">Importe</th>
      </tr>
    </thead>
    <tbody className="table-group-divider">
      {transactions.map((transaction) => (
        <TableElem
          date={transaction.date}
          type={transaction.type}
          description={transaction.description}
          total={transaction.total}
          key={transaction.id}
        />
      ))}
    </tbody>
  </table>
);

const TableElem = ({
  date, type, description, total,
}: ELemProps) => (
  <tr>
    <td>{date}</td>
    <td>{type}</td>
    <td>{description}</td>
    <td className={`text-end ${total >= 0 ? 'positive' : 'negative'}`}>{total.toFixed(2).toString().replace('.', ',')} €</td>
  </tr>
);
