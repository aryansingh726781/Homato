







// import React, { createContext, useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [totalPrice, setTotalPrice] = useState(0);

//   const history = useNavigate();

//   const addToCart = (food) => {
//     const exists = cartItems.find(item => item._id === food._id);
//     if (exists) {
//       setCartItems(cartItems.map(item => 
//         item._id === food._id ? { ...item, quantity: item.quantity + 1 } : item
//       ));
//     } else {
//       setCartItems([...cartItems, { ...food, quantity: 1 }]);
//     }
//   };

//   const removeFromCart = (id) => {
//     setCartItems(cartItems.filter(item => item._id !== id));
//   };

//   const updateQuantity = (id, quantity) => {
//     setCartItems(cartItems.map(item =>
//       item._id === id ? { ...item, quantity } : item
//     ));
//   };

//   const placeOrder = async () => {
//     if (cartItems.length === 0) {
//       setError('Your cart is empty!');
//       return;
//     }

//     setLoading(true);

//     try {
//       const orderData = {
//         items: cartItems,
//         totalPrice: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
//       };

//       const { data } = await axios.post('http://localhost:5000/api/orders', orderData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });

//       // Redirect to the order confirmation page or some other page
//       history.push(`/order/${data._id}`);
//     } catch (err) {
//       setError('Error placing order');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         placeOrder,
//         loading,
//         error,
//         totalPrice: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// CartContext.js (or wherever CartProvider is defined)

import React, { createContext, useState, useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const history = useNavigate();

  const addToCart = (food) => {
    const exists = cartItems.find(item => item._id === food._id);
    if (exists) {
      setCartItems(cartItems.map(item =>
        item._id === food._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item._id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return; // Prevent quantity from going below 1
    setCartItems(cartItems.map(item =>
      item._id === id ? { ...item, quantity } : item
    ));
  };

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderData = {
        items: cartItems,
        totalPrice: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      };

      const { data } = await axios.post('http://localhost:5000/api/orders', orderData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Redirect to the order confirmation page
      history(`/order/${data._id}`);
    } catch (err) {
      setError('Error placing order, please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Recalculate totalPrice whenever cartItems change
  useEffect(() => {
    const newTotalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        placeOrder,
        loading,
        error,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
