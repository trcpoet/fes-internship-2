import "./home.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Features from "../components/Features";
import { useAuth } from "../context/AuthContext";
import Reviews from "../components/Reviews.jsx";
import Numbers from "../components/Numbers.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  const { openAuth, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/for-you");
    }
  }, [user, navigate]);

  return (
    <div className="wrapper wrapper__full">
      <div className="sidebar__overlay sidebar__overlay--hidden"></div>

      <nav className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <img className="nav__img" src="/assets/logo.png" alt="Summarist" />
          </figure>

          <ul className="nav__list--wrapper">
            <li className="nav__list nav__list--login" onClick={() => openAuth("login")}>
              Login
            </li>
            <li className="nav__list nav__list--disabled" title="Coming soon">About</li>
            <li className="nav__list nav__list--disabled" title="Coming soon">Contact</li>
            <li className="nav__list nav__list--disabled" title="Coming soon">Help</li>
          </ul>
        </div>
      </nav>

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

                <button
                  className="btn home__cta--btn"
                  onClick={() => openAuth("login")}
                  aria-label="Open Login"
                >
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
      <Reviews />
      <Numbers />
      <Footer />
    </div>
  );
}
