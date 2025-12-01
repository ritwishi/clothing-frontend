import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, addToCart } from '../services/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [loadingCart, setLoadingCart] = useState(false);
  const { addToCart: addToCartLocal, fetchUserCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProductById(id);
      if (response.data && response.data.product) {
        setProduct(response.data.product);
      } else {
        setError('Product data not found');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err.response?.data?.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    setLoadingCart(true);

    if (isLoggedIn) {
      try {
        await addToCart({
          productId: product._id,
          size: selectedSize,
          quantity: Number(quantity),
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
    setLoadingCart(false);
  };

  if (loading) {
    return (
      <div className="product-detail">
        <div className="loading-spinner">Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail">
        <div className="error-message">
          <h2>Error: {error}</h2>
          <button onClick={() => navigate('/products')} className="back-btn">
            ← Back to Products
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail">
        <div className="not-found">
          <h2>Product not found</h2>
          <button onClick={() => navigate('/products')} className="back-btn">
            ← Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>

      <div className="detail-container">
        {/* Product Image Section */}
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>

        {/* Product Info Section */}
        <div className="product-info-section">
          <div className="breadcrumb">
            <span className="category-badge">{product.category}</span>
          </div>

          <h1 className="product-name">{product.name}</h1>
          <p className="product-description">{product.description}</p>

          {/* Price Section */}
          <div className="price-section">
            <h2 className="price">₹{product.price}</h2>
            <p className="stock-status">
              {product.stock > 0 ? (
                <span className="in-stock">✓ In Stock ({product.stock} available)</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </p>
          </div>

          {/* Size Selection */}
          <div className="size-section">
            <label htmlFor="size-select">Select Size:</label>
            <select
              id="size-select"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="size-select"
            >
              <option value="">Choose a size...</option>
              {product.sizes && product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Selection */}
          <div className="quantity-section">
            <label htmlFor="quantity-input">Quantity:</label>
            <div className="quantity-controls">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="qty-btn"
              >
                −
              </button>
              <input
                id="quantity-input"
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="qty-input"
              />
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="qty-btn"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="add-to-cart-btn"
            disabled={loadingCart || product.stock === 0}
          >
            {loadingCart ? 'Adding...' : 'Add to Cart'}
          </button>

          {message && <p className="success-message">{message}</p>}

          {/* Product Details */}
          <div className="product-details-section">
            <h3>Product Details</h3>
            <ul>
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Available Sizes:</strong> {product.sizes.join(', ')}</li>
              <li><strong>Stock:</strong> {product.stock} units available</li>
            </ul>
          </div>

          {/* Shipping Info */}
          <div className="shipping-info">
            <h3>Shipping Information</h3>
            <ul>
              <li>✓ Free shipping on orders over ₹500</li>
              <li>✓ Delivery in 5-7 business days</li>
              <li>✓ 30-day easy returns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;