import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { addToCart } from '../services/api';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  // Safety check
  if (!product) {
    return null;
  }

  const { addToCart: addToCartLocal, fetchUserCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (e) => {
    if (e) e.preventDefault();

    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    setLoading(true);

    if (isLoggedIn) {
      try {
        await addToCart({
          productId: product._id,
          size: selectedSize,
          quantity,
        });
        // Refresh cart from server
        await fetchUserCart();
        setMessage('✓ Added to cart!');
        setSelectedSize('');
        setQuantity(1);
        setTimeout(() => setMessage(''), 2000);
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Failed to add to cart');
      }
    } else {
      addToCartLocal(product, selectedSize, quantity);
      setMessage('✓ Added to cart!');
      setSelectedSize('');
      setQuantity(1);
      setTimeout(() => setMessage(''), 2000);
    }
    setLoading(false);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-image-link">
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">₹{product.price}</p>

        <div className="product-controls">
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="size-select"
          >
            <option value="">Select Size</option>
            {product.sizes && product.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="quantity-input"
          />

          <button 
            onClick={handleAddToCart} 
            className="add-to-cart-btn"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>

        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  );
};

export default ProductCard;
