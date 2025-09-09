import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/NotFound";
import HomePage from "../pages/Home/Home";
import Login from "../pages/Auth/Login/Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
