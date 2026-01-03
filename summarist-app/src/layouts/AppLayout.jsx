// src/layouts/AppLayout.jsx
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  function runSearch(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }

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
              <div className="search">
                <form className="search__input--wrapper" onSubmit={runSearch}>
                  <input
                    className="search__input"
                    placeholder="Search for books"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                    <button className="search__icon" type="submit" aria-label="Search">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                      <path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 14 15.5l.27.28h.79L20 21.5 21.5 20l-6-6zM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z" />
                    </svg>
                  </button>



                  
                </form>
                                


              </div>

              
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
