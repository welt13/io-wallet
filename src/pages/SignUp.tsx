import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { execute } from '../server/services';
import { Error } from '../components/Error';

export const SignUp = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    name: '',
    lastname: '',
    email: '',
    pass: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (event: { target: { name: string; value: string; }; }) => {
    setError('');
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const singUp = async () => {
    setError('');
    try {
      const find = await execute('get', `/users?email=${signUpData.email}`);
      if (find.length === 0) {
        const resp = await execute('post', '/users', { ...signUpData });
        console.log(resp);
        try {
          const resp2 = await execute('post', '/accounts', {
            userId: resp.id,
            id: `ES${(Math.random() * 1000).toString().replace('.', '')}`,
          });
          console.log(resp2);
          navigate('/sign-in');
        } catch {
          await execute('delete', `/users/${resp.id}`);
          setError('Error al crear la cuenta');
        }
      } else {
        setError('Correo no disponible');
      }
    } catch {
      setError('Ha habido un error inténtelo de nuevo más tarde');
    }
  };
  return (
    <form className="custom-form">
      <h3 className="align-center">Sign Up</h3>
      <div className="mb-3">
        <label>Nombre</label>
        <input
          name="name"
          type="text"
          className="custom-form__input"
          placeholder="Nombre"
          value={signUpData.name}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </div>
      <div className="mb-3">
        <label>Apellido</label>
        <input
          name="lastname"
          type="text"
          className="custom-form__input"
          placeholder="Apellido"
          value={signUpData.lastname}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input
          name="email"
          type="email"
          className={`custom-form__input ${error ? 'input-error ' : ''}`}
          placeholder="Email"
          value={signUpData.email}
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
          placeholder="Contraseña"
          value={signUpData.pass}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </div>
      {error !== '' && (
        <div className="align-center mb-3">
          <Error msg={error} />
        </div>
      )}
      <div className="d-grid mb-3">
        <button type="button" className="btn btn-primary custom-form__button" onClick={singUp} disabled={signUpData.email === '' || signUpData.pass === ''}>
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        ¿Ya está registrado? <a href="/sign-in">Sign in</a>
      </p>
    </form>
  );
};
