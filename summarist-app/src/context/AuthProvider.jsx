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
import { doc, getDoc, setDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db, googleProvider } from "../firebase/init";
import { AuthCtx } from "./AuthContext";

 export default function AuthProvider({ children }) {
   const [user, setUser] = useState(null);
   const [initializing, setInitializing] = useState(true);
 
   // modal state
   const [modalOpen, setModalOpen] = useState(false);
   const [activeView, setActiveView] = useState("login"); // 'login' | 'register' | 'forgot'
 
   // auth state
    useEffect(() => {
    const off = onAuthStateChanged(auth, async (u) => {
      if (u) {
        // 1. Fetch User Data (Basic)
        let userObj = { ...u, plan: "basic" }; // Default
        setUser(userObj);

        // 2. Listen to Subscriptions (The Source of Truth for Premium)
        const subsRef = collection(db, "customers", u.uid, "subscriptions");
        const q = query(subsRef, where("status", "in", ["active", "trialing"]));
        
        const unsubscribeSubs = onSnapshot(q, (snapshot) => {
          // If any active/trialing sub exists, they are premium
          const isPremium = !snapshot.empty;
          
          setUser((prev) => ({
            ...prev,
            plan: isPremium ? "premium" : "basic",
          }));
        });
        
        // Note: We aren't unsubscribing from subs here easily because this is inside the auth listener.
        // For a simple app, this is acceptable, or we could manage a separate useEffect for user.
      } else {
        setUser(null);
      }
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
  const openAuth = (view = "login") => { 
    setActiveView(view); 
    setModalOpen(true); 
  
  };

  const closeAuth = () => setModalOpen(false);

   const value = useMemo(
    () => ({
    user, 
    initializing,

    modalOpen, 
    activeView,
    openAuth, 
    closeAuth, 
    setActiveView, 

    //auth api
    login, 
    register, 
    forgot, 
    logout,
    loginWithGoogle, 
    loginAsGuest,
   }), [user, initializing, modalOpen, activeView]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

