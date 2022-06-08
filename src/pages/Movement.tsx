import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Error } from '../components/Error';
import { Navbar } from '../components/Navbar';
import { transformNumber } from '../helpers/utils';
import { execute } from '../server/services';
import { account } from '../state/accountSlice';
import { user } from '../state/userSlice';
import { MovementType, NewTransaction } from '../types/interfaces/accountInterface';

interface Props {
  type: MovementType;
}

export const Movement = ({ type }: Props) => {
  const userData = useSelector(user);
  const navigate = useNavigate();
  const accountInfo = useSelector(account);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [movementData, setMovementData] = useState({
    amount: '',
    amountError: '',
    accountNumber: '',
    accountNumberError: '',
    description: '',
  });

  const handleValidate = (event: { target: { value: string; }; }) => {
    setMovementData({
      ...movementData,
      amountError: (!Number.isNaN(parseFloat(event.target.value))) ? '' : 'Debe ser un valor numérico',
    });
  };

  const handleInputChange = (event: { target: { name: string; value: string; }; }) => {
    setMovementData({
      ...movementData,
      [event.target.name]: event.target.value,
    });
  };

  const findAccount = async () => {
    try {
      setError(false);
      setErrorText('');
      const resp = await execute('get', `/accounts?id=${movementData.accountNumber}`);
      setMovementData({
        ...movementData,
        accountNumberError: resp.length === 0 ? 'Cuenta no válida' : '',
      });
    } catch {
      setError(true);
      setErrorText('Error en la transacción, inténtelo de nuevo más tarde');
    }
  };

  const doMovement = async (movement: NewTransaction) => {
    try {
      setError(false);
      setErrorText('');
      await execute('post', '/transactions', {
        accountId: movement.accountId,
        date: movement.date,
        type: movement.type,
        description: movement.description,
        total: (movement.type === MovementType.entry) ? movement.total : -movement.total,
      });
    } catch {
      setError(true);
      setErrorText('Error en la transacción, inténtelo de nuevo más tarde');
    }
  };

  const transaction = async () => {
    const finalAmount: number = transformNumber(movementData.amount);
    const movement: NewTransaction = {
      accountId: '',
      date: new Date().toLocaleDateString(),
      type: MovementType.entry,
      description: movementData.description || 'Movimiento realizado',
      total: finalAmount,
    };
    if (type === MovementType.spent) {
      movement.accountId = movementData.accountNumber;
      doMovement(movement);
      movement.type = type;
    }
    movement.accountId = accountInfo.id;
    doMovement(movement);
    if (!error) {
      navigate('/account');
    }
  };

  return (
    <>
      <Navbar user={userData} />

      <div className="container">
        <button type="button" className="btn btn-secondary mb-5" onClick={() => { navigate('/account'); }}>Volver</button>
        <h1 className="mb-3"> {type === MovementType.entry ? 'Depósito' : 'Transferencia'}</h1>
        <form className="d-flex flex-column">
          {type === MovementType.spent && (
          <>
            <div className="d-flex align-items-center">
              <label className="custom-form__label me-5">Cuenta destino*</label>
              <input
                name="accountNumber"
                type="text"
                className={`custom-form__input ${movementData.accountNumberError !== '' ? 'input-error ' : ''}`}
                placeholder="Número de cuenta"
                autoComplete="off"
                value={movementData.accountNumber}
                onChange={handleInputChange}
                onBlur={findAccount}
                required
              />
            </div>
            {movementData.accountNumberError !== '' && (
              <div className="align-center">
                <Error msg={movementData.accountNumberError} />
              </div>
            )}
          </>
          )}
          <div className="d-flex align-items-center">
            <label className="custom-form__label me-5">Importe €*</label>
            <input
              name="amount"
              type="text"
              className={`custom-form__input ${movementData.amountError !== '' ? 'input-error ' : ''}`}
              placeholder="Importe"
              value={movementData.amount}
              onChange={handleInputChange}
              onBlur={handleValidate}
              autoComplete="off"
              required
            />
          </div>
          {movementData.amountError !== '' && (
            <div className="align-center">
              <Error msg={movementData.amountError} />
            </div>
          )}
          <div className="d-flex align-items-center">
            <label className="custom-form__label me-5">Concepto</label>
            <textarea
              name="description"
              className="custom-form__input"
              placeholder="Movimiento"
              value={movementData.description}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
          {error && <Error msg={errorText} />}
          <div className="ms-auto">
            <button
              type="button"
              className="btn btn-primary"
              onClick={transaction}
              disabled={movementData.amount === '' || movementData.amountError !== '' || movementData.accountNumberError !== ''}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
