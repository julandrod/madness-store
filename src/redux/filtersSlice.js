import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gridView: false,
  filteredProducts: [],
  allProducts: [],
  sort: "price-lowest",
  filter: {
    text: "",
    company: "all",
    category: "all",
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setGridView: (state) => {
      state.gridView = true;
    },
    setListView: (state) => {
      state.gridView = false;
    },
    loadProducts: (state, action) => {
      let maxPrice = action.payload.map((product) => product.price);
      maxPrice = Math.max(...maxPrice);
      state.filter.maxPrice = maxPrice;
      state.filter.price = maxPrice;
      state.filteredProducts = action.payload;
      state.allProducts = action.payload;
    },
    updateSort: (state, action) => {
      state.sort = action.payload;
    },
    sortProducts: (state) => {
      let tempProducts = [];
      if (state.sort === "price-lowest") {
        tempProducts = state.filteredProducts.sort((a, b) => a.price - b.price);
      }
      if (state.sort === "price-highest") {
        tempProducts = state.filteredProducts.sort((a, b) => b.price - a.price);
      }
      if (state.sort === "name-a") {
        tempProducts = state.filteredProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (state.sort === "name-z") {
        tempProducts = state.filteredProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
      state.filteredProducts = [...tempProducts];
    },
    updateFilters: (state, action) => {
      state.filter[action.payload.name] = action.payload.value;
    },
    filterProducts: (state, action) => {
      let tempProducts = [...state.allProducts];
      const { text, company, category, price, shipping } = state.filter;

      if (text) {
        tempProducts = tempProducts.filter((product) =>
          product.name.toLowerCase().includes(text.toLowerCase())
        );
      }
      if (company !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.company === company
        );
      }
      if (category !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        );
      }
      if (shipping) {
        tempProducts = tempProducts.filter(
          (product) => product.shipping === true
        );
      }
      // filter by price
      tempProducts = tempProducts.filter((product) => product.price <= price);

      state.filteredProducts = tempProducts;
    },

    clearFilters: (state) => {
      state.filter = {
        ...state.filter,
        text: "",
        company: "all",
        category: "all",
        price: state.filter.maxPrice,
        shipping: false,
      };
    },
  },
});

export const {
  setGridView,
  setListView,
  loadProducts,
  updateSort,
  sortProducts,
  updateFilters,
  filterProducts,
  clearFilters,
} = filtersSlice.actions;
export const selectFiltersState = (state) => state.filters;

export default filtersSlice.reducer;
