import { useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { AuthCtx } from "./auth-context";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [activeView, setActiveView] = useState("login"); // 'login' | 'register' | 'forgot'

  useEffect(() => {
    const off = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setInitializing(false);
    });
    return () => off();
  }, []);

  // auth actions
  const login = (email, pw) => signInWithEmailAndPassword(auth, email, pw);
  const register = (email, pw) => createUserWithEmailAndPassword(auth, email, pw);
  const logout = () => signOut(auth);
  const forgot = (email) => sendPasswordResetEmail(auth, email);
  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
  const loginAsGuest = () => signInAnonymously(auth);

  // modal controls
  const openAuth = (view = "login") => { setActiveView(view); setModalOpen(true); };
  const closeAuth = () => setModalOpen(false);

  const value = useMemo(() => ({
    user, initializing,
    modalOpen, activeView, openAuth, closeAuth, setActiveView,
    login, register, logout, forgot, loginWithGoogle, loginAsGuest,
  }), [user, initializing, modalOpen, activeView]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
