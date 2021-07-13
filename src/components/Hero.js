import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import sensors from "../assets/sensors.jpg";
import arduino2 from "../assets/arduino2.jpeg";

const Hero = () => {
  return (
    <Wrapper className="section-center">
      <article>
        <h1>
          Make your own <br /> projects
        </h1>
        <p>
          With our select products you can take the project of yours dreams to a
          reality. <br />
          The Arduino Uno is on the best products for this purpose.
        </p>
        <Link to="/products" className="btn hero-btn">
          Shop Now
        </Link>
      </article>
      <article className="img-container">
        <img src={sensors} alt="sensors" className="main-img" />
        <img src={arduino2} alt="arduino" className="accent-img" />
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 60vh;
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
    text-align: justify;
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8em;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
      text-align: justify;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 250px;
      transform: translateX(50%) translateY(70%);
      border-radius: var(--radius);
    }
    .img-container::before{
        content: "";
        position: absolute;
        width: 90%;
        height: 80%;
        background: var(--clr-primary-9);
        bottom: -10%;
        left: -8%;
        border-radius: var(--radius);
    }
  }
`;

export default Hero;
