// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import AuthProvider from "./context/AuthProvider";
import AuthModal from "./components/AuthModal";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
        {/* must be inside BrowserRouter for useNavigate to work */}
        <AuthModal />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
