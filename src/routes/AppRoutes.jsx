import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/NotFound";
import HomePage from "../pages/Home/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
