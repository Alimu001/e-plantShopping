import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload; // Destructure product details from the action payload
        // Check if the item already exists in the cart by comparing names
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
            // If item already exists in the cart, increase its quantity
            existingItem.quantity++;
        } else {
            // If item does not exist, add it to the cart with quantity 1
            state.items.push({ 
                id: Date.now(),
                name,
                 image,
                 cost,
                 quantity: 1
            });
        }
    },
    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload; // Destructure the product name and new quantity from the action payload
        // Find the item in the cart that matches the given name
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // If the item is found, update its quantity to the new value
        }
    
    },
    handleIncrement: (state, action) => {
        const { itemId } = action.payload;
        const item = state.items.find(item => item.id === itemId);
        if (item) {
            item.quantity += 1;
        }
    },
    handleDecrement: (state, action) => {
        const { itemId } = action.payload;
        const item = state.items.find(item => item.id === itemId);
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else if (item.quantity === 1) {
                state.items = state.items.filter(item => item.id !== itemId);
            }
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
