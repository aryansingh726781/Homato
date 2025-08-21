import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
// import './HomePage.css'; // Import CSS file

const HomePage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodItems = async () => {
      const result = await axios.get('http://localhost:5000/api/foods');
      setFoodItems(result.data);
    };
    fetchFoodItems();
  }, []);

  const handleAddToCart = (item) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      // Show alert if user is not logged in
      alert('Please login first!');
      navigate('/login');
      return;
    }

    addToCart(item); // Call addToCart if logged in
  };

  return (
    <div className="home-page">
      <h1>Food Menu</h1>
      <div className="food-items">
        {foodItems.map(item => (
          <div key={item._id} className="food-item-card">
            <img className="food-item-image" src={item.image} alt={item.name} />
            {/* <img className="food-item-image" src={`http://localhost:5000/uploads/${item.image}`}alt={item.name} /> */}
            <div className="food-item-details">
              <h2>{item.name}</h2>
              <p>{item.restaurant}</p>
              <p>${item.price}</p>
              <button onClick={() => handleAddToCart(item)} className="add-to-cart-btn">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;











