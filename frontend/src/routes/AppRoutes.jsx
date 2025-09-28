import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/NotFound";
import HomePage from "../pages/Home/Home";
import Login from "../pages/Auth/Login/Login";
import FormPage from "../components/FormPage/FormPage";
import { Profile } from "../pages/profile/profile";
import { useState } from "react";
import ProtectedRoute from "./ProtectedRoute";


export default function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/soporte" element={<FormPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
        <Route path='/profile' element={<Profile />} />
      </Route>
    </Routes>
  );
}
