import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { withProviders } from "./providers/query/WithProviders.tsx";
import "./global.css";
import App from "./App.tsx"; 

const AppWithProviders = withProviders(App);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWithProviders/>
  </StrictMode>
);
