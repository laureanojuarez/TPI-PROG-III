import { Header } from "./components/header/Header";
import Layout from "./components/layout/Layout";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Layout>
      <Header />
      <AppRoutes />
    </Layout>
  );
}

export default App;
