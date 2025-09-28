import {Outlet} from "react-router-dom";
import {Footer} from "./components/Footer/Footer";
import {Header} from "./components/header/Header";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Header />
      <Outlet />
      <Footer />
    </Layout>
  );
}
export default App;
