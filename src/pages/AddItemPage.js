import React, { useState } from 'react';
import axios from 'axios';


const AddItemPage = () => {
  const [foodData, setFoodData] = useState({
    name: '',
    price: '',
    restaurant: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFoodData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('name', foodData.name);
    formData.append('price', foodData.price);
    formData.append('restaurant', foodData.restaurant);
    formData.append('image', foodData.image);

    try {
      const response = await axios.post('http://localhost:5000/api/foods', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Item added successfully!');
      setFoodData({ name: '', price: '', restaurant: '', image: null });
    } catch (error) {
      setError('Error adding item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-item-page">
      <h1>Add Food Item</h1>
      <form onSubmit={handleSubmit} className="add-item-form">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="form-group">
          <label htmlFor="name">Food Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={foodData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={foodData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="restaurant">Restaurant Name</label>
          <input
            type="text"
            id="restaurant"
            name="restaurant"
            value={foodData.restaurant}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Adding Item...' : 'Add Item'}
        </button>
      </form>
    </div>
  );
};

export default AddItemPage;
