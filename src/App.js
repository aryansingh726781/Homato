import './App.css'





// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import CartPage from './pages/CartPage';
// import OrdersPage from './pages/OrdersPage';
// // import FoodDetailsPage from './pages/FoodDetailsPage';
// // import CheckoutPage from './pages/CheckoutPage';
// import ProfilePage from './pages/ProfilePage';
// // import SearchPage from './pages/SearchPage';
// import { AuthProvider } from './context/AuthContext';
// import { CartProvider } from './context/CartContext';

// function App() {
//   return (
//     <Router> {/* Wrapping the entire app inside Router */}
//       <AuthProvider>
//         <CartProvider>
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegisterPage />} />
//             <Route path="/cart" element={<CartPage />} />
//             <Route path="/orders" element={<OrdersPage />} />
//             {/* <Route path="/food/:id" element={<FoodDetailsPage />} /> */}
//             {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
//             <Route path="/profile" element={<ProfilePage />} />
//             {/* <Route path="/search" element={<SearchPage />} /> */}
//           </Routes>
//         </CartProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import AdditemPage  from "./pages/AddItemPage";
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
        <AuthProvider>
      <CartProvider>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/profile" />} />
          <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/profile" />} />

          {/* Protected routes */}
          <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" />} />
          <Route path="/orders" element={user ? <OrdersPage /> : <Navigate to="/login" />} />
          <Route path="/addItem" element={user ? <AdditemPage /> : <Navigate to="/login" />} />
        </Routes>
      </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
