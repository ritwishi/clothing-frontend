import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { logoutUser } from '../services/api';
import '../styles/Navbar.css';

const Navbar = () => {
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-logo">👕 Clothing Store</span>
        </Link>

        <div className="nav-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/products" className="nav-link">
            Products
          </Link>
          <Link to="/cart" className="nav-link cart-link">
            Cart <span className="cart-count">{cartItems.length}</span>
          </Link>

          {isLoggedIn ? (
            <>
              <span className="nav-text">Welcome, {user?.name}</span>
              <button onClick={handleLogout} className="nav-btn logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-btn login-btn">
                Login
              </Link>
              <Link to="/register" className="nav-btn register-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
