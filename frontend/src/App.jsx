import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Soporte from "./pages/Soporte/Soporte";
import EventDetail from "./pages/Event/[id]";
import Resultados from "./pages/Event/Resultado";
import Protected from "./routes/Protected";
import NotFoundPage from "./routes/NotFound";
import Admin from "./pages/Dashboard/Admin";
import Checkout from "./pages/Checkout/Checkout";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserProfile from "./components/userProfile/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="soporte" element={<Soporte />} />
          <Route path="event/:id" element={<EventDetail />} />
          <Route path="checkout/:id" element={<Checkout />} />
          <Route path="resultados" element={<Resultados />} />
          <Route element={<Protected />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admin" element={<Admin />} />
            <Route path="perfil" element={<UserProfile />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
