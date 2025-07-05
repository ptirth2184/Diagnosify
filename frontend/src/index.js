// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SymptomProvider } from "./context/SymptomContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SymptomProvider>
      <App />
    </SymptomProvider>
  </React.StrictMode>
);
