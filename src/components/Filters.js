import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  clearFilters,
  selectFiltersState,
  updateFilters,
} from "../redux/filtersSlice";
import { formatPrice, getUniqueValues } from "../utils/helpers";

const Filters = () => {
  const dispatch = useDispatch();
  const {
    allProducts,
    filter: { text, category, company, price, maxPrice, minPrice, shipping },
  } = useSelector(selectFiltersState);

  const categories = getUniqueValues(allProducts, "category");
  const companies = getUniqueValues(allProducts, "company");

  const handleFilterValues = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "category") {
      value = e.target.textContent;
    }
    if (name === "color") {
      value = e.target.dataset.color;
    }
    if (name === "price") {
      value = Number(value);
    }
    if (name === "shipping") {
      value = e.target.checked;
    }
    dispatch(updateFilters({ name, value }));
  };

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={text}
              onChange={handleFilterValues}
            />
          </div>
          {/* end text */}
          {/* categories */}
          <div className="form-control">
            <h5>Category</h5>
            <div>
              {categories.map((c, index) => (
                <button
                  key={index}
                  onClick={handleFilterValues}
                  type="button"
                  name="category"
                  className={`${
                    category === c.toLowerCase() ? "active" : null
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          {/* end categories */}
          {/* companies */}
          <div className="form-control">
            <h5>Company</h5>
            <select
              name="company"
              value={company}
              onChange={handleFilterValues}
              className="company"
            >
              {companies.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          {/* end companies */}
          {/* price */}
          <div className="form-control">
            <h5>Price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={handleFilterValues}
              min={minPrice}
              max={maxPrice}
              value={price}
            />
          </div>
          {/* end price */}
          {/* shipping */}
          <div className="form-control shipping">
            <label htmlFor="shipping">Free Shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onChange={handleFilterValues}
              checked={shipping}
            />
          </div>
          {/* end shipping */}
        </form>
        <button
          className="clear-btn"
          type="button"
          onClick={() => dispatch(clearFilters())}
        >
          Clear Filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
    width: 200px;
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }
  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
