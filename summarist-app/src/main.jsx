import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import AuthProvider from "./context/AuthProvider";
import { SettingsProvider } from "./context/SettingsContext";
import AuthModal from "./components/AuthModal";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SettingsProvider>
        <BrowserRouter>
          <App />
          <AuthModal />
        </BrowserRouter>
      </SettingsProvider>
    </AuthProvider>
  </React.StrictMode>
);
