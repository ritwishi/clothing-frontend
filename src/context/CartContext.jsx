import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCart } from '../services/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  // Load cart from localStorage for guests
  useEffect(() => {
    if (!isLoggedIn) {
      const savedCart = localStorage.getItem('guestCart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
        } catch (error) {
          console.error('Error parsing cart from localStorage:', error);
          setCartItems([]);
        }
      }
    }
  }, [isLoggedIn]);

  // Save cart to localStorage for guests
  useEffect(() => {
    if (!isLoggedIn && cartItems.length > 0) {
      try {
        localStorage.setItem('guestCart', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cartItems, isLoggedIn]);

  // Fetch cart from server when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      fetchUserCart();
    }
  }, [isLoggedIn]);

  const fetchUserCart = async () => {
    try {
      setLoading(true);
      const response = await getCart();
      
      if (response.data && response.data.cart && response.data.cart.items) {
        // Transform server cart to local format
        const formattedItems = response.data.cart.items
          .filter((item) => item && item.product) // Filter out null/undefined items
          .map((item) => ({
            product: item.product,
            size: item.size,
            quantity: item.quantity,
          }));
        setCartItems(formattedItems);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product, size, quantity) => {
    if (!product || !product._id) {
      console.error('Invalid product');
      return;
    }

    const existingItem = cartItems.find(
      (item) => item.product._id === product._id && item.size === size
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.product._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { product, size, quantity }]);
    }
  };

  const removeFromCart = (productId, size) => {
    setCartItems(
      cartItems.filter((item) => !(item.product._id === productId && item.size === size))
    );
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.product._id === productId && item.size === size
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('guestCart');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      if (item && item.product) {
        return total + item.product.price * item.quantity;
      }
      return total;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        loading,
        fetchUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
