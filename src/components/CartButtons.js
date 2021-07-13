import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { FaShoppingCart, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { clearCart, selectCartState } from "../redux/cartSlice";
import { sidebarClose } from "../redux/productsSlice";

const CartButtons = () => {
  const dispatch = useDispatch();
  const { totalItems } = useSelector(selectCartState);
  const { loginWithRedirect, user, logout } = useAuth0();

  return (
    <Wrapper className="cart-btn-wrapper">
      <Link to="/cart" className="cart-btn" onClick={() => dispatch(sidebarClose())}>
        Cart
        <span className="cart-container">
          <FaShoppingCart />
          <span className="cart-value">{totalItems}</span>
        </span>
      </Link>
      {user ? (
        <button
          type="button"
          className="auth-btn"
          onClick={() => {
            dispatch(clearCart())
            logout({ returnTo: window.location.origin })
          }}
        >
          Logout <FaUserMinus />
        </button>
      ) : (
        <button type="button" className="auth-btn" onClick={loginWithRedirect}>
          Login <FaUserPlus />
        </button>
      )
      }
    </Wrapper >
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 200px;
  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;
    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.3rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -12px;
    right: -18px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    font-weight: bold;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`;

export default CartButtons;
