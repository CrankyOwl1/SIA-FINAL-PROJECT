import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Home from "./pages/Home";
import ProductManagement from "./pages/ProductManagement";
import LandingPage from "./pages/LandingPage";
import SellerPage from "./pages/SellerPage";
import SellerProfile from "./pages/SellerProfile"; // optional


// Layout wrapper to conditionally render Header
function LayoutWrapper({ children }) {
  const location = useLocation();
  const hideHeaderOnRoutes = ["/", "/login", "/register", "/seller/dashboard", "/seller/profile", "/products"];
  const shouldHideHeader = hideHeaderOnRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/seller/dashboard" element={<SellerPage />} />
          <Route path="/seller/profile" element={<SellerProfile />} />

        </Routes>
      </LayoutWrapper>
    </Router>
  );
}
