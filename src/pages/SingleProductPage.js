import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { AddToCart, Error, Loading, PageHero, ProductImages, Stars } from "../components";
import {
  getSingleProductAsync,
  selectProductsState,
} from "../redux/productsSlice";
import { formatPrice } from "../utils/helpers";

const SingleProductPage = () => {
  const { id } = useParams();
  const history = useHistory();

  const { singleProductLoading, singleProductError, singleProduct } =
    useSelector(selectProductsState);
  const dispatch = useDispatch();

  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    images,
  } = singleProduct;

  useEffect(() => {
    dispatch(getSingleProductAsync({ id }));
  }, [id, dispatch]);

  useEffect(() => {
    if (singleProductError) {
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
  }, [singleProductError, history]);

  if (singleProductLoading) {
    return <Loading />;
  }
  if (singleProductError) {
    return <Error />;
  }

  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          Back To Products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews}/>
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available: </span>
              {stock > 0 ? "In stock" : "Out of stock"}
            </p>
            <p className="info">
              <span>SKU: </span>
              {sku}
            </p>
            <p className="info">
              <span>Brand: </span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={singleProduct}/>}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
    text-align: justify;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }
  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
