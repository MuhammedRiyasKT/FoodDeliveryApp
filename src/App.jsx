import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import { ToastContainer, toast } from 'react-toastify';
import PlaceOrder from "./pages/PlaceOrder";
import Verify from "./pages/Verify";
import Myorders from "./pages/Myorders";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
   <>
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Menu Page */}
        <Route path="/menu" element={<ProtectedRoute> <Menu /> </ProtectedRoute>} />

        {/* Cart Page */}
        <Route path="/cart" element={<ProtectedRoute> <Cart /> </ProtectedRoute>} />

        {/* Login Page */}
        <Route path="/register" element={<Login insideRegister={true}/>} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        
        {/* place order */}
        <Route path="/order" element={<ProtectedRoute> <PlaceOrder /> </ProtectedRoute>} />

        {/* payment verify */}
        <Route path="/verify" element={<ProtectedRoute> <Verify /> </ProtectedRoute>} />

        {/* payment verify */}
        <Route path="/myorders" element={<ProtectedRoute> <Myorders /> </ProtectedRoute>} />

        {/* Redirect for unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>

    <ToastContainer
position="top-right"
autoClose={3000}

theme="colored"

/>
   </>
  );
}

export default App;
