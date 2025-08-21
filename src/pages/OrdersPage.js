import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setOrders(result.data);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id}>
            <h2>Order ID: {order._id}</h2>
            <p>Status: {order.status}</p>
            <div>
              {order.items.map((item) => (
                <div key={item.foodId._id}>
                  <p>{item.foodId.name} x {item.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>You have no orders yet.</p>
      )}
    </div>
  );
};

export default OrdersPage;
