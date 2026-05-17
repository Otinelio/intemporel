import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Admin from "./pages/Admin";
import Kitchen from "./pages/Kitchen";
import MenuScan from "./pages/MenuScan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="menu" element={<Menu />} />
        </Route>
        <Route path="/menu/scan" element={<MenuScan />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cuisine" element={<Kitchen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
