import "./App.css";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // 🔹 pakai HashRouter
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./components/PaymentPage";
import TransactionPage from "./components/TransactionPage";
import { CartProvider } from "./context/CartContext";
import InvoicePage from "./components/InvoicePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div className="p-4">
          <Routes>
            {/* Rute default langsung ke Home */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/transactions" element={<TransactionPage />} />
            <Route path="/invoice/:orderId" element={<InvoicePage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Jika path tidak dikenali, redirect ke Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
