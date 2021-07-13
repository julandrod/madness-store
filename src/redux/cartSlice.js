import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

const initialState = {
  cart: getLocalStorage(),
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 534,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, amount, product } = action.payload;
      const tempItem = state.cart.find((item) => item.id === id);

      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id) {
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          } else {
            return cartItem;
          }
        });
        state.cart = tempCart;
      } else {
        const newItem = {
          id,
          name: product.name,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        };
        state.cart.push(newItem);
      }
    },
    removeCartItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
    toggleAmount: (state, action) => {
      const { id, value } = action.payload;
      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          if (value === "inc") {
            let newAmount = item.amount + 1;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
            return { ...item, amount: newAmount };
          }
          if (value === "dec") {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, amount: newAmount };
          }
        }
        return item;
      });
      state.cart = tempCart;
    },
    countTotals: (state, action) => {
      const { totalItems, totalAmount } = state.cart.reduce(
        (total, cartItem) => {
          const { amount, price } = cartItem;
          total.totalItems += amount;
          total.totalAmount += price * amount;
          return total;
        },
        { totalItems: 0, totalAmount: 0 }
      );
      state.totalAmount = totalAmount;
      state.totalItems = totalItems;
    },
  },
});

export const {
  addToCart,
  removeCartItem,
  clearCart,
  toggleAmount,
  countTotals,
} = cartSlice.actions;
export const selectCartState = (state) => state.cart;
export default cartSlice.reducer;
