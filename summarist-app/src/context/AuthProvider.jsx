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
 
   // auth state
    useEffect(() => {
     const off = onAuthStateChanged(auth, async (u) => {
       if (u) {
         try {
           // User is logged in, fetch/create Firestore doc
           const docRef = doc(db, "users", u.uid); // Get Firestore doc
           const docSnap = await getDoc(docRef); // Get doc data

           if (!docSnap.exists()) {
             // Create new user doc
             // Guests get 'premium', others get 'basic'
             const defaultPlan = u.isAnonymous ? "premium" : "basic";
             
             await setDoc(docRef, {
               uid: u.uid,
               email: u.email || "", // Ensure no undefined
               plan: defaultPlan,
             });
             setUser({ ...u, plan: defaultPlan });
           } else {
             // User exists, read their plan
             const data = docSnap.data();
             // Determine plan: prioritize Firestore, fallback to logic if missing
             const existingPlan = data.plan || (u.isAnonymous ? "premium" : "basic");
             setUser({ ...u, plan: existingPlan });
           }
         } catch (error) {
           console.error("Auth Error (Firestore sync failed):", error);
           // Fallback: Use auth data but assume default plan to keep app working
           const fallbackPlan = u.isAnonymous ? "premium" : "basic";
           setUser({ ...u, plan: fallbackPlan });
         }
       } else {
         setUser(null);
       }
       setInitializing(false);
     });
     // cleanup
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

