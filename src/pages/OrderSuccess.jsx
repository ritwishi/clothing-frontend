import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../services/api';
import '../styles/OrderSuccess.css';

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await getOrderById(id);
      setOrder(response.data.order);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading order details...</div>;
  if (!order) return <div className="error">Order not found</div>;

  return (
    <div className="order-success">
      <div className="success-card">
        <h1>✓ Order Placed Successfully</h1>
        <p>Thank you for your purchase!</p>

        <div className="order-details">
          <div className="detail-group">
            <label>Order ID:</label>
            <p>{order._id}</p>
          </div>

          <div className="detail-group">
            <label>Order Date:</label>
            <p>{new Date(order.orderDate).toLocaleDateString('en-IN')}</p>
          </div>

          <div className="detail-group">
            <label>Status:</label>
            <p className="status">{order.status}</p>
          </div>
        </div>

        <div className="order-items">
          <h2>Order Items</h2>
          {order.items.map((item, index) => (
            <div key={index} className="item">
              <p><strong>{item.name}</strong></p>
              <p>Size: {item.size} | Quantity: {item.quantity} | Price: ₹{item.price}</p>
            </div>
          ))}
        </div>

        <div className="order-total">
          <h3>Total Amount: ₹{order.totalPrice}</h3>
        </div>

        <div className="shipping-details">
          <h3>Shipping Address</h3>
          <p>
            {order.shippingAddress.street},<br />
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipcode}
          </p>
        </div>

        <p className="message">
          A confirmation email has been sent to your registered email address.
        </p>

        <Link to="/" className="continue-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
