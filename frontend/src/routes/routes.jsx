import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/NotFound";
import Login from "../pages/Auth/Login/Login";
import HomePage from "../pages/Home/HomePage";
import Register from "../pages/Auth/Register/Register";
import EventDetail from "../pages/Event/[id]";
import { Soporte } from "../components/Soporte/Soporte";
import CheckoutPage from "../pages/Checkout/Checkout";

import Protected from "./Protected";
import Resultados from "../pages/Event/Resultado";
import App from "../App";
import Dashboard from "../pages/Dashboard/Dashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="soporte" element={<Soporte />} />
          <Route path="event/:id" element={<EventDetail />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="resultados" element={<Resultados />} />
          <Route element={<Protected />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
