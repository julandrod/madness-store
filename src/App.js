import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Footer, Navbar, Sidebar } from "./components";
import {
  AboutPage,
  AuthWrapper,
  CartPage,
  CheckoutPage,
  ErrorPage,
  HomePage,
  PrivateRoute,
  ProductsPage,
  SingleProductPage,
} from "./pages";
import { countTotals, selectCartState } from "./redux/cartSlice";
import { getProductsAsync } from "./redux/productsSlice";

function App() {
  const dispatch = useDispatch();
  const { cart } = useSelector(selectCartState);

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(countTotals());
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, dispatch]);

  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/cart">
            <CartPage />
          </Route>
          <Route exact path="/products">
            <ProductsPage />
          </Route>
          <Route exact path="/products/:id" children={<SingleProductPage />} />
          <Route exact path="/about">
            <AboutPage />
          </Route>
          <PrivateRoute exact path="/checkout">
            <CheckoutPage />
          </PrivateRoute>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
