import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// IMPORTANT: AuthModal CSS should be global (index.css) OR create a dedicated file
// import "./authModal.css";   // optional if you create it

export default function AuthModal() {
  const navigate = useNavigate();

  const {
    modalOpen,
    closeAuth,
    activeView,
    setActiveView,
    user,
    login,
    register,
    forgot,
    logout,
    loginWithGoogle,
    loginAsGuest,
  } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMsg("");
    setForm({ email: "", password: "" });
  }, [modalOpen, activeView]);

  // ✅ key line: if modalOpen is false, NOTHING renders
  if (!modalOpen) return null;

  const runAuth = async (fn) => {
    try {
      setLoading(true);
      setMsg("");
      await fn();
      closeAuth();
      navigate("/for-you");
    } catch (e) {
      setMsg(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const runLogout = async () => {
    try {
      setLoading(true);
      setMsg("");
      await logout();
      closeAuth();
      navigate("/");
    } catch (e) {
      setMsg(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      setLoading(true);

      if (activeView === "login") {
        await login(form.email, form.password);
        closeAuth();
        navigate("/for-you");
      } else if (activeView === "register") {
        await register(form.email, form.password);
        closeAuth();
        navigate("/for-you");
      } else if (activeView === "forgot") {
        await forgot(form.email);
        setMsg("Reset link sent. Check your email.");
      }
    } catch (err) {
      setMsg(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="auth__wrapper" onClick={closeAuth} role="dialog" aria-modal="true">
      <div className="auth" onClick={(e) => e.stopPropagation()}>
        <div className="auth__content">
          <div className="auth__title">Log in to Summarist</div>

          <button
            type="button"
            className="btn guest__btn--wrapper"
            disabled={loading}
            onClick={() => runAuth(loginAsGuest)}
          >
            Login as a Guest
          </button>

          <div className="auth__separator">
            <span className="auth__separator--text">or</span>
          </div>

          <button
            type="button"
            className="btn google__btn--wrapper"
            disabled={loading}
            onClick={() => runAuth(loginWithGoogle)}
          >
            Login with Google
          </button>

          <div className="auth__separator">
            <span className="auth__separator--text">or</span>
          </div>

          {user ? (
            <div className="auth__signed">
              <p>
                Signed in as <b>{user.email || "Guest"}</b>
              </p>
              <button type="button" className="btn" onClick={runLogout}>
                Logout
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
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                  />
                  <input
                    className="auth__main--input"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
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
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  required
                />
              )}

              {msg && <div className="auth__msg">{msg}</div>}

              <button className="btn" disabled={loading}>
                {activeView === "forgot"
                  ? "Send Reset Link"
                  : activeView === "register"
                  ? "Register"
                  : "Login"}
              </button>

              <div
                className="auth__forgot--password"
                onClick={() => setActiveView("forgot")}
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
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
