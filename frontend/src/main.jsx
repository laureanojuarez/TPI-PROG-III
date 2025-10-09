import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import AppRoutes from "./routes/routes.jsx";
import { AuthContextProvider } from "./services/auth/AuthContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <AppRoutes />
    </AuthContextProvider>
  </StrictMode>
);
