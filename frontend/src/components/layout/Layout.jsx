import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <main className="w-full h-auto flex flex-col">{children}</main>;
}
