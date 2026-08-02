import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./page";
import "./globals.css";
import "./components/Grainient.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Home />
  </StrictMode>,
);
