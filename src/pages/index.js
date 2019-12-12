import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import SEO from "../components/seo";
import Layout from "../components/layout";
import Search from "../components/search";
import blob from "../images/blob.svg";

const StyledLanding = styled.div`
  padding: 2rem 0;
  text-align: center;
  background: url(${blob}) no-repeat center;

  h1 {
    font-feature-settings: "salt";
  }
`;

const StyledPara = styled.p`
  max-width: 20rem;
  margin: 0.5rem auto 2.5rem;
`;

const StyledSearchDiv = styled.div`
  text-align: center;
`;

const IndexPage = () => (
  <Layout>
    <SEO title="Average Joe Coffeehouse Reviews" />
    <StyledLanding>
      <h1>Right cafe, right time.</h1>
      <StyledPara>Everything you need to know about local coffeehouses, to find that perfect one.</StyledPara>
    </StyledLanding>
    <StyledSearchDiv>
      <Search />
    </StyledSearchDiv>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
