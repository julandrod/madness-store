import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartContent, PageHero } from "../components";
import { selectCartState } from "../redux/cartSlice";

const CartPage = () => {
  const { cart } = useSelector(selectCartState);

  if (cart.length < 1) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>Your Cart Is Empty</h2>
          <Link to="/products" className="btn">
            Fill It
          </Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <main>
      <PageHero title="Cart" />
      <Wrapper className="page">
        <CartContent />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
