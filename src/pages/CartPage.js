
// import React, { useEffect } from 'react';
// import { useCart } from '../context/CartContext';

// const CartPage = () => {
//   const { cartItems, placeOrder, loading, error, totalPrice } = useCart();

//   useEffect(() => {
//     if (error) {
//       alert(error);
//     }
//   }, [error]);

//   return (
//     <div>
//       <h1>Your Cart</h1>
//       <div>
//         {cartItems.length > 0 ? (
//           cartItems.map(item => (
//             <div key={item._id}>
//               <h2>{item.name}</h2>
//               <p>Quantity: {item.quantity}</p>
//               <p>Total: ${item.price * item.quantity}</p>
//             </div>
//           ))
//         ) : (
//           <p>Your cart is empty</p>
//         )}
//       </div>
//       <h2>Total: ${totalPrice.toFixed(2)}</h2>
//       <button onClick={placeOrder} disabled={loading}>
//         {loading ? 'Placing Order...' : 'Place Order'}
//       </button>
//     </div>
//   );
// };

// export default CartPage;







import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/orders',
        {
          items: cartItems.map((item) => ({
            food: item._id,
            quantity: item.quantity,
          })),
          totalPrice: total,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      toast.success('Order placed successfully!');
      clearCart();
      navigate('/orders');
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || 'Order placement failed!';
      toast.error(msg);
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-header">Your Cart</h1>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <div>
                <h2>{item.name}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${item.price * item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="total-section">Total: ${total}</div>
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </>
      ) : (
        <p className="empty-cart-message">Your cart is empty</p>
      )}
    </div>
  );
  
};

export default CartPage;
