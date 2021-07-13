import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
import { selectCartState } from "../redux/cartSlice";

const CheckoutPage = () => {
  const { cart } = useSelector(selectCartState);

  return (
    <main>
      <PageHero title="Checkout" />
      <Wrapper className="page">
        {cart.length < 1 ? (
          <div className="empty">
            <h2>Your Cart Is Empty</h2>
            <Link to="/products" className="btn">
              Fill It
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;

export default CheckoutPage;
