import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <h5>
        <span>Madness Electronics</span>
        <br /> Made by{" "}
        <a href="https://github.com/julandrod" target="_blank" rel="noopener noreferrer">
          julandrod
        </a>
        <br />
        &copy; {new Date().getFullYear()}
      </h5>
      <br />
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #2f2f2f;
  text-align: center;
  span {
    color: var(--clr-primary-5);
  }
  h5 {
    color: var(--clr-white);
    margin: 0.1rem;
    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  a {
    color: var(--clr-primary-5);
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
`;

export default Footer;
