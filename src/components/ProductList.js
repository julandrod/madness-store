import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProducts,
  loadProducts,
  selectFiltersState,
  sortProducts,
} from "../redux/filtersSlice";
import { selectProductsState } from "../redux/productsSlice";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { gridView, filteredProducts, sort, filter } =
    useSelector(selectFiltersState);
  const { products } = useSelector(selectProductsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts(products));
  }, [products, dispatch]);

  useEffect(() => {
    dispatch(filterProducts());
    dispatch(sortProducts());
  }, [products, sort, filter, dispatch]);

  if (filteredProducts.length < 1) {
    return <h5>Sorry, no products matched your search...</h5>;
  }
  if (gridView === false) {
    return <ListView products={filteredProducts} />;
  }
  return <GridView products={filteredProducts} />;
};

export default ProductList;
