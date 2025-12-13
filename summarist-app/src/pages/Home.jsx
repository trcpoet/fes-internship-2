import { useNavigate } from 'react-router-dom';
import './home.css';
import Features from '../components/Features';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="wrapper__full">
      {/* NAV */}
      <nav className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <img className="nav__img" src="/assets/logo.png" alt="Summarist" />
          </figure>

          <ul className="nav__list--wrapper">
            <li className="nav__list nav__list--login" onClick={() => navigate('/for-you')}>
              Login
            </li>
            <li className="nav__list nav__list--disabled" title="Coming soon">About</li>
            <li className="nav__list nav__list--disabled" title="Coming soon">Contact</li>
            <li className="nav__list nav__list--disabled" title="Coming soon">Help</li>
          </ul>
        </div>
      </nav>

      {/* LANDING */}
      <section id="landing">
        <div className="container">
          <div className="row">
            <div className="landing__wrapper">
              <div className="landing__content">
                <div className="landing__content__title">
                  Gain more knowledge <br className="remove--tablet" />
                  in less time
                </div>

                <div className="landing__content__subtitle">
                  Great summaries for busy people,
                  <br className="remove--tablet" />
                  individuals who barely have time to read,
                  <br className="remove--tablet" />
                  and even people who don’t like to read.
                </div>

                <button className="btn home__cta--btn" onClick={() => navigate('/for-you')}>
                  Login
                </button>
              </div>

              <figure className="landing__image--mask">
                <img alt="landing" src="/assets/landing.png" />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <Features />
    </div>
  );
}
