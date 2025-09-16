import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/NotFound";
import HomePage from "../pages/Home/Home";
import Login from "../pages/Auth/Login/Login";
import FormPage from "../components/FormPage/FormPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/soporte" element={<FormPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
