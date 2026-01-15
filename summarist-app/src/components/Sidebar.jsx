// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSettings } from "../context/SettingsContext";
import { useEffect } from "react";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const isActive = (p) => location.pathname === p;
  //useLocation gives info about current page/route, which we use to highlight sidebar or not for ForYou/Library or Home/Sales

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

        <div 
          className="sidebar__wrapper" 
          style={{ height: location.pathname.includes("/player") ? "calc(100vh - 140px)" : "" }}
        >
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

            {location.pathname.includes("/player") && (
                <FontSizeControls />
            )}
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
                onClick={() => openAuth()}
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

function FontSizeControls() {
  const { fontSize, setFontSize } = useSettings();

  return (
    <div className="sidebar__link--wrapper sidebar__font--size-wrapper">
      <div 
        className={`sidebar__link--text sidebar__font--size-icon ${fontSize === 16 ? "sidebar__font--size-icon--active" : ""}`}
        onClick={() => setFontSize(16)}
      >
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="sidebar__font--size-icon-small" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M11.246 15H4.754l-2 5H.6L7 4h2l6.4 16h-2.154l-2-5zm-.8-2L8 6.885 5.554 13h4.892zM21 12.535V12h2v8h-2v-.535a4 4 0 1 1 0-6.93zM19 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path></g></svg>
      </div>
      <div 
        className={`sidebar__link--text sidebar__font--size-icon ${fontSize === 20 ? "sidebar__font--size-icon--active" : ""}`}
        onClick={() => setFontSize(20)}
      >
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="sidebar__font--size-icon-medium" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M11.246 15H4.754l-2 5H.6L7 4h2l6.4 16h-2.154l-2-5zm-.8-2L8 6.885 5.554 13h4.892zM21 12.535V12h2v8h-2v-.535a4 4 0 1 1 0-6.93zM19 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path></g></svg>
      </div>
      <div 
        className={`sidebar__link--text sidebar__font--size-icon ${fontSize === 24 ? "sidebar__font--size-icon--active" : ""}`}
        onClick={() => setFontSize(24)}
      >
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="sidebar__font--size-icon-large" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M11.246 15H4.754l-2 5H.6L7 4h2l6.4 16h-2.154l-2-5zm-.8-2L8 6.885 5.554 13h4.892zM21 12.535V12h2v8h-2v-.535a4 4 0 1 1 0-6.93zM19 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path></g></svg>
      </div>
      <div 
        className={`sidebar__link--text sidebar__font--size-icon ${fontSize === 28 ? "sidebar__font--size-icon--active" : ""}`}
        onClick={() => setFontSize(28)}
      >
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="sidebar__font--size-icon-xlarge" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M11.246 15H4.754l-2 5H.6L7 4h2l6.4 16h-2.154l-2-5zm-.8-2L8 6.885 5.554 13h4.892zM21 12.535V12h2v8h-2v-.535a4 4 0 1 1 0-6.93zM19 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path></g></svg>
      </div>
    </div>
  );
}
