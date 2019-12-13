import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import SEO from "../components/seo";
import Layout from "../components/layout";
import Search from "../components/search";
import Filters from "../components/filters";
import Card from "../components/card";
import blob from "../images/blob.svg";

const StyledLanding = styled.div`
  padding: 2rem 1rem;
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

const StyledBrowser = styled.div`
  text-align: center;
  background: linear-gradient(
    transparent 1.25rem,
    ${props => props.theme.goldLight} 0);
`;

const StyledCardGrid = styled.div`
  display: grid;
  grid-column-gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  width: 1000px;
  max-width: 90%;
  margin: 0 auto;
  text-align: left;
`;

const posts = [
  {
    id: 1,
    title: "Narrative Coffee",
    score: 70,
    estate: "Bugis"
  }, {
    id: 2,
    title: "Anteroom Coffee",
    score: 70,
    estate: "Farrer"
  }, {
    id: 3,
    title: "Glyph Supply Co.",
    score: 70,
    estate: "Farrer"
  }, {
    id: 4,
    title: "Apartment",
    score: 70,
    estate: "Farrer"
  }
];

const IndexPage = () => {
  const renderPosts = () => {
    return posts.map(post => (
      <Card key={post.id} post={post} />
    ));
  };
  
  return (
    <Layout>
      <SEO title="Average Joe Coffeehouse Reviews" />
      <StyledLanding>
        <h1>Right cafe, right time.</h1>
        <StyledPara>Everything you need to know about local coffeehouses, to find that perfect one.</StyledPara>
      </StyledLanding>
      <StyledBrowser>
        <Search />
        <Filters />
        <StyledCardGrid>
          {renderPosts()}
        </StyledCardGrid>
      </StyledBrowser>
      {/* <Link to="/page-2/">Go to page 2</Link> */}
    </Layout>
  );
};

export default IndexPage;
