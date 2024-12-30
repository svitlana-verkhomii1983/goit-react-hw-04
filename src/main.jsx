import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
// Імпорт стилів нормалізації
import "modern-normalize";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
   <BrowserRouter>
    <App />
  </BrowserRouter>,
);