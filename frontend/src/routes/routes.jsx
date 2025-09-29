import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/NotFound";
import Login from "../pages/Auth/Login/Login";
import App from "../App";
import HomePage from "../pages/Home/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";
import Register from "../pages/Auth/Register/Register";

export default function AppRoutes() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login onLogin={handleLogin} />} />
        <Route path="register" element={<Register />} />
        <Route
          path="perfil"
          element={
            <ProtectedRoute isSignedIn={loggedIn}>
              <div className="mt-20 text-white">Perfil</div>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
