// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const isActive = (p) => location.pathname === p;

  const { user, openAuth, logout } = useAuth();

  // close drawer on route change (mobile)
  useEffect(() => {
    onClose?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // lock scroll when open (mobile)
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`sidebar__overlay ${isOpen ? "" : "sidebar__overlay--hidden"}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside className={`sidebar ${isOpen ? "sidebar--opened" : ""}`}>
        <div className="sidebar__logo">
          <img src="/assets/logo.png" alt="Summarist" />
        </div>

        <div className="sidebar__wrapper">
          <div className="sidebar__top">
            <Link to="/for-you" style={{ textDecoration: "none" }}>
              <div className={`sidebar__link--wrapper ${isActive("/for-you") ? "active--tab" : ""}`}>
                <div className="sidebar__link--line" />
                <div className="sidebar__icon--wrapper">🏠</div>
                <div className="sidebar__link--text">For you</div>
              </div>
            </Link>

            <Link to="/library" style={{ textDecoration: "none" }}>
              <div className={`sidebar__link--wrapper ${isActive("/library") ? "active--tab" : ""}`}>
                <div className="sidebar__link--line" />
                <div className="sidebar__icon--wrapper">📚</div>
                <div className="sidebar__link--text">My Library</div>
              </div>
            </Link>

            <div className="sidebar__link--wrapper" style={{ cursor: "not-allowed", opacity: 0.6 }}>
              <div className="sidebar__link--line" />
              <div className="sidebar__icon--wrapper">✍️</div>
              <div className="sidebar__link--text">Highlights</div>
            </div>

            <div className="sidebar__link--wrapper" style={{ cursor: "not-allowed", opacity: 0.6 }}>
              <div className="sidebar__link--line" />
              <div className="sidebar__icon--wrapper">🔎</div>
              <div className="sidebar__link--text">Search</div>
            </div>
          </div>

          <div className="sidebar__bottom">
            <Link to="/settings" style={{ textDecoration: "none" }}>
              <div className={`sidebar__link--wrapper ${isActive("/settings") ? "active--tab" : ""}`}>
                <div className="sidebar__link--line" />
                <div className="sidebar__icon--wrapper">⚙️</div>
                <div className="sidebar__link--text">Settings</div>
              </div>
            </Link>

            <div className="sidebar__link--wrapper" style={{ cursor: "not-allowed", opacity: 0.6 }}>
              <div className="sidebar__link--line" />
              <div className="sidebar__icon--wrapper">❓</div>
              <div className="sidebar__link--text">Help & Support</div>
            </div>

            {!user ? (
              <button
                type="button"
                onClick={() => openAuth("login")}
                className="sidebar__link--wrapper"
                style={{ width: "100%", background: "transparent", border: "none", textAlign: "left", cursor: "pointer" }}
              >
                <div className="sidebar__link--line" />
                <div className="sidebar__icon--wrapper">🔐</div>
                <div className="sidebar__link--text">Login / Register</div>
              </button>
            ) : (
              <button
                type="button"
                onClick={logout}
                className="sidebar__link--wrapper"
                style={{ width: "100%", background: "transparent", border: "none", textAlign: "left", cursor: "pointer" }}
              >
                <div className="sidebar__link--line" />
                <div className="sidebar__icon--wrapper">🚪</div>
                <div className="sidebar__link--text">Logout</div>
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
