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
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../firebase/init";
import { AuthCtx } from "./AuthContext";

 export default function AuthProvider({ children }) {
   const [user, setUser] = useState(null);
   const [initializing, setInitializing] = useState(true);
 
   // modal state
   const [modalOpen, setModalOpen] = useState(false);
   const [activeView, setActiveView] = useState("login"); // 'login' | 'register' | 'forgot'
 
    useEffect(() => {
     const off = onAuthStateChanged(auth, async (u) => {
       if (u) {
         // User is logged in, fetch/create Firestore doc
         const docRef = doc(db, "users", u.uid);
         const docSnap = await getDoc(docRef);

         if (!docSnap.exists()) {
           // Create new user doc with default 'basic' plan
           await setDoc(docRef, {
             uid: u.uid,
             email: u.email,
             plan: "basic",
           });
           setUser({ ...u, plan: "basic" });
         } else {
           // User exists, read their plan
           const data = docSnap.data();
           setUser({ ...u, plan: data.plan });
         }
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

