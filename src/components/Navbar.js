import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { FaBars } from "react-icons/fa";
import { links } from "../utils/constants";
import CartButtons from "./CartButtons";
import { sidebarOpen } from "../redux/productsSlice";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useAuth0()

  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <button type="button" className="nav-toggle" onClick={() => dispatch(sidebarOpen())}>
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              <li key={id}>
                <Link to={url}>{text}</Link>
              </li>
            );
          })}
          {user && (
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
          )}
        </ul>
        <CartButtons />
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: 1170px;
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: #235500;
    cursor: pointer;
    svg {
      font-size: 1.5rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }

  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: #444444;
        font-size: 0.8rem;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 0.1rem;
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid #235500;
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`;

export default Navbar;
