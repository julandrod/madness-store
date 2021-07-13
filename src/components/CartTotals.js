import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { selectCartState } from "../redux/cartSlice";
import { formatPrice } from "../utils/helpers";

const CartTotals = () => {
  const { totalAmount, shippingFee } = useSelector(selectCartState);
  const { user, loginWithRedirect } = useAuth0()

  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            Subtotal: <span>{formatPrice(totalAmount)}</span>
          </h5>
          <p>
            Shipping Fee: <span>{formatPrice(shippingFee)}</span>
          </p>
          <hr />
          <h4>
            Order Total: <span>{formatPrice(totalAmount + shippingFee)}</span>
          </h4>
        </article>
        {user ? (
          <Link to="/checkout" className="btn">
            Proceed To Checkout
          </Link>
        ) : (
          <button className="btn" type="button" onClick={loginWithRedirect}>
            Login
          </button>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotals;
