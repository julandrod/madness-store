import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import filtersReducer from "./filtersSlice";
import cartReducer from "./cartSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    cart: cartReducer,
  },
});
