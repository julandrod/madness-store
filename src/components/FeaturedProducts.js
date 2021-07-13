import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectProductsState } from "../redux/productsSlice";
import { Product, Loading, Error } from "../components";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const { featuredProducts, productsLoading, productsError } =
    useSelector(selectProductsState);

  if (productsLoading) {
    return <Loading />;
  }
  if(productsError){
      return <Error />
  }
  return (
    <Wrapper className="section">
      <div className="title">
        <h2>Featured Products</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {featuredProducts.slice(0, 3).map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
      <Link to="/products" className="btn">
        All Products
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 160px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
