import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/NotFound";
import Login from "../pages/Auth/Login/Login";
import App from "../App";
import HomePage from "../pages/Home/HomePage";
import ProtectedRoute from "./Protected";
import { useState } from "react";
import Register from "../pages/Auth/Register/Register";
import Profile from "../pages/profile/profile";
import EventDetail from "../pages/Event/[id]";
import { Soporte } from "../components/Soporte/Soporte";
import CheckoutPage from "../pages/Checkout/Checkout";
import Protected from "./Protected";

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
        <Route path="soporte" element={<Soporte />} />
        <Route path="event/:id" element={<EventDetail />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route
          path="perfil"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
