import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../header/Header";
import { Footer } from "../Footer/Footer";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="layout">
      <Header />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
