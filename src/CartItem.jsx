import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
    };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
  };

  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  const handleQuantityChange = (name, newQuantity) => {
    dispatch(updateQuantity({ name, quantity: parseInt(newQuantity) }));
  };

  const totalCost = cartItems.reduce((total, item) => total + item.cost * item.quantity, 0);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
        <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
          <div className="total_cart_amount">
            <h3>Total Quantity: {totalQuantity}</h3>
            <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
            </div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} width={100} />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>${item.cost.toFixed(2)} </p>
                <div className="cart-item-quantity">
                    <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                </div>
                <p><strong>Total: ${(item.cost * item.quantity).toFixed(2)}</strong></p>
                <button className="cart-item-delete" onClick={() => handleRemove(item.name)}>Delete</button>
              </div>
            </div>
          ))}
            <div className="continue_shopping_btn">
            <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
            {/* <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button> */}
            <br />
            <button className="get-started-button1">Checkout</button>
            </div>
        </>
      )}
    </div>
  );
};

export default CartItem;