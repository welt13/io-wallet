import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Error } from '../components/Error';
import { execute } from '../server/services';
import { setUser } from '../state/userSlice';
import { UserInterface } from '../types/interfaces/userInterface';

export const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    pass: '',
  });
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (event: { target: { name: string; value: string; }; }) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const login = async () => {
    try {
      const resp: UserInterface[] = await execute('get', `/users?email=${loginData.email}`);
      if (resp.length === 0 || loginData.pass !== resp[0].pass) {
        setError(true);
      } else {
        dispatch(setUser(resp[0]));
        navigate('/account');
      }
    } catch {
      setError(true);
    }
  };

  return (
    <>
      <h1 className="align-center">ioWallet</h1>
      <form className="custom-form">
        <h3 className="align-center">Sign In</h3>
        <div className="mb-3">
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="custom-form__input"
            placeholder="Enter email"
            value={loginData.email}
            onChange={handleInputChange}
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            name="pass"
            type="password"
            className="custom-form__input"
            placeholder="Enter password"
            value={loginData.pass}
            onChange={handleInputChange}
            autoComplete="off"
          />
        </div>
        {error && <Error msg="Usuario o contraseña incorrectos." />}
        <div className="d-grid  mb-3">
          <button type="button" className="btn btn-primary custom-form__button" onClick={login} disabled={loginData.email === '' || loginData.pass === ''}>
            Login
          </button>
        </div>
        <p className="forgot-password text-right">
          ¿No tiene cuenta? <a href="/sign-up">Regístrese</a>
        </p>
      </form>
    </>
  );
};
