import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const location = useLocation();
  const isActive = (p) => location.pathname === p;

  // from AuthProvider context
  const { user, openAuth, logout } = useAuth();

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar__logo">
        {/* WHY: public assets are served from the root; avoid fragile ../ paths */}
        <img src="/assets/logo.png" alt="Summarist" />
      </div>

      <div className="sidebar__wrapper">
        {/* Top Links */}
        <div className="sidebar__top">
          <Link to="/for-you" style={{ textDecoration: "none" }}>
            <div
              className={`sidebar__link--wrapper ${
                isActive("/for-you") ? "active--tab" : ""
              }`}
            >
              <div className="sidebar__link--line" />
              <div className="sidebar__icon--wrapper">
                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
                </svg>
              </div>
              <div className="sidebar__link--text">For you</div>
            </div>
          </Link>

          <Link to="/library" style={{ textDecoration: "none" }}>
            <div
              className={`sidebar__link--wrapper ${
                isActive("/library") ? "active--tab" : ""
              }`}
            >
              <div className="sidebar__link--line" />
              <div className="sidebar__icon--wrapper">
                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM288 604a64 64 0 1 0 128 0 64 64 0 1 0-128 0zm118-224a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm158 228a96 96 0 1 0 192 0 96 96 0 1 0-192 0zm148-314a56 56 0 1 0 112 0 56 56 0 1 0-112 0z" />
                </svg>
              </div>
              <div className="sidebar__link--text">My Library</div>
            </div>
          </Link>

          {/* Disabled items */}
          <div className="sidebar__link--wrapper" style={{ cursor: "not-allowed", opacity: 0.6 }}>
            <div className="sidebar__link--line" />
            <div className="sidebar__icon--wrapper">
              <svg stroke="currentColor" fill="currentColor" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M957.6 507.4L603.2 158.2a7.9 7.9 0 0 0-11.2 0L353.3 393.4a8.03 8.03 0 0 0-.1 11.3l.1.1 40 39.4-117.2 115.3a8.03 8.03 0 0 0-.1 11.3l.1.1 39.5 38.9-189.1 187H72.1c-4.4 0-8.1 3.6-8.1 8V860c0 4.4 3.6 8 8 8h344.9c2.1 0 4.1-.8 5.6-2.3l76.1-75.6 40.4 39.8a7.9 7.9 0 0 0 11.2 0l117.1-115.6 40.1 39.5a7.9 7.9 0 0 0 11.2 0l354.4-349.2c3.1-3.2 3.1-8.3 0-11.4zM477.5 893.4L137.9 558.8l115.6-114.2 339.6 334.6-115.6 114.2zm196.2-193.3L334.1 365.6 597.6 107l339.6 334.5-263.5 258.6z" />
              </svg>
            </div>
            <div className="sidebar__link--text">Highlights</div>
          </div>

          <div className="sidebar__link--wrapper" style={{ cursor: "not-allowed", opacity: 0.6 }}>
            <div className="sidebar__link--line" />
            <div className="sidebar__icon--wrapper">
              <svg stroke="currentColor" fill="currentColor" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
              </svg>
            </div>
            <div className="sidebar__link--text">Search</div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="sidebar__bottom">
          <Link to="/settings" style={{ textDecoration: "none" }}>
            <div
              className={`sidebar__link--wrapper ${
                isActive("/settings") ? "active--tab" : ""
              }`}
            >
              <div className="sidebar__link--line" />
              <div className="sidebar__icon--wrapper">
                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 0 0 9.3-35.2l-.9-2.6a443.74 443.74 0 0 0-79.7-137.9l-1.8-2.1a32.12 32.12 0 0 0-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 0 0-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 0 0-25.8 25.7l-15.8 85.4a351.86 351.86 0 0 0-99 57.4l-81.9-29.1a32 32 0 0 0-35.1 9.5l-1.8 2.1a446.02 446.02 0 0 0-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 0 0-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0 0 35.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0 0 25.8 25.7l2.7.5a449.4 449.4 0 0 0 159 0l2.7-.5a32.05 32.05 0 0 0 25.8-25.7l15.7-85a350 350 0 0 0 99.7-57.6l81.3 28.9a32 32 0 0 0 35.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35z" />
                </svg>
              </div>
              <div className="sidebar__link--text">Settings</div>
            </div>
          </Link>

          <div className="sidebar__link--wrapper" style={{ cursor: "not-allowed", opacity: 0.6 }}>
            <div className="sidebar__link--line" />
            <div className="sidebar__icon--wrapper">
              <svg stroke="currentColor" fill="currentColor" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                <path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" />
              </svg>
            </div>
            <div className="sidebar__link--text">Help & Support</div>
          </div>

          {/* Auth action: show Login/Register or Logout */}
          {!user ? (
            <button
              type="button"
              onClick={() => openAuth("login")}
              className="sidebar__link--wrapper"
              style={{ width: "100%", background: "transparent", border: "none", textAlign: "left", cursor: "pointer" }}
              aria-label="Open login"
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
              aria-label="Logout"
            >
              <div className="sidebar__link--line" />
              <div className="sidebar__icon--wrapper">
                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z" />
                </svg>
              </div>
              <div className="sidebar__link--text">Logout</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
