// CartIcon.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import './CartIcon.css'; // optional styling

function CartIcon() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-icon">
      <span className="cart-count">{totalItems}</span>
    </div>
  );
}

export default CartIcon;
