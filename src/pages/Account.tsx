import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { TableAccount } from '../components/TableAccount';
import { execute } from '../server/services';
import { setAccount } from '../state/accountSlice';
import { user } from '../state/userSlice';
import { AccountInterface, Transaction } from '../types/interfaces/accountInterface';

export const Account = () => {
  const userData = useSelector(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [accountNumber, setAccountNumber] = useState('');
  const [emptyTable, setEmptyTable] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const getAccount = async (id:number) => {
    try {
      const resp: AccountInterface[] = await execute('get', `/accounts?userId=${id}&_embed=transactions`);
      dispatch(setAccount(resp[0]));
      setAccountNumber(resp[0].id);
      setTotal(resp[0].transactions.reduce((acc, next) => acc + next.total, 0));
      if (resp[0].transactions.length > 0) {
        setEmptyTable(false);
        let movements: Transaction[] = [...resp[0].transactions];
        movements = movements.sort((elem1, elem2) => (elem1.id < elem2.id ? 1 : -1));
        setTransactions(movements);
      } else {
        setEmptyTable(true);
      }
    } catch {
      navigate('/');
    }
  };

  useEffect(() => {
    if (userData.id === 0) {
      navigate('/');
    } else {
      getAccount(userData.id);
    }
  }, []);

  return (
    <>
      <Navbar user={userData} />
      <div className="container">
        <div className="d-flex align-items-end mb-5">
          <h1 className="pe-3 me-3 border-end">Cuenta</h1>
          <h6> Número: {accountNumber}</h6>
        </div>
        <div className="d-flex justify-content-between mb-5">
          <h3><strong>Balance: </strong> <span className={total >= 0 ? 'positive' : 'negative'}>{total.toFixed(2).toString().replace('.', ',')} €</span> </h3>
          <div>
            <button type="button" className="btn btn-success me-3" onClick={() => { navigate('/deposit'); }}>Depósito</button>
            <button type="button" className="btn btn-danger" onClick={() => { navigate('/transfer'); }} disabled={total <= 0}>Transferencia</button>
          </div>
        </div>
        <div className="mb-5">
          {emptyTable && <h4 className="align-center">Sin movimientos</h4>}
          {!emptyTable && (
          <TableAccount transactions={transactions} />
          )}
        </div>
      </div>
    </>
  );
};
