import { useNavigate } from 'react-router-dom';
import './home.css'; // keep this import near the top

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <img className="nav__img" src="/assets/logo.png" alt="Summarist" />
          </figure>

          <ul className="nav__list--wrapper">
            <li
              className="nav__list nav__list--login"
              onClick={() => navigate('/for-you')}
            >
              Login
            </li>
            <li className="nav__list nav__list--disabled" title="Coming soon">About</li>
            <li className="nav__list nav__list--disabled" title="Coming soon">Contact</li>
            <li className="nav__list nav__list--disabled" title="Coming soon">Help</li>
          </ul>
        </div>
      </nav>

      {/* ...rest of Home sections... */}
    </>
  );
}
