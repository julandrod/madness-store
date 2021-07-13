import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { addToCart } from "../redux/cartSlice";
import AmountButtons from "./AmountButtons";

const AddToCart = ({ product }) => {
  const dispatch = useDispatch();

  const { id, stock } = product;

  const [amount, setAmount] = useState(1);

  const increase = () => {
    setAmount((prevAmount) => {
      let tempAmount = prevAmount + 1;
      return tempAmount > stock ? (tempAmount = stock) : tempAmount;
    });
  };

  const decrease = () => {
    setAmount((prevAmount) => {
      let tempAmount = prevAmount - 1;
      return tempAmount < 1 ? (tempAmount = 1) : tempAmount;
    });
  };

  return (
    <Wrapper>
      <div className="btn-container">
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <Link
          to="/cart"
          className="btn"
          onClick={() => dispatch(addToCart({ id, amount, product }))}
        >
          Add To Cart
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .btn-container {
    margin-top: 2rem;
  }
  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;

export default AddToCart;
