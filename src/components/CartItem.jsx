import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  // Safety check - ensure product exists
  if (!item || !item.product) {
    return null;
  }

  const { product, size, quantity } = item;
  const itemTotal = product.price * quantity;

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="item-details">
        <h3>{product.name}</h3>
        <p className="size">Size: <strong>{size}</strong></p>
        <p className="price">₹{product.price}</p>
      </div>

      <div className="quantity-controls">
        <button
          onClick={() => updateQuantity(product._id, size, quantity - 1)}
          className="qty-btn"
          disabled={quantity <= 1}
        >
          −
        </button>
        <span className="qty-value">{quantity}</span>
        <button
          onClick={() => updateQuantity(product._id, size, quantity + 1)}
          className="qty-btn"
        >
          +
        </button>
      </div>

      <div className="item-total">
        <p>₹{itemTotal.toFixed(2)}</p>
      </div>

      <button
        onClick={() => removeFromCart(product._id, size)}
        className="remove-btn"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
