import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// App components & styles
import App from "./app";
import "./assets/global.css";

// Data fetching & state management
import { queryClient } from "./libs";
import { QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
