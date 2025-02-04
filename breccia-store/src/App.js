import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CartProduct from "./components/CartProduct";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductsSection from "./components/Sections/ProductsSection";
import Sidebar from "./components/Sidebar";
import Menu from "./components/Menu";
import ProductDescription from "./pages/ProductDescription";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="">
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductDetails />} />
          <Route path="/product/:id" element={<ProductDescription />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Sidebar />
        <Menu />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
