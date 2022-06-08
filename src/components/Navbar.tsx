import { UserInterface } from '../types/interfaces/userInterface';

interface Props {
  user: UserInterface
}

export const Navbar = ({ user }: Props) => (
  <div className="container d-flex justify-content-between align-items-top mb-5">
    <h6 className="me-5"><u>Usuario conectado:</u> {user.name} {user.lastname}</h6>
    <a href="/sign-in"> Logout </a>
  </div>
);
