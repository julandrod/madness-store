import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const products_url = "https://course-api.com/react-store-products";
const single_product_url = `https://course-api.com/react-store-single-product?id=`;

export const getProductsAsync = createAsyncThunk(
  "products/getProductsAsync",
  async () => {
    const response = await fetch(products_url);
    const products = await response.json();
    return products;
  }
);

export const getSingleProductAsync = createAsyncThunk(
  "products/getSingleProductAsync",
  async (payload) => {
    const response = await fetch(`${single_product_url}${payload.id}`, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    const product = await response.json();
    return product;
  }
);

const initialState = {
  isSidebarOpen: false,
  productsLoading: false,
  productsError: false,
  products: [],
  featuredProducts: [],
  singleProductLoading: false,
  singleProductError: false,
  singleProduct: {},
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sidebarOpen: (state) => {
      state.isSidebarOpen = true;
    },
    sidebarClose: (state) => {
      state.isSidebarOpen = false;
    },
  },
  extraReducers: {
    [getProductsAsync.pending]: (state) => {
      state.productsLoading = true;
    },
    [getProductsAsync.fulfilled]: (state, action) => {
      state.featuredProducts = action.payload.filter(
        (product) => product.featured === true
      );
      state.productsLoading = false;
      state.products = action.payload;
    },
    [getProductsAsync.rejected]: (state) => {
      state.productsLoading = false;
      state.productsError = true;
    },
    [getSingleProductAsync.pending]: (state) => {
      state.singleProductLoading = true;
    },
    [getSingleProductAsync.fulfilled]: (state, action) => {
      state.singleProductLoading = false;
      state.singleProduct = action.payload;
    },
    [getSingleProductAsync.rejected]: (state) => {
      state.singleProductLoading = false;
      state.singleProductError = true;
    },
  },
});

export const { sidebarOpen, sidebarClose } = productsSlice.actions;
export const selectProductsState = (state) => state.products;

export default productsSlice.reducer;
