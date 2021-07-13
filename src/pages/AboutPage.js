import React from "react";
import { PageHero } from "../components";
import styled from "styled-components";
import aboutImg from "../assets/aboutImg.jpg";

const AboutPage = () => {
  return (
    <main>
      <PageHero title="About" />
      <Wrapper className="page section section-center">
        <article>
          <div className="title">
            <h2>What is Madness Electronics?</h2>
            <div className="underline"></div>
          </div>
          <p>
            Madness electronics was conceived in 2012 as an online store in
            which we offer a catalog of products and solutions focused on the
            development of projects on topics such as robotics, mechatronics,
            embedded systems, electronics in general and basically any idea you
            have in mind. We are in the continuous search to expand and improve
            our catalog adding more and more components that help make your
            projects a reality, we are also developing new solutions and
            applications such as embedded systems that contain all the complex
            electronics and you can spend more time developing ideas and
            projects.
          </p>
        </article>
        <img src={aboutImg} alt="about" />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    height: 500px;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    text-align: justify;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default AboutPage;
