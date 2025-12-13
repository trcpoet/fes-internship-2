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

  useEffect(() => { setMsg(""); setForm({ email: "", password: "" }); }, [modalOpen, activeView]);

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(""); setLoading(true);
    try {
      if (activeView === "login") {
        await login(form.email, form.password);
        closeAuth();
      } else if (activeView === "register") {
        await register(form.email, form.password);
        closeAuth();
      } else if (activeView === "forgot") {
        await forgot(form.email);
        setMsg("Reset link sent. Check your email.");
      }
    } catch (err) {
      setMsg(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function run(fn) {
    try { setLoading(true); setMsg(""); await fn(); closeAuth(); }
    catch (e) { setMsg(e.message || "Something went wrong"); }
    finally { setLoading(false); }
  }

  if (!modalOpen) return null;

  return createPortal(
    <div className="auth__backdrop" onClick={closeAuth} role="dialog" aria-modal="true">
      <div className="auth__modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth__header">
          <div className="auth__tabs">
            <button className={`auth__tab ${activeView === "login" ? "active" : ""}`} onClick={() => setActiveView("login")}>Login</button>
            <button className={`auth__tab ${activeView === "register" ? "active" : ""}`} onClick={() => setActiveView("register")}>Register</button>
            <button className={`auth__tab ${activeView === "forgot" ? "active" : ""}`} onClick={() => setActiveView("forgot")} title="Optional">Forgot</button>
          </div>
          <button className="auth__close" onClick={closeAuth} aria-label="Close">×</button>
        </div>

        {user ? (
          <div className="auth__signed">
            <p className="auth__signed-text">Signed in as <b>{user.email || "Guest"}</b></p>
            <button className="auth__btn primary" onClick={() => run(() => logout())}>Logout</button>
          </div>
        ) : (
          <form className="auth__form" onSubmit={onSubmit}>
            {activeView !== "forgot" && (
              <>
                <input
                  className="auth__input"
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e)=>setForm(f=>({...f, email: e.target.value}))}
                />
                <input
                  className="auth__input"
                  type="password"
                  placeholder="Password"
                  required
                  value={form.password}
                  onChange={(e)=>setForm(f=>({...f, password: e.target.value}))}
                />
              </>
            )}
            {activeView === "forgot" && (
              <input
                className="auth__input"
                type="email"
                placeholder="Email to reset"
                required
                value={form.email}
                onChange={(e)=>setForm(f=>({...f, email: e.target.value}))}
              />
            )}

            {!!msg && <div className="auth__msg">{msg}</div>}

            <button className="auth__btn primary" disabled={loading} type="submit">
              {loading ? "Please wait…" :
                activeView === "login" ? "Login" :
                activeView === "register" ? "Create Account" : "Send Reset Link"}
            </button>

            <div className="auth__alt">
              <button type="button" className="auth__btn" onClick={() => run(loginAsGuest)}>Continue as Guest</button>
              <button type="button" className="auth__btn" onClick={() => run(loginWithGoogle)}>Sign in with Google</button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}