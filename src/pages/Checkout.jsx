import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { createOrder } from '../services/api';
import '../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipcode: '',
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.zipcode
    ) {
      alert('Please fill all address fields');
      return;
    }

    setLoading(true);

    try {
      const response = await createOrder({
        shippingAddress,
      });

      clearCart();
      navigate(`/order/${response.data.order._id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      alert(error.response?.data?.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <p>Please add items to checkout</p>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h1>Checkout</h1>

      <div className="checkout-container">
        <div className="order-summary">
          <h2>Order Summary</h2>
          {cartItems.map((item, index) => (
            <div key={index} className="checkout-item">
              <img src={item.product.image} alt={item.product.name} />
              <div className="item-details">
                <p className="name">{item.product.name}</p>
                <p className="size">Size: {item.size}</p>
                <p className="quantity">Qty: {item.quantity}</p>
              </div>
              <p className="price">₹{(item.product.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}

          <div className="total">
            <h3>Total: ₹{getTotalPrice().toFixed(2)}</h3>
          </div>
        </div>

        <form className="shipping-form" onSubmit={handleSubmitOrder}>
          <h2>Shipping Address</h2>

          <div className="form-group">
            <label>Street Address *</label>
            <input
              type="text"
              name="street"
              value={shippingAddress.street}
              onChange={handleAddressChange}
              required
            />
          </div>

          <div className="form-group">
            <label>City *</label>
            <input
              type="text"
              name="city"
              value={shippingAddress.city}
              onChange={handleAddressChange}
              required
            />
          </div>

          <div className="form-group">
            <label>State *</label>
            <input
              type="text"
              name="state"
              value={shippingAddress.state}
              onChange={handleAddressChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Zip Code *</label>
            <input
              type="text"
              name="zipcode"
              value={shippingAddress.zipcode}
              onChange={handleAddressChange}
              required
            />
          </div>

          <button type="submit" className="place-order-btn" disabled={loading}>
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
