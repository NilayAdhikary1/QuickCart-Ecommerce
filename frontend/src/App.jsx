import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Login from "./screens/Login";

function App() {
  return (
    <>
      {/* <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer /> */}
      <Login/>
    </>
  );
}

export default App;
