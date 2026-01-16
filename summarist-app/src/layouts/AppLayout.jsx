// src/layouts/AppLayout.jsx
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="wrapper">
        <div className="search__background">
          <div className="search__wrapper">
            {/* <figure>
              <Link to="/for-you" aria-label="Go to For You">
                <img src="/assets/logo.png" alt="Summarist" />
              </Link>
            </figure> */}

            <div className="search__content">
              <Search />
                <button
                    type="button"
                    className="sidebar__toggle--btn"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open sidebar"
                >
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                    <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                    </svg>
                </button>
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </>
  );
}
