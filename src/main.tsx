import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
if (container == null) throw new Error();
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
