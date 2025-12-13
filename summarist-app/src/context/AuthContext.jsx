// src/context/auth-context.js
import { createContext, useContext } from "react";

/** Holds the auth state value; provided by AuthProvider */
export const AuthCtx = createContext(null);

/** Access the auth context (never import a 'useAuth' from firebase/auth) */
export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
