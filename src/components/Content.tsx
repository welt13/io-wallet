import { Routes, Route } from 'react-router-dom';
import { Account } from '../pages/Account';
import { Login } from '../pages/Login';
import { Movement } from '../pages/Movement';
import { SignUp } from '../pages/SignUp';
import { MovementType } from '../types/interfaces/accountInterface';

export default function Content() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/account" element={<Account />} />
      <Route path="/deposit" element={<Movement type={MovementType.entry} />} />
      <Route path="/transfer" element={<Movement type={MovementType.spent} />} />
    </Routes>
  );
}
