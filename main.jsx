import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../../../../Documents/GitHub/Task6/App";
import "./App.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
