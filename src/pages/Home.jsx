import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProducts({ limit: 6, page: 1 });
      
      if (response.data && response.data.products) {
        setFeaturedProducts(response.data.products);
      } else {
        setError('No products available');
      }
    } catch (err) {
      console.error('Error fetching featured products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover the Latest Trends in Fashion</h1>
          <p>Premium quality clothing for everyone</p>
          <Link to="/products" className="btn btn-primary">
            Shop Now →
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Check out our latest collection</p>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading featured products...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
            <button onClick={fetchFeaturedProducts} className="retry-btn">
              Retry
            </button>
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="no-products">
            <p>No products available at the moment</p>
          </div>
        ) : (
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Shop With Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Free Shipping</h3>
            <p>On orders over ₹500</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Quality Guaranteed</h3>
            <p>All products are premium quality</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>24/7 Support</h3>
            <p>We're always here to help</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Easy Returns</h3>
            <p>Hassle-free returns within 30 days</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Elevate Your Wardrobe?</h2>
        <p>Explore our complete collection of trendy clothing</p>
        <Link to="/products" className="btn btn-secondary">
          View All Products
        </Link>
      </section>
    </div>
  );
};

export default Home;