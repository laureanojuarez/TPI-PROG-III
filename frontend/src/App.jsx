import {Outlet} from "react-router-dom";
import {Footer} from "./components/Footer/Footer";
import {Header} from "./components/header/Header";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Header />
      <div className="w-full h-20 bg-gradient-to-t from-gray-50 via-neutral-500 to-gray-900"></div>
      <Outlet />
      <Footer />
    </Layout>
  );
}
export default App;
