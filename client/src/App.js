import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import ItemDetails from "./pages/itemDetails/ItemDetails";
import Checout from "./pages/checkout/Checout";
import Confirmation from "./pages/checkout/Confirmation";
import Navbar from "./pages/global/Navbar";
import CartMenu from "./pages/global/CartMenu";
import Footer from "./pages/global/Footer";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="checkout" element={<Checout />} />
          <Route path="checkout/success" element={<Confirmation />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
