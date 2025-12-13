import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../context/AuthContext";


export default function AuthModal() {
  const {
    modalOpen, closeAuth, activeView, setActiveView,
    user, login, register, forgot, logout,
    loginWithGoogle, loginAsGuest,
  } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMsg("");
    setForm({ email: "", password: "" });
  }, [modalOpen, activeView]);

  if (!modalOpen) return null;

  const run = async (fn) => {
    try { setLoading(true); setMsg(""); await fn(); closeAuth(); }
    catch (e) { setMsg(e?.message || "Something went wrong"); }
    finally { setLoading(false); }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg(""); setLoading(true);
    try {
      if (activeView === "login") {
        await login(form.email, form.password);
        closeAuth();
      } else if (activeView === "register") {
        await register(form.email, form.password);
        closeAuth();
      } else {
        await forgot(form.email);
        setMsg("Reset link sent. Check your email.");
      }
    } catch (err) {
      setMsg(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return createPortal(
    

    <div className="auth__wrapper" onClick={closeAuth} role="dialog" aria-modal="true">
      <div className="auth" onClick={(e) => e.stopPropagation()}>
        <div className="auth__content">
          <div className="auth__title">Log in to Summarist</div>

          {/* Guest */}
          <button
            type="button"
            className="btn guest__btn--wrapper"
            onClick={() => run(loginAsGuest)}
            aria-label="Login as Guest"
          >
            <figure className="google__icon--mask guest__icon--mask">
              <svg stroke="currentColor" fill="currentColor" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
              </svg>
            </figure>
            <div>Login as a Guest</div>
          </button>

          <div className="auth__separator">
            <span className="auth__separator--text">or</span>
          </div>

          {/* Google */}
          <button
            type="button"
            className="btn google__btn--wrapper"
            onClick={() => run(loginWithGoogle)}
            aria-label="Login with Google"
          >
            <figure className="google__icon--mask">
              <img src="/assets/google.png" alt="google" />
            </figure>
            <div>Login with Google</div>
          </button>

          <div className="auth__separator">
            <span className="auth__separator--text">or</span>
          </div>

          {/* Main form */}
          {user ? (
            <div className="auth__signed">
              <p>Signed in as <b>{user.email || "Guest"}</b></p>
              <button type="button" className="btn" onClick={() => run(logout)}>
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <form className="auth__main--form" onSubmit={handleSubmit}>
              {activeView !== "forgot" && (
                <>
                  <input
                    className="auth__main--input"
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                  <input
                    className="auth__main--input"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
                    required
                  />
                </>
              )}
              {activeView === "forgot" && (
                <input
                  className="auth__main--input"
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                />
              )}

              {msg && <div className="auth__msg">{msg}</div>}

              <button className="btn" type="submit" disabled={loading}>
                <span>
                  {loading ? "Please wait…" :
                    activeView === "login" ? "Login" :
                    activeView === "register" ? "Create Account" : "Send Reset Link"}
                </span>
              </button>
            </form>
          )}
        </div>

        <div
          className="auth__forgot--password"
          onClick={() => setActiveView("forgot")}
          role="button"
          tabIndex={0}
        >
          Forgot your password?
        </div>

        <button
          type="button"
          className="auth__switch--btn"
          onClick={() => setActiveView(activeView === "login" ? "register" : "login")}
        >
          {activeView === "login" ? "Don't have an account?" : "Already have an account?"}
        </button>

        <div className="auth__close--btn" onClick={closeAuth} role="button" aria-label="Close">
          <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>
    </div>,
    document.body
  );
}


