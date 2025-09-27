import {Route, Routes} from "react-router-dom";
import NotFoundPage from "../pages/NotFound";
import Login from "../pages/Auth/Login/Login";
import FormPage from "../components/FormPage/FormPage";
import HomePage from "../pages/Home/HomePage";
import App from "../App";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="soporte" element={<FormPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
